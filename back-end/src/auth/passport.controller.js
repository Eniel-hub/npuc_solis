const auth = require("./passport.middleware");
const userMiddleware = require("../user/user.middleware");
const adminUserMiddleware = require("../adminUser/adminUser.middleware");
const adminMiddleware = require("../adminUser/adminUser.middleware");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("req-flash");

module.exports = (passport) => {
  const fields = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  };
  const Adminfields = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  };
  const Personelfields = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  };

  const StudentVerifyCallback = async (req, username, password, done) => {
    try {
      let user;
      if (!username.match(/[a-zA-Z]/)) {
        let ID = Number(username);
        user = await userMiddleware.GetUser({ ID: ID });
      } else user = await userMiddleware.GetUser({ username: username });
      if (!user) return done(null, false, { error: "username not found" });
      const isValid = userMiddleware.CheckPassword(
        password,
        user.hash,
        user.salt
      );
      if (isValid)
        return done(null, {
          id: user.id,
          username: user.username,
          student_id: user.student_id,
          profile_picture: user.profile_picture,
        });
      else return done(null, false, { error: "wrong password" });
    } catch (err) {
      return done(err);
    }
  };

  const PersonelVerifyCallback = async (req, username, password, done) => {};

  const AdminVerifyCallback = async (req, username, password, done) => {
    try {
      let admin;
      let ID = username;
      admin = await adminMiddleware.GetUser(ID);
      if (!admin) return done(null, false, { error: "ID not found" });
      const isValid = adminMiddleware.CheckPassword(
        password,
        admin.hash,
        admin.salt
      );
      if (isValid == null) {
        adminMiddleware.updatePassword(admin.ID, password);
        return done(null, { ID: admin.ID, type: "admin" });
      } else if (isValid)
        return done(null, {
          ID: admin.ID,
          type: "admin",
          staff_id: admin.staff_id,
          account_name: admin.account_name,
        });
      else return done(null, false, { error: "wrong password" });
    } catch (err) {
      return done(err);
    }
  };

  const studentVerifyStrategy = new LocalStrategy(
    fields,
    StudentVerifyCallback
  );
  passport.use("student-local", studentVerifyStrategy);

  const adminverifyStrategy = new LocalStrategy(
    Adminfields,
    AdminVerifyCallback
  );
  passport.use("spAdmin-local", adminverifyStrategy);

  const adminVerityStrategy = new LocalStrategy(
    Personelfields,
    PersonelVerifyCallback
  );
  passport.use("admin-local", adminVerityStrategy);

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(async (user, done) => {
    try {
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
