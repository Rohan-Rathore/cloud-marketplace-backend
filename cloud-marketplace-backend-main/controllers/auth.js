const User = require("../models/user");   //Good practice to name the variable as defined in models like "User"
const { check, validationResult } = require("express-validator");   //only validationResult is used here
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
      value: errors.array()[0].value
    });
  }

  const user = new User(req.body);    //Creating User class object "user"
  user.save((err, user) => {          //Saving a user
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signin = (req, res) => {
  const data = {
    email: req.body.email['email'],
    password: req.body.password['password'],
  }
  const errors = validationResult(data);
  const { email, password } = data;   //destructuring of body
  
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
      value: errors.array()[0].value
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {   //To export multiple modules we use "exports"   
  res.clearCookie("token");
  res.json({
    message: "User signout successfully!"
  });
};

//protected routes
exports.isSignedIn = expressJwt({   //next() is not written here casue expressJwt already contains it
  secret: process.env.SECRET,
  userProperty: "auth"
})


//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;    //profile is set from the frontend
  if(!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED!"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0 || req.profile.role === 1) {
    return res.status(403).json({
      error: "You are not ADMIN, ACCESS DENIED!"
   });
  }
  next();
}; 

exports.isCSP = (req, res, next) => {
    if(req.profile.role === 0 || req.profile.role === 2) {
      return res.status(403).json({
        error: "You are not CSP, ACCESS DENIED!"
     });
    }
    next();
  }; 