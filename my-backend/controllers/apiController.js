// ใน controllers/apiController.js
exports.getUserData = async (req, res) => {
  const userId = req.params.id;
  const user = await UserModel.findById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
