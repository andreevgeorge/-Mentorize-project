const express = require('express');
const router = express.Router();
const { renderMentorsViaTags } = require("../controllers/tagController");

router
  .route('/:tagId')
  .get(renderMentorsViaTags);

module.exports = router;