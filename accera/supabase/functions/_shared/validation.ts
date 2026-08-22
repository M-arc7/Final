import { validationError } from './errors.ts';
export function object(value: unknown): Record<string, unknown> { if (!value || typeof value !== 'object' || Array.isArray(value)) throw validationError([{ path: '$', message: 'Expected an object.' }]); return value as Record<string, unknown>; }
export function string(value: unknown, field: string): string { if (typeof value !== 'string' || value.trim() === '') throw validationError([{ path: field, message: 'Expected a non-empty string.' }]); return value.trim(); }
export function uuid(value: unknown, field: string): string { const result = string(value, field); if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(result)) throw validationError([{ path: field, message: 'Expected a UUID.' }]); return result; }
