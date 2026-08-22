import type { Repository } from '../../shared/repository';
import type { FileFolder, FileFolderId } from './file-folder.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface FileFolderRepository extends Repository<FileFolderId, FileFolder> {}
