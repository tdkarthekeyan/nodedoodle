var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config'); // get our config file





function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];

  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, 'asterix-needs-permit-a-38', function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

    // if everything is good, save to request for use in other routes
    req.data = decoded.driver_id;
    next();
  });

}




module.exports = verifyToken;