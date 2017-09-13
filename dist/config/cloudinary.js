'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _config$cloudinary = _config2.default.cloudinary,
    cloudName = _config$cloudinary.cloudName,
    apiKey = _config$cloudinary.apiKey,
    apiSecret = _config$cloudinary.apiSecret;


_cloudinary2.default.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

exports.default = _cloudinary2.default;