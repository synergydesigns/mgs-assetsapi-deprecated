
/**
 * wraps around an async function to handle
 * promise rejection when an error is thrown
 *
 *  @param {function} handler handler
 *  @returns {object} response object
 */
export default  handler =>
(req, res, next) => Promise.resolve(handler(req, res, next))
  .catch((next));
