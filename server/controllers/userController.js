const { findById } = require("../models/userModel");
const User = require("../models/userModel");

module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res
        .status(400)
        .json({ msg: "Username already in use", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res
        .status(400)
        .json({ msg: "Email already in use", status: false });
    const user = new User({ username, email, password });
    await user.save();
    return res
      .status(201)
      .json({ msg: "User registered succesfully", status: true });
  } catch (err) {
    next(err);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user)
      return res
        .status(400)
        .json({ status: false, msg: "incorrect username or password" });
    if (user.comparePassword(password) === false)
      return res
        .status(400)
        .json({ status: false, msg: "incorrect username or password" });
    const token = user.createJWT();
    const { password: pass, ...rest } = user._doc;
    return res.status(200).json({ user: rest, status: true, token });
  } catch (err) {
    next(err);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const { avatarImage } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarImage, isAvatarImageSet: true },
      { new: true }
    );
    console.log(user);
    return res
      .status(200)
      .json({ isSet: user.isAvatarImageSet, image: user.avatarImage });
  } catch (err) {
    next(err);
  }
};

module.exports.getContacts = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
};

module.exports.addContact = async () => {
  try {
        const {contactId}=req.params;
        const user=await User.findById(req.user._id);
        user.contacts={...user.contacts,contactId};
        
  } catch (err) {
    next(err);
  }
};
