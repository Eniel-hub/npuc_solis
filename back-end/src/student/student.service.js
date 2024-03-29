const db = require('../_db/db.service');
const helper = require('../utils/helper');

const GetStudent = async (ID)=>{
    result = await db.Query(
        'SELECT * FROM student WHERE ID = ?',
        [ID]
    );
    const [student, ] = helper.EmptyOrRows(result);
    return student;
}

const getAllCategories = async() =>{
    result = await db.Query(
        'SELECT * FROM student_cat',
        []
    );
    const categories = helper.EmptyOrRows(result);
    return categories;
}

const GetReligion = async (id) =>{
    const result = await db.Query(
        'SELECT * FROM religion WHERE ID = ?',
        [id]
    );
    const religion = helper.EmptyOrRows(result);
    return religion;
}

const GetAllReligions = async() =>{
    const result = await db.Query(
        'SELECT * FROM religion',
        []
    );
    const religions = helper.EmptyOrRows(result);
    return religions;
}

const GetNation = async (id) =>{
    const result = await db.Query(
        'SELECT * FROM student_nationality WHERE ID = ?',
        [id]
    );
    const nation = helper.EmptyOrRows(result);
    return nation;
}

const GetAllNations = async() =>{
    const result = await db.Query(
        'SELECT * FROM student_nationality',
        []
    );
    const Nations = helper.EmptyOrRows(result);
    return Nations;
}

const GetMyParents = async(ID) =>{
    const result = await db.Query(
        `SELECT * FROM myparent WHERE student_id = ?`,
        [ID]
    );
    return result;
}

const GetParent = async(ID) =>{
    const result = await db.Query(
        `SELECT * FROM parents WHERE ID = ?`,
        [ID])
    return result[0];
}

const GetGradeLevel = async (ID) =>{
    const result = await db.Query(
        `select grade_level.* from grade_level inner join 
        (section, class_record, registration, schoolyear) on grade_level.id = 
        section.grade_level_id and section.id = class_record.section_id 
        and class_record.reg_id = registration.ID 
        and registration.student_id = ? and registration.school_year_id = 
        schoolyear.id and schoolyear.current = 1` ,
        [ID])
    return result[0];
}


module.exports = {
    GetNation,
    GetParent,
    GetStudent,
    GetReligion,
    GetMyParents,
    GetAllNations,
    GetGradeLevel,
    GetAllReligions,
    getAllCategories,
};