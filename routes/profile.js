const express = require('express');

const router = express.Router();
const {
  renderProfile,
  renderEditProfile,
  editProfile,
  addStack,
  deleteStack,
} = require('../controllers/profileController');

router
  .route('/:userId')
  .get(renderProfile);

router
  .route('/:userId/edit')
  .get(renderEditProfile)
  .put(editProfile);

router
  .route('/:userId/addStack')
  .put(addStack);

router
  .route('/:userId/deleteStack')
  .delete(deleteStack);

module.exports = router;
