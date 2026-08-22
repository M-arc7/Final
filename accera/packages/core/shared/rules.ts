import type { EntityStatus } from './primitives';
export const canTransitionStatus = (from: EntityStatus, to: EntityStatus): boolean => from !== 'deleted' && (from !== to || to === 'deleted');
