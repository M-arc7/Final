import { CoreError } from '../../shared/errors';
import { createFileMetadata, transitionFileMetadataStatus } from './file-metadata.entity';
import type { FileMetadataRepository } from './file-metadata.repository';
import type { CreateFileMetadataInput, FileMetadata, FileMetadataId, FileMetadataStatus } from './file-metadata.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class FileMetadataService {
  constructor(private readonly repository: FileMetadataRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: FileMetadataId): Promise<FileMetadata | null> { return this.repository.findById(id); }
  async create(input: CreateFileMetadataInput): Promise<FileMetadata> { return this.repository.insert(createFileMetadata(input, this.now())); }
  async changeStatus(id: FileMetadataId, status: FileMetadataStatus): Promise<FileMetadata> { const record = await this.repository.findById(id); if (!record) throw new CoreError('file-metadata.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionFileMetadataStatus(record, status, this.now())); }
}
