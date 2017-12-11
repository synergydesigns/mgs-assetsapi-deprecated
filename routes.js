import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validate from 'express-validation';
import { join } from 'path'
const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

validate.options({
  status: 422
});

const router = express.Router();

// routes
app.post('/api/v1/upload', require('./app/controllers/image/post.image.js'))
app.post('/api/v1/uploads', require('./app/controllers/image/post.multiImage.js'))
app.use('/api/v1', router);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Mega Shop Assets Micro services',
}));

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  if (err instanceof validate.ValidationError) {
    return res.status(422).json({
      status: err.status,
      message: err.statusText,
      errors: err.errors.map(error => ({
        field: error.field.join(', '),
        message: error.messages.join(', '),
        location: error.location,
      }))
    });
  } else if (err.name === 'SequelizeValidationError') {
    return res.status(422).json({
      status: 422,
      message: 'An error occurred validating your request',
      errors: err.errors.map(error => ({
        field: error.path,
        message: error.message,
        location: 'database',
      }))
    });
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      status: 400,
      message: 'An error occurred foreign Key constraint',
      errors: {
        field: err.path,
        message: err.parent.detail,
        location: err.parent.table,
      }
    });
  } else if (err.status) {
    return res
      .status(err.status)
      .json({ message: err.message });
  }
  res.status(500)
    .json({ message: 'Server Error', error: err });
});
export default app;