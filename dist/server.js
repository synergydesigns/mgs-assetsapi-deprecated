'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsLogger = require('js-logger');

var _jsLogger2 = _interopRequireDefault(_jsLogger);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silence: true });
_jsLogger2.default.useDefaults();

var port = parseInt(process.env.PORT, 10) || 9090;
_routes2.default.set('port', port);

var server = _http2.default.createServer(_routes2.default);

_routes2.default.listen(port);

_jsLogger2.default.info('Service running on ' + process.env.HOST + ':' + port);

exports.default = server;