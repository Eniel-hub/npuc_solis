require("dotenv").config();
const helper = require("../utils/helper");
const syService = require("../school/sy.service");
const adminService = require("../adminUser/adminUser.service");

const fpswCheck = async (req, res, next) => {
  // implement email checking

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

const getSchool = async (req, res, next) => {
  let admin = req.body.admin;
  // let admin = req.user;

  let [result] = await adminService.GetSchool(admin.staff_id);
  let school = helper.EmptyOrRows(result);
  return res.status(200).json(school);
};

const getStudents = async (req, res, next) => {
  try {
    let section_id = req.body.section_id;
    let school_year_id = req.body.school_year_id;

    let students = await adminService.GetStudents(section_id, school_year_id);
    return res.status(200).json(students);
  } catch (err) {
    console.log("an error occured while getting students", err);
    return res.status(400).json({ error: err });
  }
};

const getSchoolYears = async (req, res, next) => {
  let schoolYears = await syService.GetAllYears();
  return res.status(200).json(schoolYears);
};

const getGradeLevels = async (req, res, next) => {
  let school_id = req.body.school_id;
  let gradeLevels = await adminService.GetGradeLevels(school_id);
  return res.status(200).json(gradeLevels);
};

const getGradeSections = async (req, res, next) => {
  let grade_id = req.body.grade_id;
  let sections = await adminService.GetGradeSections(grade_id);
  return res.status(200).json(sections);
};

const getTeacher = async (req, res, next) => {
  let section_id = req.body.section_id;
  let teacher = await adminService.GetTeacher(section_id);
  return res.status(200).json(teacher);
};

const Get = async (req, res, next) => {
  let user = req.user;
  if (user.type.toLowerCase() == "admin") {
    user = await GetUser(user.ID);
    return res.json({
      ID: user.ID,
      staff_id: user.staff_id,
      account_name: user.account_name,
      type: "admin",
    });
  } else next();
};

const getregistration = async (req, res, next) => {
  let regid = req.body.regid;
  try {
    let record = await adminService.getregistration(regid);
    record.application_date = record.application_date
      ? helper.FormatDate(record.application_date)
      : helper.FormatDate(record.reg_date);
    return res.json(record);
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
};

const deleteRegistration = async (req, res, next) => {
  let regid = req.body.regid;
  await adminService.deleteRegistration(regid);
  return res.json({ success: true });
};

const approveRegistration = async (req, res, next) => {
  let registration = req.body;

  await adminService.approveRegistration(registration);
  return res.json({ success: true });
};

const rejectRegistration = async (req, res, next) => {
  let regid = req.body.regid;
  let remarks = req.body.remarks;
  await adminService.rejectRegistration(regid, remarks);
  return res.json({ success: true });
};

module.exports = {
  deleteRegistration,
  approveRegistration,
  rejectRegistration,
  getregistration,
  getGradeSections,
  getGradeLevels,
  getSchoolYears,
  updatePassword,
  CheckPassword,
  getStudents,
  getTeacher,
  fpswCheck,
  getSchool,
  GetUser,
  Get,
};
