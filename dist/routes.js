'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

_expressValidation2.default.options({
  status: 422
});

var router = _express2.default.Router();

// routes
app.post('/api/v1/upload', require('./app/controllers/image/post.image.js'));
app.post('/api/v1/uploads', require('./app/controllers/image/post.multiImage.js'));
app.use('/api/v1', router);
app.get('*', function (req, res) {
  return res.status(200).send({
    message: 'Welcome to Mega Shop Assets Micro services'
  });
});

/* eslint-disable no-unused-vars */
app.use(function (err, req, res, next) {
  if (err instanceof _expressValidation2.default.ValidationError) {
    return res.status(422).json({
      status: err.status,
      message: err.statusText,
      errors: err.errors.map(function (error) {
        return {
          field: error.field.join(', '),
          message: error.messages.join(', '),
          location: error.location
        };
      })
    });
  } else if (err.name === 'SequelizeValidationError') {
    return res.status(422).json({
      status: 422,
      message: 'An error occurred validating your request',
      errors: err.errors.map(function (error) {
        return {
          field: error.path,
          message: error.message,
          location: 'database'
        };
      })
    });
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      status: 400,
      message: 'An error occurred foreign Key constraint',
      errors: {
        field: err.path,
        message: err.parent.detail,
        location: err.parent.table
      }
    });
  } else if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: 'Server Error', error: err });
});
exports.default = app;