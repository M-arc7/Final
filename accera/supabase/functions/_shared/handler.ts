import { authenticate } from './auth.ts';
import { corsHeaders } from './cors.ts';
import { AppError, validationError } from './errors.ts';
import { log } from './logging.ts';
import { failure, success } from './response.ts';
import type { Operation } from './types.ts';

export function serve<T>(operation: Operation<T>): (request: Request) => Promise<Response> {
  return async (request) => {
    const correlationId = request.headers.get('x-correlation-id') ?? crypto.randomUUID();
    const headers = corsHeaders(request);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    try {
      if (request.method !== 'POST') throw new AppError(405, 'method_not_allowed', 'Use POST.');
      const actor = await authenticate(request);
      let payload: unknown;
      try { payload = await request.json(); } catch { throw validationError([{ path: '$', message: 'Expected JSON.' }]); }
      const data = await operation.execute({ request, actor, input: operation.parse(payload), correlationId });
      log('info', 'edge_function_succeeded', { operation: operation.name, actorId: actor.id, correlationId });
      return success(data, correlationId, 200);
    } catch (error) {
      log(error instanceof AppError && error.status < 500 ? 'warn' : 'error', 'edge_function_failed', { operation: operation.name, correlationId, code: error instanceof AppError ? error.code : 'internal_error' });
      return failure(error, correlationId);
    }
  };
}
