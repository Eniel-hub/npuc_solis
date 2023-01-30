const db = require('../_db/db.service');
const helper = require('../utils/helper');

//Get School by id
const GetImage = async (id) =>{
    const result = await db.Query(
        'SELECT image FROM school_image WHERE school_ID = ?',
        [id]
    );
    const image = helper.EmptyOrRows(result);
    return image;
}

//Get school by name
const GetSchoolByName = async (name) =>{
    name = `%${name}%`
    const result = await db.Query(
        'SELECT * FROM `SCHOOL` WHERE `school_name` LIKE ?',
        [name]
    );
    const school = helper.EmptyOrRows(result);
    return school[0];
}

//get all schools
const GetAllSchools = async () => {
    const result = await db.Query(
        'SELECT * FROM `SCHOOL`', 
        []
    );
    const schools = helper.EmptyOrRows(result);
    return schools;
}

const getAcademicDept = async (school_id) =>{
    const IDs = await db.Query(
        'SELECT ID FROM academic_dept WHERE school_id = ?',
        [school_id] 
    )
    return IDs
}

const getGrades = async (school_ID) =>{
    const grades = await db.Query(
        `select grade_level.grade_level from grade_level join (academic_dept) on 
            academic_dept.school_id = 1000 and
            grade_level.academic_id = academic_dept.id
            and grade_level.enable = 1;`,
        [school_ID]
    )
    return grades;
}

module.exports = {
    getGrades,
    GetImage,
    GetSchoolByName,
    getAcademicDept,
    GetAllSchools
}