import type { Repository } from '../../shared/repository';
import type { FileMetadata, FileMetadataId } from './file-metadata.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface FileMetadataRepository extends Repository<FileMetadataId, FileMetadata> {}
