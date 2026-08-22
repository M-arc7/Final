import { CoreError } from '../../shared/errors';
import { createUpload, transitionUploadStatus } from './upload.entity';
import type { UploadRepository } from './upload.repository';
import type { CreateUploadInput, Upload, UploadId, UploadStatus } from './upload.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class UploadService {
  constructor(private readonly repository: UploadRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: UploadId): Promise<Upload | null> { return this.repository.findById(id); }
  async create(input: CreateUploadInput): Promise<Upload> { return this.repository.insert(createUpload(input, this.now())); }
  async changeStatus(id: UploadId, status: UploadStatus): Promise<Upload> { const record = await this.repository.findById(id); if (!record) throw new CoreError('upload.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionUploadStatus(record, status, this.now())); }
}
