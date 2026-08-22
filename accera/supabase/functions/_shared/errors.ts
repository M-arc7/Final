export class AppError extends Error {
  constructor(public readonly status: number, public readonly code: string, message: string, public readonly details?: unknown) { super(message); }
}
export const unauthorized = () => new AppError(401, 'unauthorized', 'Authentication is required.');
export const forbidden = () => new AppError(403, 'forbidden', 'You are not permitted to perform this operation.');
export const validationError = (details: unknown) => new AppError(422, 'validation_error', 'The request is invalid.', details);
