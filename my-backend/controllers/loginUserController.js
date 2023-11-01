const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = (req, res) => {
  const { phoneNumber, passWord } = req.body; // use phoneNumber and passWord

  User.findOne({ phoneNumber: phoneNumber })
    .then((user) => {
      // use phoneNumber
      console.log(user);

      if (user) {
        bcrypt
          .compare(passWord, user.passWord)
          .then((match) => {
            // use passWord
            if (match) {
              req.session.userId = user._id;
              res.redirect("/home");
            } else {
              res.redirect("/login");
            }
          })
          .catch((error) => {
            console.error(error);
            res.redirect("/login");
          });
      } else {
        res.redirect("/login");
      }
    })
    .catch((error) => {
      console.error(error);
      res.redirect("/login");
    });
};
