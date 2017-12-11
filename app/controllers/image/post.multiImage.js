import Joi from 'joi';
import validator from 'express-validation';
import { createReadStream } from 'fs'

import cloudinary from '../../../config/cloudinary'
import multer from '../../../lib/multer'
import wrapper from '../../../lib/wrapper'

// validates incoming request
const validate = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    shopId: Joi.number().integer().required()
  })
};


/**
 *
 * @param {object} req
 * @param {object} res
 * @return {object} response object
 */
async function handler(req, res) {
  const { files, url} = req 
  const i =  files.map(file => new Promise(() => {
    const stream = cloudinary.v2.uploader
    .upload_stream((options, file)=> {
      // @TODO broadcast a message to the queue service
      // to update the product service
    });
    createReadStream(file.path).pipe(stream)
  }))

  Promise.all(i)
    res.status(200)
    .send({message: 'Your files are been uploaded'})
}

module.exports = [
  // validator(validate),
  multer.array('assets'),
  wrapper(handler)
]