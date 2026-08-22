export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AuthenticatedActor = { id: string; email?: string };
export type RequestContext<T> = { request: Request; actor: AuthenticatedActor; input: T; correlationId: string };
export type Operation<T> = {
  name: string;
  parse: (value: unknown) => T;
  execute: (context: RequestContext<T>) => Promise<unknown>;
};
