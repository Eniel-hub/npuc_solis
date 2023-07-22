const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth/AuthAndAut");
const adminUserMiddleware = require("../adminUser/adminUser.middleware");

//post request
router.get("/", auth.IsAuth, async (req, res, next) => {
  console.log("called");
  res.json({ msg: "called" });
  // let admin = await adminUserMiddleware.GetUser(req.admin);
  // return res.json({
  //   ID: admin.ID,
  //   account_name: admin.account_name,
  //   staff_id: admin.staff_id,
  // });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("spAdmin-local", (err, admin, info) => {
    if (err) return next(err);
    if (!admin) return res.json({ error: info.error });
    req.logIn(admin, (err) => {
      if (err) return next(err);
      req.session.user = admin;
      return res.json(admin);
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

router.post("/password", auth.IsAuth, async (req, res, next) => {
  let ID = req.admin;
  let password = req.body.password;
  let newPassword = req.body.newPassword;
  response = await adminUserMiddleware.updatePassword(
    ID,
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
    ID = req.body.username;
    response = await adminUserMiddleware.updatePassword(ID, password);
    res.json(response);
  }
);

module.exports = router;
