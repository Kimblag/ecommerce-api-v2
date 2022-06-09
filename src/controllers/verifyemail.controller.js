import User from "../models/User.js";

export const verifyEmail = async (req, res, next) => {
  try {
    const {id} = req.query;
    // console.log("ID DE VERIFY",id);
    const user = await User.findByPk(id);
    // console.log("SOY USEEEER verifycontroller", user);
    if (user) {
      user.isVerified = true;
      await user.save();
      res.status(200).redirect("https://client-henryshoes.vercel.app/profile"); //!Luego sera al profile
      console.log("Email verified");
    } else {
      res.redirect("https://client-henryshoes.vercel.app");
      console.log("Email is not verified");
    }
  } catch (error) {
    console.log(error);
  }
};
