export default (req, file, next) =>  {
  if (!/\.(jpg|jpeg|png)$/.test(file.originalname)) {
    console.log(file)
    return next(new
      Error({
        status: 422,
        message: 'only images in jpg|jpeg|png|gif format are the allowed files'
      }), false)
  }
  return next(null, true)
}
