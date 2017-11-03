import cloudinary from 'cloudinary';
import db from '../models';
require('dotenv').config();

const User = db.User;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

/**
 *  Class ImageController for image upload
 */
class ImageController {
  /**
   * @param{Object}request server request
   * @param{Object} response server response
   * @return{Object} response
   */
  static uploadImage(request, response) {
    if (request.file) {
      cloudinary.v2.uploader.upload(request.file.path, (error, result) => {
        if (result.url) {
          User.findOne({
            where: { id: request.decoded.userId }
          }).then((user) => {
            user.update({
              picture: result.url
            }).then(() => {
              response.status(201).send({
                image: result.url,
                message: 'Image uploaded successfully'
              });
            });
          });
        }
        if (error) {
          response.status(400).send(error);
        }
      });
    } else {
      response.status(404).send('please upload an image');
    }
  }
}
export default ImageController;