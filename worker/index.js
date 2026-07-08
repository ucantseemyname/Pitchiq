/**
 * Cloudflare Worker entry for PitchIQ.
 *
 * This Worker fronts the whole site:
 *   - GET  /api/health   reports whether an API key is configured
 *   - POST /api/generate streams a Claude-generated proposal
 *   - everything else    is served from the static SPA build (client/dist),
 *                        with index.html as the single-page-app fallback.
 *
 * The static assets are provided by the `ASSETS` binding (see wrangler.jsonc).
 * Set `ANTHROPIC_API_KEY` (and optionally `ANTHROPIC_MODEL`) as Worker
 * environment variables/secrets to enable live generation. Without a key, the
 * client automatically renders the keyless local template instead.
 */
import { handleGenerate } from './generate.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return json({
        ok: true,
        model: env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
        hasApiKey: Boolean(env.ANTHROPIC_API_KEY),
      });
    }

    if (url.pathname === '/api/generate') {
      if (request.method !== 'POST') {
        return json({ error: 'Method not allowed.' }, 405);
      }
      return handleGenerate(request, env);
    }

    if (url.pathname.startsWith('/api/')) {
      return json({ error: 'Not found.' }, 404);
    }

    // Static SPA. `not_found_handling: single-page-application` in wrangler.jsonc
    // makes this return index.html for unmatched client-side routes.
    return env.ASSETS.fetch(request);
  },
};
