import type { Repository } from '../../shared/repository';
import type { RoleDefinition, RoleDefinitionId } from './role-definition.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface RoleDefinitionRepository extends Repository<RoleDefinitionId, RoleDefinition> {}
