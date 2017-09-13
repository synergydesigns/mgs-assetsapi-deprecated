"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * wraps around an async function to handle
 * promise rejection when an error is thrown
 *
 *  @param {function} handler handler
 *  @returns {object} response object
 */
exports.default = function (handler) {
  return function (req, res, next) {
    return _promise2.default.resolve(handler(req, res, next)).catch(next);
  };
};