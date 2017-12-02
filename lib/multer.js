import multer from 'multer'
import fileFilter from './filter'
/**
 * Multer configuration
 */
const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: fileFilter
});

export default upload