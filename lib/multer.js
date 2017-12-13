import multer from 'multer'
import fileFilter from './filter'
import { join } from 'path'


const storage  = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, join(__dirname, '../uploads'))
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})
/**
 * Multer configuration
 */
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	preservePath: true
});

export default upload