import Joi from 'joi';
import validator from 'express-validation';

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
  try {
    const { file, url} = req 
    cloudinary.v2
      .uploader.upload_stream({
        resource_type: 'raw'
      }, (error, result) => console.log(result))
  .end(file.buffer);
  
  res.send()
  
  } catch(e) {
    console.log(e)
    throw(e)
  }
}

module.exports = [
  // validator(validate),
  multer.single('avatar'),
  wrapper(handler)
]