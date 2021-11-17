const Mentor = require('../db/models/mentor');

exports.renderMainPage = async (req, res) => {
  mentors = await Mentor.find().populate('stack');

  res.render('index', { mentor1 : mentors[0], mentor2 : mentors[1], mentor3 : mentors[2]});
}

