let express = require('express');
let router = express.Router();
const { renderMentor } = require('../controllers/mentorController');

router.get('/:mentorId', renderMentor);

module.exports = router;
