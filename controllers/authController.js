const bcrypt = require('bcrypt');
const Mentor = require('../db/models/mentor');
const User = require('../db/models/user');

//function for failing the authorization
function failAuth(res) {
  return res.status(401).end();
}

//assigning only login and id to the session
function serializeUser(user) {
  return {
    id: user.id,
    name: user.login,
  };
}

//functions for export
exports.renderRegisterForm = (req, res) => 
  res.render('authorization/register', { isRegister: true, user: req.query.user, mentor: req.query.mentor });
exports.renderLoginForm = (req, res) => res.render('authorization/login', { isLogin: true });

exports.createUserAndSession = async (req, res, next) => {
  const { name, password, email, hidden } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    //checking if the user wants to register as a mentor 
    //or as a regular user and saving data to the appropriate collection 
    if (hidden === 'mentor') {
      const newMentor = new Mentor({ 
        login: name, 
        password: hashedPassword, 
        email: email
      });
      await newMentor.save();
      req.session.user = serializeUser(newMentor); 
    }

    if (hidden === 'user') {
      const newUser = new User({ 
        login: name, 
        password: hashedPassword,
        email: email
      });
      await newUser.save();
      req.session.user = serializeUser(newUser); 
    }
  } catch (err) {
    console.log(err)
  }
  //sending status 200 back to the browser
  res.status(200).end();
};

exports.checkUserAndCreateSession = async (req, res, next) => {
  const { login, password } = req.body;

  try {
    //simultaneously checking for credentials in both collections (User and Mentor)
    const mentor =  await Mentor.findOne({ login: login }).exec();
    const user = await User.findOne({ login: login }).exec();

    if (user) {
      await bcrypt.compare(password, user.password);
      req.session.user = serializeUser(user);
      res.status(200).end();
    }

    if (mentor) {
      await bcrypt.compare(password, mentor.password);
      req.session.user = serializeUser(mentor);
      res.status(200).end();
    }
    
    if (!user) {
      failAuth(res);
    };

    if (!mentor) {
      failAuth(res);
    }; 
  } catch (err) {
    console.log(err);
  }
}
