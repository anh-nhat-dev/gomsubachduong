const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local");
const { comparePassword } = require("../helpers/auth");

const UserModel = mongoose.model("User");

// local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserModel.findOne({
        email: username,
      }).lean();
      if (!user) throw new Error("Không tìm thấy tài khoản");
      const { password: hash, ...info } = user;
      const isValidPassword = await comparePassword(password, hash);
      if (!isValidPassword) throw new Error("Mật khẩu không chính xác");
      done(null, info, { message: "Đăng nhập thành công" });
    } catch (error) {
      done(null, false, { message: error.message });
    }
  })
);

passport.serializeUser((user, done) => {
  if (user._id) {
    done(false, user._id);
  } else {
    done(null, false);
  }
});
passport.deserializeUser((id, done) => {
  UserModel.findById(id)
    .lean()
    .then((user) => {
      if (!user) return done(null, false);
      const { password, ...info } = user;
      done(null, info);
    })
    .catch((err) => {
      done(err, null);
    });
});
