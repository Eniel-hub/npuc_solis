const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth/AuthAndAut");
const userMiddleware = require("../user/user.middleware");

//post request
router.get("/", auth.IsAuth, async (req, res, next) => {
  let user = await userMiddleware.GetUser({ username: req.user });
  return res.json({
    username: user.username,
    profile_picture: user.profile_picture,
    student_id: user.student_id,
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.json({ error: info.error });
    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.user = user;
      return res.json(user);
    });
  })(req, res, next);
});

router.get("/logout", auth.IsAuth, (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      res.json({ error: "error on logout" });
      return next(err);
    }
    res.json({ success: true });
  });
});

router.get("/delete", auth.IsAuth, async (req, res, next) => {
  let user = await userMiddleware.GetUser({ username: req.user });
  await userMiddleware.deleteAcc(user);
  res.json({ success: true });
});

router.post("/register", userMiddleware.createUserCheck, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const student_id = req.body.student_id;
  await userMiddleware.CreateUser(username, password, student_id);
  res.json({ success: true });
});

router.post("/password", auth.IsAuth, async (req, res, next) => {
  let username = req.user;
  let password = req.body.password;
  let newPassword = req.body.newPassword;
  response = await userMiddleware.updatePassword(
    username,
    password,
    newPassword
  );
  res.json(response);
});

router.post("/fpassword", userMiddleware.fpswCheck, async (req, res, next) => {
  password = req.body.password;
  username = req.body.username;
  response = await userMiddleware.updatePassword(username, password);
  res.json(response);
});

router.post("/ppic", userMiddleware.saveProfilePicture);

module.exports = router;
