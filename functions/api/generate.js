/**
 * Cloudflare Pages Function: POST /api/generate
 *
 * The production equivalent of the Express `/api/generate` route. Cloudflare
 * Pages is a static host, so the Node/Express backend does not run there; this
 * Worker-runtime function calls the Anthropic API directly (via fetch, since the
 * Node SDK is not suited to the Workers runtime) and re-streams the model's text
 * back to the browser as `text/plain`. The client parses the delimited
 * `[[SECTION:key]]` markers incrementally for the live typing effect, exactly as
 * it does against the local Express server.
 *
 * Prompt construction and validation are imported from the existing server
 * modules so there is a single source of truth.
 */
import { validateProposalInput } from '../../server/validation.js';
import { SYSTEM_PROMPT, buildUserPrompt } from '../../server/prompt.js';

const DEFAULT_MODEL = 'claude-sonnet-4-6';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Request body must be valid JSON.' }, 400);
  }

  const result = validateProposalInput(body);
  if (!result.ok) return json({ error: result.error }, 400);

  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json(
      { error: 'Server is missing ANTHROPIC_API_KEY. Add it in the Cloudflare Pages environment settings.' },
      500);
  }

  const model = env.ANTHROPIC_MODEL || DEFAULT_MODEL;

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      stream: true,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserPrompt(result.value) }],
    }),
  });

  // Errors that occur before streaming begins (bad key, no credits, invalid
  // model) come back as a normal JSON error. Surface them cleanly so the client
  // can show the message instead of a silent hang.
  if (!upstream.ok || !upstream.body) {
    let message = `Upstream error (${upstream.status}).`;
    try {
      const errBody = await upstream.json();
      message = errBody?.error?.message || message;
    } catch {
      /* non-JSON error body */
    }
    return json({ error: message }, upstream.status || 502);
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  // Transform the Anthropic SSE event stream into a flat text stream containing
  // only the model's text deltas (and an `[[ERROR]]` sentinel on failure).
  const stream = new ReadableStream({
    async start(controller) {
      let buffer = '';
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE frames are separated by a blank line.
          let sep;
          while ((sep = buffer.indexOf('\n\n')) !== -1) {
            const frame = buffer.slice(0, sep);
            buffer = buffer.slice(sep + 2);

            const dataStr = frame
              .split('\n')
              .filter((line) => line.startsWith('data:'))
              .map((line) => line.slice(5).trim())
              .join('');
            if (!dataStr || dataStr === '[DONE]') continue;

            let evt;
            try {
              evt = JSON.parse(dataStr);
            } catch {
              continue;
            }

            if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
              controller.enqueue(encoder.encode(evt.delta.text));
            } else if (evt.type === 'error') {
              const msg = evt.error?.message || 'Generation error.';
              controller.enqueue(encoder.encode(`\n\n[[ERROR]] ${msg}`));
            }
          }
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(`\n\n[[ERROR]] ${err?.message || 'Stream failed.'}`));
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
