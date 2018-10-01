exports.errorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token');
  } else {
    next(err);
  }


  // if (res.headersSent) {
  //   return next(err)
  // }
  // res.status(500)
  // res.render('error', { error: err })
};
