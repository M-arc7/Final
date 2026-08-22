import { CoreError } from '../../shared/errors';
import type { StorageRepository } from './storage.repository';
import type { CreateStorageInput, Storage, StorageId, StorageStatus } from './storage.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class StorageService {
  constructor(private readonly repository: StorageRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: StorageId): Promise<Storage | null> { return this.repository.findById(id); }
  async save(record: Storage): Promise<Storage> { return this.repository.replace(record); }
}
