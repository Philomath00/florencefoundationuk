import "server-only";

/**
 * In-memory fixed-window rate limiter, keyed by an identifier (typically the
 * client IP). Good enough for a single-region deploy on a low-traffic site.
 *
 * Caveat: each serverless instance has its own memory, so under real
 * multi-instance load this under-counts. If abuse becomes a problem, swap
 * this for Vercel KV / Upstash Redis — same call signature, durable store.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0 };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
}
