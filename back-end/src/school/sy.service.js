const db = require('../_db/db.service');
const helper = require('../utils/helper');

//Get school year
const GetSchoolYear = async () =>{
    const result = await db.Query(
        'SELECT school_year FROM schoolyear WHERE current = ?',
        [1]
    );
    const sy = helper.EmptyOrRows(result);
    return sy[0];
}

//Get school by name
const GetNextYear = async () =>{
    const result = await db.Query(
        'SELECT school_year FROM schoolyear WHERE is_enrollment = ?',
        [1]
    );
    const sy = helper.EmptyOrRows(result);
    return sy[0];
}

module.exports = {
    GetSchoolYear,
    GetNextYear,
}