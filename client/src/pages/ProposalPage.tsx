import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppHeader } from '../components/organisms/AppHeader';
import { Button } from '../components/atoms/Button';
import { ProposalDocument } from '../components/organisms/ProposalDocument';
import { Download, Refresh, ArrowRight, Sparkle, X } from '../components/atoms/icons';
import { useProposal } from '../context/ProposalContext';
import { useProposalGenerator } from '../hooks/useProposalGenerator';
import { checkHealth } from '../lib/api';
import { downloadProposalPdf } from '../lib/pdf';
import { buildLocalProposalRaw } from '../lib/localProposal';
import { DEMO_FORM, DEMO_RAW } from '../data/demoProposal';

/**
 * How the proposal on screen was produced:
 * - `live`, streamed from Claude (API key present)
 * - `template`, generated locally from the user's inputs (no key / server down)
 * - `example`, the fixed "See Example" demo (?demo=1)
 * - `null`, still deciding (running the health check)
 */
type Mode = 'live' | 'template' | 'example' | null;

export default function ProposalPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isDemo = params.get('demo') === '1';

  const { form, isComplete, setForm } = useProposal();
  const { status, sections, error, generate, playDemo } = useProposalGenerator();
  const [mode, setMode] = useState<Mode>(null);

  // A keyless proposal built from the user's own inputs, in the same format the
  // server streams, reused for the initial render and for "Regenerate".
  const localRaw = useMemo(() => buildLocalProposalRaw(form), [form]);

  // Kick off generation on entry. We intentionally do NOT guard this with a ref:
  // under React StrictMode the component mounts, unmounts (the generator hook's
  // cleanup aborts/cancels the in-flight run), then remounts, so the effect must
  // be free to restart the run on remount. In production it simply runs once.
  useEffect(() => {
    if (isDemo) {
      setForm(DEMO_FORM);
      setMode('example');
      playDemo(DEMO_RAW);
      return;
    }
    if (!isComplete) {
      // No data to work with, send the user to the form.
      navigate('/generate', { replace: true });
      return;
    }

    // Decide between live (Claude) and the keyless local template based on
    // whether the backend has an API key. `cancelled` guards the async race
    // under StrictMode's mount/unmount/remount.
    let cancelled = false;
    checkHealth().then(({ hasApiKey }) => {
      if (cancelled) return;
      if (hasApiKey) {
        setMode('live');
        generate(form);
      } else {
        setMode('template');
        playDemo(localRaw);
      }
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isStreaming = status === 'streaming';
  // Show the skeleton while we're still deciding, or before the first tokens.
  const showSkeleton = mode === null || (isStreaming && sections.length === 0);
  const canDownload = status === 'done' && sections.length > 0;

  const handleRegenerate = () => {
    if (mode === 'live') generate(form);
    else playDemo(mode === 'example' ? DEMO_RAW : localRaw);
  };

  const handleDownload = async () => {
    try {
      await downloadProposalPdf(form, sections);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Sorry, the PDF could not be generated. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-canvas dark:bg-dark-canvas">
      <AppHeader />

      <main className="container-px py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          {/* Status row */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                {isStreaming ? (
                  <>
                    <span className="h-2 w-2 animate-pulse-dot rounded-full bg-primary" />
                    {mode === 'live'
                      ? 'Generating…'
                      : mode === 'template'
                        ? 'Building preview…'
                        : 'Example proposal'}
                  </>
                ) : status === 'error' ? (
                  'Generation failed'
                ) : (
                  <>
                    <Sparkle width={14} height={14} />
                    {mode === 'example'
                      ? 'Example proposal'
                      : mode === 'template'
                        ? 'Demo preview'
                        : 'Proposal ready'}
                  </>
                )}
              </div>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl dark:text-white">
                {form.clientName ? `Proposal for ${form.clientName}` : 'Your Proposal'}
              </h1>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleDownload}
                disabled={!canDownload}
                iconLeft={<Download width={16} height={16} />}
              >
                Download PDF
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRegenerate}
                disabled={isStreaming}
                iconLeft={<Refresh width={16} height={16} />}
              >
                Regenerate
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/generate')}
                disabled={isStreaming}
              >
                Start Over
              </Button>
            </div>
          </div>

          {/* Keyless demo banner */}
          {mode === 'template' && status !== 'error' && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-hairline bg-white p-4 shadow-soft dark:border-dark-hairline dark:bg-dark-surface">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-white dark:bg-white dark:text-ink">
                <Sparkle width={15} height={15} />
              </span>
              <div className="flex-1 text-sm">
                <p className="font-semibold text-ink dark:text-white">
                  Demo preview, built from your inputs, no API key needed
                </p>
                <p className="mt-0.5 text-muted">
                  This proposal uses a local template. For AI-written copy tailored
                  by Claude, add an{' '}
                  <code className="rounded bg-canvas px-1 py-0.5 text-[13px] dark:bg-white/10">
                    ANTHROPIC_API_KEY
                  </code>{' '}
                  to your <code className="text-[13px]">.env</code> and restart the
                  server, this exact flow upgrades automatically.
                </p>
              </div>
            </div>
          )}

          {/* Error state */}
          {status === 'error' && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-5"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-white">
                <X width={16} height={16} />
              </span>
              <div className="flex-1">
                <p className="font-semibold text-ink dark:text-white">
                  Something went wrong
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  {error || 'The proposal could not be generated.'}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" onClick={handleRegenerate}>
                    Try again
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate('/generate')}
                    iconRight={<ArrowRight width={15} height={15} />}
                  >
                    Edit details
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Document */}
          <ProposalDocument
            layout={form.layout}
            form={form}
            sections={sections}
            isStreaming={isStreaming}
            showSkeleton={showSkeleton}
            hasError={status === 'error'}
            loaderLabel={
              mode === 'template'
                ? 'Building your preview…'
                : 'Claude is writing your proposal…'
            }
          />

          {/* Bottom CTA */}
          {canDownload && (
            <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-hairline bg-white p-7 text-center shadow-soft sm:flex-row sm:justify-between sm:text-left dark:border-dark-hairline dark:bg-dark-surface">
              <div>
                <p className="text-lg font-bold text-ink dark:text-white">
                  Looks good? Send it to your client.
                </p>
                <p className="text-sm text-muted">
                  Export a polished, branded PDF in one click.
                </p>
              </div>
              <Button
                size="lg"
                onClick={handleDownload}
                iconLeft={<Download width={18} height={18} />}
              >
                Download PDF
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
