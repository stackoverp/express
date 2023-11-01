const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    await User.create(req.body);
    console.log("User registered successfully!");
    res.redirect("/");
  } catch (error) {
    console.error("Error during user registration:", error);

    if (error && error.errors) {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      req.flash("validationErrors", validationErrors);
      req.flash("data", req.body);
    }

    res.redirect("/register");
  }
};
