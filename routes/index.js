let express = require('express');
let router = express.Router();
const { renderMainPage } = require('../controllers/indexController');
const { renderMentors } = require('../controllers/mentorController');

router.get('/', renderMainPage);
router.get('/mentors', renderMentors);

module.exports = router;
