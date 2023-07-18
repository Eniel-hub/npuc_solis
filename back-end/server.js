require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const flash = require("req-flash");
const passport = require("passport");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const homeRouter = require("./src/routes/home.route");
const userRouter = require("./src/routes/user.route");
const schoolRouter = require("./src/routes/school.route");
const studentRouter = require("./src/routes/student.route");
const pportMiddleware = require("./src/auth/passport.middleware");
const pportController = require("./src/auth/passport.controller");
const registrationRouter = require("./src/routes/registration.route");

const app = express();
const IP = process.env.IP || "localhost";
const PORT = process.env.PORT || 8080;
const appIP = process.env.appIP || "localhost";
const appPORT = process.env.appPORT || 4200;

//middleware
pportMiddleware.Initialize(app, passport, session);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
pportController(passport);
app.use(express.json());
app.use(flash());
app.use(
  cors({
    origin: [`http://${appIP}:${appPORT}`],
    credentials: true,
  })
);
app.use(
  fileUpload({
    limits: {
      fileSize: 10 * 1024 * 1024, //10Mo
    },
    abortOnLimit: true,
  })
);

//routes
app.use("/home", homeRouter);
app.use("/user", userRouter);
app.use("/school", schoolRouter);
app.use("/student", studentRouter);
app.use("/registration", registrationRouter);
app.get("/", (req, res) => {
  res.redirect("/home");
});

//launch application
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`app running at: http://${IP}:${PORT}`);
});
