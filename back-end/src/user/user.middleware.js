require("dotenv").config();
const helper = require("../utils/helper");
const userService = require("../user/user.service");
const studentService = require("../student/student.service");

const fpswCheck = async (req, res, next) => {
  let username = req.body.username;
  let student_id = req.body.student_id;
  let user = await GetUser({ username: username });
  if (!user) return res.json({ error: "username not found" });
  if (user.student_id != student_id)
    return res.json({ error: "id and username don't match" });
  next();
};

const deleteAcc = async (user) => {
  await userService.deleteAcc(user);
};

const updatePassword = async (username, password, newPassword) => {
  if (!newPassword) {
    try {
      let pass = GenPassword(password);
      const User = {
        username: username,
        hash: pass.hash,
        salt: pass.salt,
      };
      await userService.ChangePassword(User);
      return { success: true };
    } catch (err) {
      console.log(`error while updating password ${err.message}`);
      return { error: "an error occured" };
    }
  }
  let user = await GetUser({ username: username });
  if (CheckPassword(password, user.hash, user.salt)) {
    try {
      if (CheckPassword(newPassword, user.hash, user.salt))
        return { error: "old password" };

      let pass = GenPassword(newPassword);
      const User = {
        username: username,
        hash: pass.hash,
        salt: pass.salt,
      };
      await userService.ChangePassword(User);
      return { success: true };
    } catch (err) {
      console.log(`error while updating password ${err.message}`);
      return { error: "an error occured" };
    }
  } else {
    return { error: "wrong password" };
  }
};

const createUserCheck = async (req, res, next) => {
  try {
    const student = await studentService.GetStudent(req.body.student_id);
    if (student || req.body.student_id == 0) {
      try {
        let user = await GetUser({ username: req.body.username });
        if (user) {
          res.json({ error: "username taken" });
          return;
        } else {
          if (req.body.student_id != 0) {
            user = await GetUser({ ID: req.body.student_id });
            if (user) {
              res.json({ error: "ID taken" });
              return;
            } else {
              next();
            }
          } else {
            next();
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      res.json({ error: "id not found" });
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

const CreateUser = async (username, password, ID) => {
  try {
    password = GenPassword(password);
    let newUser;
    if (ID == 0) {
      newUser = {
        username: username,
        hash: password.hash,
        salt: password.salt,
      };
    } else {
      newUser = {
        username: username,
        hash: password.hash,
        salt: password.salt,
        student_id: ID,
      };
    }
    await userService.CreateUser(newUser);
  } catch (err) {
    console.log(`error while creating new user ${err.message}`);
  }
};

const GetUser = async ({ username, ID }) => {
  if (username) {
    try {
      const [user] = await userService.GetUser(username);
      return user;
    } catch (err) {
      console.log(`error while getting user by name : ${err.message}`);
    }
  }
  if (ID) {
    try {
      const [user] = await userService.GetUserI(ID);
      return user;
    } catch (err) {
      console.log(`error while getting user by name : ${err.message}`);
    }
  }
};

const GenPassword = (password) => {
  const pass = helper.GenPassword(password);
  return pass;
};

const CheckPassword = (password, hash, salt) => {
  var hashVerify = helper.toHash(password, salt);
  return hash === hashVerify;
};

const saveProfilePicture = async (req, res, next) => {
  const user = await GetUser({ username: req.user });
  const img = req.files.img;
  // If no image submitted, exit
  if (!img) return res.status(400).json({ error: "no file found" });
  //if not an image exit
  if (!img.mimetype.match("image")) {
    return res.status(400).json({ error: "file is not an image" });
  }
  //change img name
  const ext = "." + img.mimetype.substring(6);
  img.name = `user_00${user.id}${ext}`;

  const imgPath = process.cwd() + "/public/profilepictures/" + img.name;

  // save the img path to databse
  img.mv(imgPath).then(async () => {
    try {
      await userService.setProfilePicture(img, user);
      res.status(200).json({ success: true });
    } catch (err) {
      console.log(`an error occured while changing the profile picture ${err}`);
      res.status(400).json({ error: err });
    }
  });
};

module.exports = {
  saveProfilePicture,
  createUserCheck,
  updatePassword,
  CheckPassword,
  CreateUser,
  deleteAcc,
  fpswCheck,
  GetUser,
};
