const Mentor = require('../db/models/mentor');

exports.renderMentors = async (req, res) => {
  let mentors;

  try {
    mentors = await Mentor.find().populate('stack');
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
  return res.render('mentors', { mentors });
};

exports.renderMentor = async (req, res) => {
  let mentorId = req.params.mentorId;
  let mentor;

  try {
    mentor = await Mentor.findById(mentorId).populate('stack');
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
  return res.render('mentor', { mentor });
};
