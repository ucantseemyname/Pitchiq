/**
 * Cloudflare Pages Function: GET /api/health
 *
 * Mirrors the Express `/api/health` endpoint so the deployed site can tell the
 * client whether live Claude generation is available. When no API key is
 * configured, the client automatically falls back to the keyless local template.
 *
 * Configure `ANTHROPIC_API_KEY` (and optionally `ANTHROPIC_MODEL`) in the
 * Cloudflare Pages project settings to enable live generation.
 */
export function onRequestGet({ env }) {
  return new Response(
    JSON.stringify({
      ok: true,
      model: env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
      hasApiKey: Boolean(env.ANTHROPIC_API_KEY),
    }),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
