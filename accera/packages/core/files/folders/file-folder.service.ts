import { CoreError } from '../../shared/errors';
import { createFileFolder, transitionFileFolderStatus } from './file-folder.entity';
import type { FileFolderRepository } from './file-folder.repository';
import type { CreateFileFolderInput, FileFolder, FileFolderId, FileFolderStatus } from './file-folder.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class FileFolderService {
  constructor(private readonly repository: FileFolderRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: FileFolderId): Promise<FileFolder | null> { return this.repository.findById(id); }
  async create(input: CreateFileFolderInput): Promise<FileFolder> { return this.repository.insert(createFileFolder(input, this.now())); }
  async changeStatus(id: FileFolderId, status: FileFolderStatus): Promise<FileFolder> { const record = await this.repository.findById(id); if (!record) throw new CoreError('file-folder.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionFileFolderStatus(record, status, this.now())); }
}
