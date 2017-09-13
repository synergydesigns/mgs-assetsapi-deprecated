'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
    var files, url, i;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            files = req.files, url = req.url;
            i = files.map(function (file) {
              return new _promise2.default(function () {
                var stream = _cloudinary2.default.v2.uploader.upload_stream(function (options, file) {
                  // @TODO broadcast a message to the queue service
                  // to update the product service
                });
                (0, _fs.createReadStream)(file.path).pipe(stream);
              });
            });


            _promise2.default.all(i);
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
_multer2.default.array('assets'), (0, _wrapper2.default)(handler)];