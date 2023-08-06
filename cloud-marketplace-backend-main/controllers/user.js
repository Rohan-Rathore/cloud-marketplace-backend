const AboutCSP = require("../models/about_csp");
const User = require("../models/user");

exports.completeCSPProfile = (req, res) => {
    const csp = new AboutCSP(req.body);
    console.log(csp);
    csp.save((err, csp) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save csp in DB!"
        });
      }
      res.json({ csp , 'message': 'csp profile update successfully'});
    });
};

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found in DB!"
            }); 
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Updating DB Failed!"
            });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;
        res.json(user);
    });
};