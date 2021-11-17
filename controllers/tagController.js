const Mentor = require('../db/models/mentor');
const Tag = require('../db/models/tag');

exports.renderMentorsViaTags = async (req, res) => {
  let tagId = req.params.tagId;

  try {
    //finding all mentors and the required stack
    let allMentors = await Mentor.find().populate('stack');
    let tagName = await Tag.findById(tagId);

    //filtering all mentors by the required stack
    let stackMentors = allMentors.filter((el) => el.stack.find((elem) => elem._id.valueOf() === tagId));
    
    res.render('mentors', { tagSearch: true, stackMentors, tagName})
  } catch (err) {
    console.log(err);
  }
}
