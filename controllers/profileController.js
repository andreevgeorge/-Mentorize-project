const Mentor = require('../db/models/mentor');
const User = require('../db/models/user');
const Tag = require('../db/models/tag');

exports.renderProfile = async (req, res) => {
  let userId = req.params.userId;
  try {
    //checking if the user is a mentor or a regular user
    const user = await User.findById(userId).exec();
    const mentor = await Mentor.findById(userId).populate('stack').exec();

    if (user) {
      res.render('profile/profile', { User: true, user });
    }

    if (mentor) {
      res.render('profile/profile', { mentor });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.renderEditProfile = async (req, res) => {
  let userId = req.params.userId;

  //checking if the user is a mentor or a regular user 
  //to search in the appropriate database
  try {
    const user = await User.findById(userId).exec();
    const mentor = await Mentor.findById(userId).populate('stack').exec();
    const allTags = await Tag.find();

    if (user) {
      res.render('profile/editProfile', { User: true, user });
    }

    if (mentor) {
      res.render('profile/editProfile', { mentor, allTags });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.editProfile = async (req, res) => {
  let userId = req.params.userId;

  //checking if the user is a mentor or a regular user 
  //to update the appropriate database
  try {
    const user = await User.findById(userId).exec();
    const mentor = await Mentor.findById(userId).exec();

    if (user) {
      await User.findByIdAndUpdate(userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        aboutMe: req.body.aboutMe,
      });
      res.status(200).end();
    }

    if (mentor) {
      await Mentor.findByIdAndUpdate(userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        aboutMe: req.body.aboutMe,
        experience: req.body.experience,
      });
      res.status(200).end();
    }
  } catch (err) {
    console.log(err);
  }
};

exports.addStack = async (req, res) => {
  //getting selected tags from the browser
  let selectedTagId = req.body.tagId;
  let selectedTagName = req.body.tagName;
  let userId = req.params.userId;

  try {
    //finding the authorized mentor
    const mentor = await Mentor.findById(userId).populate('stack').exec();

    //variable for checking if the selected tag
    //is already in the database
    let checkStack = mentor.stack.find((elem) => elem._id.valueOf() === selectedTagId);

    if (!checkStack) {
      //adding the selected tag to the database
      mentor.stack.push({ _id: selectedTagId, tagname: selectedTagName });
      mentor.save();
      res.status(200).end();
    }
  } catch (err) {
    console.log(err);
  }
  res.status(400).end();
};

exports.deleteStack = async (req, res) => {
  let selectedTagId = req.body.tagId;
  let userId = req.params.userId;

  try {
    //finding the authorized mentor
    const mentor = await Mentor.findById(userId);

    //modifying array of stacks to
    //no longer contain the selected tag
    mentor.stack = mentor.stack.filter((el) => el.valueOf() !== selectedTagId)
    mentor.save();
    res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};
