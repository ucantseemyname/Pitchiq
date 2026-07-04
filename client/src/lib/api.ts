import type { ProposalForm } from './types';

/**
 * Ask the backend whether it can generate live (i.e. an API key is configured).
 * Never throws, if the server is unreachable, we report `hasApiKey: false` and
 * `reachable: false` so callers can fall back to the keyless local preview.
 */
export async function checkHealth(): Promise<{
  reachable: boolean;
  hasApiKey: boolean;
}> {
  try {
    const res = await fetch('/api/health', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return { reachable: true, hasApiKey: false };
    const data = await res.json();
    return { reachable: true, hasApiKey: Boolean(data?.hasApiKey) };
  } catch {
    return { reachable: false, hasApiKey: false };
  }
}

/**
 * POST the form to the backend and stream the response back chunk by chunk.
 *
 * @param form     Completed proposal form.
 * @param onChunk  Called with the cumulative raw text every time more arrives.
 * @param signal   Optional AbortSignal to cancel an in-flight generation.
 * @returns        The full raw text once the stream completes.
 * @throws         Error with a human-readable message on failure.
 */
export async function streamProposal(
  form: ProposalForm,
  onChunk: (cumulative: string) => void,
  signal?: AbortSignal): Promise<string> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
    signal,
  });

  if (!res.ok) {
    // The backend sends JSON errors for validation / config failures.
    const body = await res.text();
    let message = '';
    try {
      const data = JSON.parse(body);
      if (data?.error) message = data.error;
    } catch {
      /* non-JSON error body (e.g. the Vite proxy's own error page) */
    }

    if (!message) {
      // An empty or non-JSON 5xx almost always means the Express backend is
      // unreachable (not started, or not on port 3001) and the dev proxy
      // returned its own error. Give the user something actionable.
      message =
        res.status >= 500
          ? "Couldn't reach the PitchIQ server. Make sure the backend is running on port 3001 (run `npm run dev` from the project root)."
          : `Request failed (${res.status}).`;
    }
    throw new Error(message);
  }

  if (!res.body) {
    // Fallback for environments without a readable stream.
    const text = await res.text();
    onChunk(text);
    return text;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let cumulative = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    cumulative += decoder.decode(value, { stream: true });
    onChunk(cumulative);
  }
  cumulative += decoder.decode(); // flush
  onChunk(cumulative);

  return cumulative;
}
