const express = require('express');
const router = express.Router();
const { destroySession } = require("../controllers/signoutController");

router.get('/', destroySession);

module.exports = router;