import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';

import { validateProposalInput } from './validation.js';
import { SYSTEM_PROMPT, buildUserPrompt } from './prompt.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from the repo root (one level up from /server).
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = Number(process.env.PORT) || 3001;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';
const API_KEY = process.env.ANTHROPIC_API_KEY;

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Single shared client. Constructed lazily so the server can still boot (and
// serve /api/health) even when the key is missing, useful for diagnostics.
let anthropic = null;
function getClient() {
  if (!API_KEY) return null;
  if (!anthropic) anthropic = new Anthropic({ apiKey: API_KEY });
  return anthropic;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model: MODEL, hasApiKey: Boolean(API_KEY) });
});

/**
 * POST /api/generate
 * Validates input, then streams Claude's response back to the client as
 * `text/plain` chunks. The client parses the delimited sections incrementally
 * for the live typing effect.
 */
app.post('/api/generate', async (req, res) => {
  const result = validateProposalInput(req.body);
  if (!result.ok) {
    res.status(400).json({ error: result.error });
    return;
  }

  const client = getClient();
  if (!client) {
    res.status(500).json({
      error: 'Server is missing ANTHROPIC_API_KEY. Add it to your .env file and restart.',
    });
    return;
  }

  // Stream as plain text. We flush headers immediately so the client can begin
  // rendering as soon as the first token arrives.
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  // If the client disconnects mid-stream, abort the upstream request.
  const controller = new AbortController();
  req.on('close', () => controller.abort());

  try {
    const stream = await client.messages.stream(
      {
        model: MODEL,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: buildUserPrompt(result.value) }],
      },
      { signal: controller.signal });

    stream.on('text', (textDelta) => {
      res.write(textDelta);
    });

    await stream.finalMessage();
    res.end();
  } catch (err) {
    if (controller.signal.aborted) {
      // Client went away; nothing more to do.
      res.end();
      return;
    }

    const message =
      err?.error?.error?.message || err?.message || 'Failed to generate proposal.';
    console.error('[generate] error:', message);

    // If we have not sent any body yet, respond with a clean JSON error so the
    // client can surface it. Otherwise, append a sentinel the client detects.
    if (!res.headersSent || !res.writableEnded) {
      try {
        res.write(`\n\n[[ERROR]] ${message}`);
      } catch {
        /* socket already closed */
      }
    }
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`\n  PitchIQ API running on http://localhost:${PORT}`);
  console.log(`  Model: ${MODEL}`);
  if (!API_KEY) {
    console.warn('  ⚠  ANTHROPIC_API_KEY is not set, /api/generate will return 500.\n');
  } else {
    console.log('  ✓ ANTHROPIC_API_KEY detected\n');
  }
});
