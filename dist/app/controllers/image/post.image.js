'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 *
 * @param {object} req
 * @param {object} res
 * @return {object} response object
 */
var handler = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var file, url, stream;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            file = req.file, url = req.url;
            stream = _cloudinary2.default.v2.uploader.upload_stream(function (options, file) {
              // @TODO broadcast a message to the queue service
              // to update the product service
              // res.send({file})        
            });

            (0, _fs.createReadStream)(file.path).pipe(stream);
            res.status(200).send({ message: 'Your files are been uploaded' });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _fs = require('fs');

var _cloudinary = require('../../../config/cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _multer = require('../../../lib/multer');

var _multer2 = _interopRequireDefault(_multer);

var _wrapper = require('../../../lib/wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// validates incoming request
var validate = {
  body: _joi2.default.object().keys({
    name: _joi2.default.string().required(),
    description: _joi2.default.string(),
    shopId: _joi2.default.number().integer().required()
  })
};

module.exports = [
// validator(validate),
_multer2.default.single('asset'), (0, _wrapper2.default)(handler)];