require("dotenv").config();
const helper = require("../utils/helper");
const adminService = require("../adminUser/adminUser.service");

const fpswCheck = async (req, res, next) => {
  //implement email checking

  next();
};

const updatePassword = async (ID, password, newPassword) => {
  if (!newPassword) {
    try {
      let pass = GenPassword(password);
      const admin = {
        ID: ID,
        hash: pass.hash,
        salt: pass.salt,
      };
      await adminService.ChangePassword(admin);
      return { success: true };
    } catch (err) {
      console.log(`error while updating password ${err.message}`);
      return { error: "an error occured" };
    }
  }
  let admin = await GetUser(ID);
  if (CheckPassword(password, admin.hash, admin.salt)) {
    try {
      if (CheckPassword(newPassword, admin.hash, admin.salt))
        return { error: "old password" };

      let pass = GenPassword(newPassword);
      const admin = {
        ID: ID,
        hash: pass.hash,
        salt: pass.salt,
      };
      await adminService.ChangePassword(admin);
      return { success: true };
    } catch (err) {
      console.log(`error while updating password ${err.message}`);
      return { error: "an error occured" };
    }
  } else {
    return { error: "wrong password" };
  }
};

const GetUser = async (ID) => {
  let admin;
  if (ID) {
    try {
      const [userRetrieved] = await adminService.GetUser(ID);
      admin = userRetrieved;
    } catch (err) {
      console.log(`error while getting admin by ID : ${err.message}`);
    }
  }
  return admin;
};

const GenPassword = (password) => {
  const pass = helper.GenPassword(password);
  return pass;
};

const CheckPassword = (password, hash, salt) => {
  if (salt == null) return null;
  var hashVerify = helper.toHash(password, salt);
  return hash === hashVerify;
};

module.exports = {
  updatePassword,
  CheckPassword,
  fpswCheck,
  GetUser,
};
