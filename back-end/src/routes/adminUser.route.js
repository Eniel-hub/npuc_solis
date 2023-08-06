const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth/AuthAndAut");
const adminUserMiddleware = require("../adminUser/adminUser.middleware");

//post request
router.get("/", auth.IsAuth, async (req, res, next) => {
  try {
    console.log(req.user);
    let admin = await adminUserMiddleware.GetUser(req.user.ID);
    if (admin)
      return res.json({
        ID: admin.ID,
        account_name: admin.account_name,
        staff_id: admin.staff_id,
      });
    return res.json({ error: "not an admin" });
  } catch (error) {
    return res.json({ error: error });
  }
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

router.post("/getsch", adminUserMiddleware.getSchool);

router.post("/getstu", adminUserMiddleware.getStudents);

router.get("/getyears", adminUserMiddleware.getSchoolYears);

router.post("/getgrades", adminUserMiddleware.getGradeLevels);

router.post("/getsections", adminUserMiddleware.getGradeSections);

router.post("/getteach", adminUserMiddleware.getTeacher);

module.exports = router;
