const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth/AuthAndAut");
const adminUserMiddleware = require("../adminUser/adminUser.middleware");

//post request
router.get("/", auth.IsAuth, async (req, res, next) => {
  let user = await adminUserMiddleware.GetUser({ username: req.user });
  let type = await adminUserMiddleware.GetUserType(user.type_id);
  return res.json({
    username: user.username,
    profile_picture: user.profile_picture,
    student_id: user.student_id,
    type: type,
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("admin-local", (err, user, info) => {
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
  let user = await adminUserMiddleware.GetUser({ username: req.user });
  await adminUserMiddleware.deleteAcc(user);
  res.json({ success: true });
});

router.post(
  "/register",
  adminUserMiddleware.createUserCheck,
  async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const staff_id = req.body.staff_id;
    await adminUserMiddleware.CreateUser(username, password, student_id);
    res.json({ success: true });
  }
);

router.post("/password", auth.IsAuth, async (req, res, next) => {
  let username = req.user;
  let password = req.body.password;
  let newPassword = req.body.newPassword;
  response = await adminUserMiddleware.updatePassword(
    username,
    password,
    newPassword
  );
  res.json(response);
});

router.post(
  "/fpassword",
  adminUserMiddleware.fpswCheck,
  async (req, res, next) => {
    password = req.body.password;
    username = req.body.username;
    response = await adminUserMiddleware.updatePassword(username, password);
    res.json(response);
  }
);

router.post("/ppic", adminUserMiddleware.saveProfilePicture);

module.exports = router;
