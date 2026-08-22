/** Stores an assessment. Implement domain-specific state transitions here; do not bypass the shared boundary. */
import { serve } from '../../_shared/handler.ts';
import { object } from '../../_shared/validation.ts';
import { AppError } from '../../_shared/errors.ts';

Deno.serve(serve({
  name: 'academy/submit-assessment',
  parse: object,
  execute: async ({ input, actor, correlationId }) => {
    // This explicit fail-closed contract prevents an unfinished function from
    // mutating data without validation, permission checks, audit and tests.
    throw new AppError(501, 'operation_not_implemented', 'Stores an assessment.', { actorId: actor.id, correlationId, acceptedInputKeys: Object.keys(input) });
  }
}));
