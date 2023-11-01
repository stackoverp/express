module.exports = (req, res) => {
  let phoneNumber = "";
  let passWord = "";
  let nameBank = "";
  let numberBank = "";
  let data = req.flash("data")[0];

  if (typeof data != "undefined") {
    phoneNumber = data.phoneNumber;
    passWord = data.passWord;
    nameBank = data.nameBank;
    numberBank = data.numberBank;
  }

  res.render("register", {
    errors: req.flash("validationErrors"),
    phoneNumber: phoneNumber,
    passWord: passWord,
    nameBank: nameBank,
    numberBank: numberBank,
  });
};
