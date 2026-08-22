/** Records attributed score data. Implement domain-specific state transitions here; do not bypass the shared boundary. */
import { serve } from '../../_shared/handler.ts';
import { object } from '../../_shared/validation.ts';
import { AppError } from '../../_shared/errors.ts';

Deno.serve(serve({
  name: 'competition/record-score',
  parse: object,
  execute: async ({ input, actor, correlationId }) => {
    // This explicit fail-closed contract prevents an unfinished function from
    // mutating data without validation, permission checks, audit and tests.
    throw new AppError(501, 'operation_not_implemented', 'Records attributed score data.', { actorId: actor.id, correlationId, acceptedInputKeys: Object.keys(input) });
  }
}));
