import { AppError } from './errors.ts';
export function success(data: unknown, correlationId: string, status = 200): Response { return Response.json({ data, meta: { correlationId } }, { status }); }
export function failure(error: unknown, correlationId: string): Response { const appError = error instanceof AppError ? error : new AppError(500, 'internal_error', 'An unexpected error occurred.'); return Response.json({ error: { code: appError.code, message: appError.message, details: appError.details }, meta: { correlationId } }, { status: appError.status }); }
