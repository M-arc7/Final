import type { Repository } from '../../shared/repository';
import type { Storage, StorageId } from './storage.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface StorageRepository extends Repository<StorageId, Storage> {}
