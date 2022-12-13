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

module.exports = {
    GetImage,
    GetSchoolByName,
    GetAllSchools
}