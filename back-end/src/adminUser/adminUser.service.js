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
    `SELECT student.ID, student.fullname, registration.remarks FROM student
    INNER JOIN (class_record, registration) 
    ON class_record.section_id = ? 
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

module.exports = {
  GetUser,
  GetSchool,
  GetTeacher,
  GetStudents,
  ChangePassword,
  GetGradeLevels,
  GetGradeSections,
};
