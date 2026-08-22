const allowedOrigins = new Set((Deno.env.get('ALLOWED_ORIGINS') ?? '').split(',').filter(Boolean));

export function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get('origin');
  const allowedOrigin = !origin || allowedOrigins.size === 0 || allowedOrigins.has(origin) ? (origin ?? '*') : 'null';
  return { 'access-control-allow-origin': allowedOrigin, 'access-control-allow-headers': 'authorization, content-type, idempotency-key, x-correlation-id', 'access-control-allow-methods': 'POST, OPTIONS', vary: 'Origin' };
}
