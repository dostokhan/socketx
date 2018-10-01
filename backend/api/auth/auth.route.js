const express = require('express');
const controller = require('./auth.controller');

const router = express.Router();

router
  .route('/cleardata')
  .get(controller.clear);

router
  .route('/signin')
  .post(controller.signin);


router
  .route('/signup')
  .post(controller.signup);


module.exports = router;
