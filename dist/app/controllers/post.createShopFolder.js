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
    var file, url;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            file = req.file, url = req.url;

            _cloudinary2.default.v2.uploader.upload_stream({
              resource_type: 'raw'
            }, function (error, result) {
              return console.log(result);
            }).end(file.buffer);

            res.send();

            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            throw _context.t0;

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 6]]);
  }));

  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

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
_multer2.default.single('avatar'), (0, _wrapper2.default)(handler)];