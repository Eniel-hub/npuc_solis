const db = require('../_db/db.service');
const helper = require('../utils/helper');

const getCurrentSection = async (ID) =>{
    const result = await db.Query(
        `select section.section_name from section inner join 
        (class_record, registration, schoolyear) on section.id = class_record.section_id 
        and class_record.reg_id = registration.ID 
        and registration.student_id = ? and registration.school_year_id = 
        schoolyear.id and schoolyear.current = 1` ,
        [ID])
    return result[0];
}

const getNextGradeLevel = async (gradeID) =>{
    const grade = await db.Query(
        `select * from grade_level where id = ?`,
        [gradeID])
    return grade[0];
}

//might be helpful later
const getSubjects = async(sectionId) =>{
    let subjects = await db.Query(
        `select subject_list.subject_name from subject_list join (section, subject) on 
            subject_list.id = subject.subject_list_id and 
            subject.section_id = section.id and section.id = ?`,
        [sectionId])
    subjects = helper.EmptyOrRows(subjects)
    return subjects;
}

const setNextRegistrationRecord = async ({ID, student_id, grade_level, school_id, remarks}) =>{
    await db.Query(
        `INSERT INTO for_registration VALUE (?, ?, ?, ?, ?, ?)`,
        [ID, student_id, 0, school_id, grade_level, remarks]
    )
}

const GetRegi = async(student_id) =>{
    let record = await db.Query(
        `select * from for_registration where student_id = ? and resolved = 0`,
    [student_id])
    record = helper.EmptyOrRows(record)
    return record[0];
}
module.exports = {
    GetRegi,
    getSubjects,
    getCurrentSection,
    getNextGradeLevel,
    setNextRegistrationRecord
}