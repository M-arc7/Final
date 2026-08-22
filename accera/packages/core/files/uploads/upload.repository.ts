import type { Repository } from '../../shared/repository';
import type { Upload, UploadId } from './upload.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface UploadRepository extends Repository<UploadId, Upload> {}
