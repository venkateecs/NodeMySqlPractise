let config = require('../config/config');
let jwt = require('jsonwebtoken');

class utils {
 static  validateToken (token) {
    let validStatus;
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
      if (err) {
        validStatus = false;
      }
      else {
        validStatus = true;
      }
    });
    return validStatus;
  }
}
module.exports = utils ;