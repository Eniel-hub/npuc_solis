const db = require("../_db/db.service");
const helper = require("../utils/helper");

// Get
const GetUser = async (ID) => {
  const result = await db.Query("SELECT * FROM web_admin_user WHERE ID = ?", [
    ID,
  ]);
  const admin = helper.EmptyOrRows(result);
  return admin;
};

const ChangePassword = async (admin) => {
  await db.Query(
    `UPDATE web_admin_user SET hash = ?, salt = ?
        WHERE ID = ?`,
    [admin.hash, admin.salt, admin.ID]
  );
};

const GetSchool = async (staff_id) => {
  const result = await db.Query(
    `SELECT school.* FROM school INNER JOIN (school_staff)
    ON school.ID = school_staff.school_id
    AND school_staff.id = ?`,
    [staff_id]
  );
  return result;
};

const GetStudents = async (section_id, school_year_id) => {
  const result = await db.Query(
    `SELECT student.ID, student.fullname, registration.remarks, 
            registration.id AS regid, web_registration_status.status 
    FROM student 
    INNER JOIN (class_record, registration, web_registration_status) 
    ON class_record.section_id = ? 
    AND web_registration_status.registration_id = class_record.reg_id 
    AND registration.id = class_record.reg_id 
    AND registration.school_year_id = ? 
    AND registration.student_id = student.id;`,
    [section_id, school_year_id]
  );
  return helper.EmptyOrRows(result);
};

const GetGradeLevels = async (school_id) => {
  const result = await db.Query(
    `SELECT grade_level.ID, grade_level.grade_level 
    FROM grade_level JOIN (academic_dept) 
    ON academic_dept.school_id = ? 
    AND grade_level.academic_id = academic_dept.id`,
    [school_id]
  );
  return helper.EmptyOrRows(result);
};

const GetGradeSections = async (grade_id) => {
  const result = await db.Query(
    ` SELECT ID, section_name, active FROM section WHERE grade_level_id = ?`,
    [grade_id]
  );
  return helper.EmptyOrRows(result);
};

const GetTeacher = async (section_id) => {
  const [result] = await db.Query(
    `SELECT member.fullname FROM member 
    INNER JOIN (school_staff, class_record) 
    ON class_record.section_id = 8061 
    AND class_record.staff_id = school_staff.ID 
    AND member.id = school_staff.member_id;`,
    [section_id]
  );
  return helper.EmptyOrRows(result);
};

const getregistration = async (regid) => {
  const [result] = await db.Query(
    `SELECT student.ID AS student_id, student.fullname, registration.id AS regid, registration.school_year_id, 
            registration.stype, registration.reg_date, schoolyear.school_year, schoolyear.is_enrollment,
            web_registration_status.grade_level, web_registration_status.application_date, 
            web_registration_status.status, registration.remarks, web_registration_status.section,
            class_record.section_id, section.grade_level_id
    FROM student 
    INNER JOIN (registration, web_registration_status, schoolyear, class_record, section) 
    ON web_registration_status.registration_id = ?
    AND registration.id = web_registration_status.registration_id
    AND registration.student_id = student.id
    AND schoolyear.ID = registration.school_year_id
    AND class_record.reg_id = registration.id
    AND section.ID = class_record.section_id;`,
    [regid]
  );
  return helper.EmptyOrRows(result);
};

const deleteRegistration = async (regid) => {
  await db.Query(
    `DELETE FROM web_registration_status WHERE registration_id = ?`,
    [regid]
  );

  await db.Query(`DELETE FROM class_record WHERE reg_id = ?`, [regid]);
  await db.Query(`DELETE FROM registration WHERE ID = ?`, [regid]);
};

const rejectRegistration = async (regid, remarks) => {
  await db.Query(
    `UPDATE web_registration_status SET status = 'Denied' WHERE registration_id = ?`,
    [regid]
  );
  await db.Query(`UPDATE registration SET remarks = ? WHERE ID = ?`, [
    remarks,
    regid,
  ]);
};

const approveRegistration = async (registration) => {
  await db.Query(
    `UPDATE web_registration_status SET status = 'Approved' WHERE registration_id = ?`,
    [registration.regid]
  );
  await db.Query(`UPDATE registration SET remarks = 'enrolled' WHERE id = ?`, [
    registration.regid,
  ]);
  await db.Query(`INSERT INTO class_record(reg_id, section_id) VALUES (?, ?)`, [
    registration.regid,
    registration.section,
  ]);
};

module.exports = {
  GetUser,
  GetSchool,
  GetTeacher,
  GetStudents,
  ChangePassword,
  GetGradeLevels,
  GetGradeSections,
  getregistration,
  deleteRegistration,
  rejectRegistration,
  approveRegistration,
};
