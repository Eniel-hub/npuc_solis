const db = require("../_db/db.service");
const helper = require("../utils/helper");

const getCurrentSection = async (ID) => {
  const result = await db.Query(
    `select section.section_name from section inner join (class_record, registration, schoolyear) 
        on section.id = class_record.section_id 
        and class_record.reg_id = registration.ID 
        and registration.student_id = ? and registration.school_year_id = schoolyear.id 
        and schoolyear.current = 1`,
    [ID]
  );
  return result[0];
};

const getNextGradeLevel = async (gradeID) => {
  const grade = await db.Query(`select * from grade_level where id = ?`, [
    gradeID,
  ]);
  return grade[0];
};

//might be helpful later
const getSubjects = async (sectionId) => {
  let subjects = await db.Query(
    `select subject_list.subject_name from subject_list join (section, subject) on 
            subject_list.id = subject.subject_list_id and 
            subject.section_id = section.id and section.id = ?`,
    [sectionId]
  );
  subjects = helper.EmptyOrRows(subjects);
  return subjects;
};

const setNextRegistrationRecord = async ({
  ID,
  student_id,
  stype,
  school_year_id,
}) => {
  await db.Query(
    `INSERT INTO registration(ID, student_id, stype, school_year_id) VALUES (?, ?, ?, ?)`,
    [ID, student_id, stype, school_year_id]
  );
};

const setNextRegistrationStatus = async ({
  registration_id,
  grade_level,
  application_date,
}) => {
  await db.Query(
    `INSERT INTO web_registration_status(registration_id, grade_level, application_date) VALUES (?, ?, ?)`,
    [registration_id, grade_level, application_date]
  );
};

const GetEnrolRegi = async (student_id) => {
  let record = await db.Query(
    `SELECT registration.id, registration.school_year_id, registration.stype, registration.reg_date,
            web_registration_status.grade_level, web_registration_status.application_date, 
            web_registration_status.status, web_registration_status.remarks 
    FROM registration INNER JOIN (schoolyear, web_registration_status) 
    ON schoolyear.is_enrollment = 1
    AND registration.student_id = ?
    AND registration.school_year_id = schoolyear.ID
    AND web_registration_status.registration_id = registration.ID`,
    [student_id]
  );
  record = helper.EmptyOrRows(record);
  return record[0];
};

const GetPastRecords = async (student_id) => {
  let records = await db.Query(
    `SELECT id FROM registration WHERE student_id = ?`,
    [student_id]
  );
  records = helper.EmptyOrRows(records);
  return records;
};

const GetClassRecord = async (recordID) => {
  let classRecord = await db.Query(
    `SELECT ID from class_record WHERE reg_id = ?`,
    [recordID]
  );
  classRecord = helper.EmptyOrRows(classRecord);
  return classRecord[0];
};

const GetSchoolOfRecord = async (classRecord) => {
  let SchoolRecord = await db.Query(
    `SELECT school_id from academic_dept INNER JOIN (class_record, section, grade_level)
        ON class_record.id = ?
        AND section.id = class_record.section_id
        AND grade_level.id = section.grade_level_id
        AND academic_dept.id = grade_level.academic_id`,
    [classRecord]
  );
  SchoolRecord = helper.EmptyOrRows(SchoolRecord);
  return classRecord[0];
};

const remove = async (id) => {
  await db.Query(
    `DELETE FROM web_registration_status WHERE registration_id = ?`,
    [id]
  );
  await db.Query(`DELETE FROM registration WHERE ID = ?;`, [id]);
  return;
};

module.exports = {
  remove,
  getSubjects,
  GetEnrolRegi,
  GetPastRecords,
  GetClassRecord,
  GetSchoolOfRecord,
  getCurrentSection,
  getNextGradeLevel,
  setNextRegistrationRecord,
  setNextRegistrationStatus,
};
