//auth
const IsAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({ isAuth: false });
    console.log("not authenticated");
  }
};

module.exports = {
  IsAuth,
  // IsStudent
};
