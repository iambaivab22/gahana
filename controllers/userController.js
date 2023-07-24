const User = require("../modals/userModal");

const registerUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  console.log(findUser, "findUser");
  if (!findUser) {
    //create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    res.json({
      message: "user already exist",
      success: false,
    });
    //user already exist
  }
};

module.exports = registerUser;
