require("dotenv").config();
const helper = require("../utils/helper");
const mySQLStore = require("express-mysql-session");
const sessionDbConfig = require("../_db/db.config")[1];

const Initialize = (app, passport, session) => {
  const sessionStore = new mySQLStore(sessionDbConfig);
  app.use(
    session({
      Key: "student_enrollment_key",
      secret: process.env.SESSION_SECRET,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 5, //ms*s*min*hours 5hours
      },
    })
  );
  app.use(passport.authenticate("session"));
  app.use(passport.initialize());
  app.use(passport.session());
};

//middleware

const CheckPassword = (password, hash, salt) => {
  var hashVerify = helper.toHash(password, salt);
  return hash === hashVerify;
};

module.exports = {
  CheckPassword,
  Initialize,
};
