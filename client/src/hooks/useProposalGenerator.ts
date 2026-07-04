import { useCallback, useEffect, useRef, useState } from 'react';
import { streamProposal } from '../lib/api';
import { parseSections } from '../lib/parseSections';
import type { ProposalForm, ProposalSection } from '../lib/types';

export type GenerationStatus = 'idle' | 'streaming' | 'done' | 'error';

interface UseProposalGenerator {
  status: GenerationStatus;
  sections: ProposalSection[];
  error: string | null;
  /** Start (or restart) a live generation for the given form. */
  generate: (form: ProposalForm) => void;
  /** Render a pre-built proposal locally with a simulated typing effect. */
  playDemo: (raw: string) => void;
  /** Cancel any in-flight generation. */
  cancel: () => void;
}

/**
 * Encapsulates the proposal generation lifecycle: streaming from the API,
 * incremental section parsing, error handling, and a demo playback mode.
 */
export function useProposalGenerator(): UseProposalGenerator {
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [sections, setSections] = useState<ProposalSection[]>([]);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const demoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const thinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    if (demoTimerRef.current) {
      clearInterval(demoTimerRef.current);
      demoTimerRef.current = null;
    }
    if (thinkTimerRef.current) {
      clearTimeout(thinkTimerRef.current);
      thinkTimerRef.current = null;
    }
  }, []);

  const applyRaw = useCallback((raw: string) => {
    const { sections: parsed, error: parsedError } = parseSections(raw);
    setSections(parsed);
    if (parsedError) {
      setError(parsedError);
      setStatus('error');
    }
  }, []);

  const generate = useCallback(
    (form: ProposalForm) => {
      cleanup();
      setSections([]);
      setError(null);
      setStatus('streaming');

      const controller = new AbortController();
      abortRef.current = controller;

      streamProposal(form, applyRaw, controller.signal)
        .then((raw) => {
          if (controller.signal.aborted) return;
          const { error: parsedError } = parseSections(raw);
          setStatus(parsedError ? 'error' : 'done');
        })
        .catch((err: unknown) => {
          if (controller.signal.aborted) return;
          setError(err instanceof Error ? err.message : 'Failed to generate proposal.');
          setStatus('error');
        });
    },
    [applyRaw, cleanup]);

  const playDemo = useCallback(
    (raw: string) => {
      cleanup();
      setSections([]);
      setError(null);
      setStatus('streaming');

      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        applyRaw(raw);
        setStatus('done');
        return;
      }

      // Show the loading state for a brief "thinking" beat before typing starts,
      // so the loader reads as intentional rather than a one-frame flash. (Live
      // generations get this naturally from network + first-token latency.)
      const THINK_MS = 700;
      // Reveal the pre-built proposal progressively. We aim for a fixed total
      // duration with a modest tick rate (~33fps) rather than a tiny per-frame
      // step, far fewer renders while still reading as a live "typing" effect.
      const TICK_MS = 30;
      const TARGET_MS = 4000;
      const ticks = Math.max(1, Math.round(TARGET_MS / TICK_MS));
      const step = Math.max(8, Math.ceil(raw.length / ticks));

      thinkTimerRef.current = setTimeout(() => {
        let i = 0;
        demoTimerRef.current = setInterval(() => {
          i = Math.min(i + step, raw.length);
          applyRaw(raw.slice(0, i));
          if (i >= raw.length) {
            if (demoTimerRef.current) clearInterval(demoTimerRef.current);
            demoTimerRef.current = null;
            setStatus('done');
          }
        }, TICK_MS);
      }, THINK_MS);
    },
    [applyRaw, cleanup]);

  const cancel = useCallback(() => {
    cleanup();
    setStatus('idle');
  }, [cleanup]);

  // Abort/clear on unmount.
  useEffect(() => cleanup, [cleanup]);

  return { status, sections, error, generate, playDemo, cancel };
}
