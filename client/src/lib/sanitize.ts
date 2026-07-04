/**
 * Remove em dashes from generated text. Per product preference, em dashes (—)
 * must never appear in proposals — even in AI-generated output. We replace them
 * with a comma (the most natural substitute for the parenthetical/appositive
 * usage the model tends to produce) and tidy any resulting doubled punctuation.
 *
 * En dashes (–) are intentionally preserved, since they appear in legitimate
 * ranges like "$1k–$5k" and "2–3 months".
 */
export function stripEmDash(text: string): string {
  return text
    .replace(/\s*—\s*/g, ', ')
    .replace(/,\s*([.,;:!?)\]])/g, '$1')
    .replace(/([(\[])\s*,\s*/g, '$1');
}
