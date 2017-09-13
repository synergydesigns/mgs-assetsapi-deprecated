'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer2.default.diskStorage({
	destination: function destination(req, file, cb) {
		cb(null, (0, _path.join)(__dirname, '../uploads'));
	},
	filename: function filename(req, file, cb) {
		cb(null, file.originalname);
	}
});
/**
 * Multer configuration
 */
var upload = (0, _multer2.default)({
	storage: storage,
	fileFilter: _filter2.default,
	preservePath: true
});

exports.default = upload;