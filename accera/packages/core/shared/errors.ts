/** Domain errors never encode HTTP status or transport response shape. */
export class CoreError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly context: Readonly<Record<string, unknown>> = {},
  ) {
    super(message);
    this.name = "CoreError";
  }
}
export const invariant: (
  condition: unknown,
  code: string,
  message: string,
  context?: Readonly<Record<string, unknown>>,
) => asserts condition = (condition, code, message, context = {}) => {
  if (!condition) throw new CoreError(code, message, context);
};
