const helper = require("../utils/helper");
const service = require("./registration.service");
const pport = require("../auth/passport.middleware");
const Student = require("../student/student.service");
const userMiddleware = require("../user/user.middleware");

/*
 * get the current registration
 * return the section if a registration is found
 */

const get = async (req, res, next) => {
  //todo: get grade
  //get section
  let user = req.user;
  try {
    const section = await service.getCurrentSection(user.student_id);
    if (!section) return res.json({ error: true });
    return res.json(section);
  } catch (err) {
    console.log("error while getting the section ", err);
  }
};

/*
 * get the next grade level for registration
 * return the grade with an id = cureentGrade + 1
 * if there is not a grade then send an error
 */
const getNext = async (req, res, next) => {
  let user = req.user;
  let gradeID = Number(req.params.id);
  //get new greade level
  let grade_level;
  try {
    grade_level = await service.getNextGradeLevel(gradeID + 1);
    if (!grade_level) return res.json({ error: true });
  } catch (err) {
    console.log("error while getting the next grade ", err);
  }
  /*
   * todo : get and send the section name after admin created a new section for the upcomming school year
   * todo : get and send the teacher for the upcoming year after admin add a teacher to the section
   * todo : get and send teh subjects after teachers added the subjects for the section
   */
  return res.json({
    grade_level: grade_level,
  });
};

/*
 * set a new registration record
 * return success or error
 * 1. save registration (studentID, regiID, schoolYear, stype)
 * 2. save registration status (regiID, applicationDate, gradeLevel)
 */
const setNext = async (req, res, next) => {
  let user = req.user;
  let student = await Student.GetStudent(user.student_id);
  let id = user.student_id.toString() + req.body.enrollmentYearId.toString();

  /*
   * determine the stype of a student by searching past records and school where it was lastly enrolled.
   * 1. get the past records if there is none then the student is new
   * 2. get the class record from the last record. if there is none the student is transferee
   * 3. get the school of the last class record. if it is the same as the current school of the student then he is returnee else he is transferee
   */
  let stype;
  let pastRecord = await service.GetPastRecords(user.student_id);
  console.log(pastRecord);
  if (pastRecord[0] == undefined) stype = "New";
  else {
    let classRecord = await service.GetClassRecord(
      pastRecord[pastRecord.length - 1].id
    );
    console.log(classRecord);
    if (!classRecord) stype = "Transferee";
    else {
      let school_of_record = await service.GetSchoolOfRecord(classRecord);
      if (school_of_record == student.school_id) stype = "Returning";
      else stype = "Transferee";
    }
  }

  try {
    await service.setNextRegistrationRecord({
      ID: id,
      student_id: student.ID,
      school_year_id: req.body.enrollmentYearId,
      stype: stype,
    });
    await service.setNextRegistrationStatus({
      registration_id: id,
      application_date: helper.GetCurrentDate(),
      grade_level: req.body.grade_level || "Kinder II",
    });
  } catch (err) {
    console.log(
      "error while setting a new registration record and status ",
      err
    );
    return res.json({ error: err });
  }
  return res.json({ success: true });
};

/*
 * check pending registration
 * 1. Get registration using studentID and their status
 * 2. save registration status (regiID, applicationDate, gradeLevel)
 */

const check = async (req, res, next) => {
  let user = req.user;
  let record = await service.GetPendingRegi(user.student_id);
  if (!record) return res.json({ notExist: true });
  return res.json(record);
};

module.exports = {
  get,
  check,
  getNext,
  setNext,
};
