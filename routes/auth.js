const express = require('express');
const router = express.Router();
const {
  checkUserAndCreateSession,
  createUserAndSession, 
  renderLoginForm,
  renderRegisterForm
} = require("../controllers/authController");

router
  .route('/register')
  .get(renderRegisterForm)
  .post(createUserAndSession);

router
  .route('/login')
  .get(renderLoginForm)
  .post(checkUserAndCreateSession);

module.exports = router;