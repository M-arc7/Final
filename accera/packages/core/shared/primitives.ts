/** Technology-independent core primitives. */
export type Brand<T, Name extends string> = T & { readonly __brand: Name };
export type EntityStatus = 'active' | 'inactive' | 'suspended' | 'deleted';
export type Metadata = Readonly<Record<string, unknown>>;
export type Timestamped = Readonly<{ createdAt: Date; updatedAt: Date }>;
export const newId = <Name extends string>(value = crypto.randomUUID()) => value as Brand<string, Name>;
