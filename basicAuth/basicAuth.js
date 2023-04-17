const base64 = require('base-64');

// function to decrypt the password and username

const decodeCredentials = (authHeader) => {
  // encoded credential are username and password
  const encodedCredentials = authHeader.trim().replace(/^Basic\s*/i, '');
  // to decode this credentials use the base 64 decoder
  const decodedCredentials = base64.decode(encodedCredentials);
  console.log(decodedCredentials.split(':'));
  return decodedCredentials.split(':');
};

//the middleware function
exports.basicAuthMiddleware = (req, res, next) => {
  const [username, password] = decodeCredentials(
    req.headers.authorization || ''
  );

  if (username === 'admin' && password === 'admin') {
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="user_pages"');
  res.status(401).send('Authentication required');
};
//export
