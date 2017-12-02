import Joi from 'joi';
import validator from 'express-validation';
import dataUri from 'datauri'
import { extname } from 'path'

import cloudinary from '../../../config/cloudinary'
import multer from '../../../lib/multer'

// validates incoming request
const validate = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    shopId: Joi.number().integer().required()
  })
};


/**
 * wraps around an async function to handle
 * promise rejection when an error is thrown
 *
 *  @param {function} handler handler
 *  @returns {object} response object
 */
const wrapper = handler =>
(req, res, next) => Promise.resolve(handler(req, res, next))
  .catch((next));


/**
 *
 * @param {object} req
 * @param {object} res
 * @return {object} response object
 */
async function handler(req, res) {
  try {
    const { file, url} = req 
    console.log(file)
    const dUri = new dataUri()
    const image = dUri.format(extname(file.originalname).toString(), file.buffer)
    var fs = require('fs');
    var stream = cloudinary.uploader.upload_stream(function(result) { console.log(result); });
    var file_reader = fs.createReadStream(image, {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);
    // console.log(image)
    // cloudinary.v2
    //   .uploader
    //   .upload(image, (error, result) => {
    //     if (err) {
    //       throw(error)
    //     }
    //     return res.status(201).json({
    //       image: url,
    //       message: 'Image uploaded successfully'
    //     });
    //   })
  } catch(e) {
    console.log(e)
    throw(e)
  }
}

module.exports = [
  // validator(validate),
  multer.single('avatar'),
  wrapper(handler)
];