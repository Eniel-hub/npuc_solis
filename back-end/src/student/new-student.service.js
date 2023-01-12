const db = require('../_db/db.service');
const helper = require('../utils/helper')


const RegisterNewStudent = async (username, student) =>{
    // console.log(student)
    student.fullname = helper.FullName(student.firstname, student.lastname, student.middlename);
    student.father.pname = student.father.firstname ? helper.FullName(student.father.firstname, student.father.lastname, student.father.middlename) : '';
    student.mother.pname = student.mother.firstname ? helper.FullName(student.mother.firstname, student.mother.lastname, student.mother.middlename) : '';
    student.guardian.pname = student.guardian.firstname ? helper.FullName(student.guardian.firstname, student.guardian.lastname, student.guardian.middlename) : '';
    if(student.nationality_id === '0') {
        const nationalityId = await SaveNationality(student.nationality);
        student.nationality_id = nationalityId;
    }
    student.Guardian = getGuardian(student)    
    await SaveStudent(student)
    const studentId = await GetStudentId(student);
    const parents = GetParents(student, studentId);
    try {await SaveParents (parents);} catch(err) {console.log(err.message)}
    try {await CreateMyParent (parents, studentId);} catch(err) {console.log(err.message)}
    try {await UpdateLoginInfo(username, studentId);} catch(err) {console.log(err.message)}
    console.log('student registered')
}

const SaveNationality = async (nationality) => {
    await db.Query('INSERT INTO student_nationality (nationality) VALUES (?)', [nationality]);
    return await GetNationalityId(nationality);
}

const GetNationalityId = async (nationality) => {
    const result = await db.Query('SELECT (ID) FROM student_nationality WHERE nationality = ?', [nationality])
    return result[0].ID;
}

const SaveStudent = async (student) =>{
    await db.Query(`INSERT INTO student (lastname, firstname, middlename, fullname, 
                    gender, bday, home_address, lrn, religion_id, nationality_id, 
                    graduated, school_id, student_cat_id, guardian, remarks, is_enrollment)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [student.lastname, student.firstname, student.middlename, student.fullname, student.gender, 
                    student.bday, student.home_address, student.lrn, student.religion_id, student.nationality_id, 
                    0, student.school_id, student.student_cat_id, student.Guardian, "New Student", 1])
                }

const GetStudentId = async (student) =>{
    let fullname = student.fullname;
    // let bday = student.bday;
    result = await db.Query('SELECT id FROM student WHERE fullname = ?', [fullname])
    result = helper.EmptyOrRows(result)
    return await result[0].id;
}

const GetParents = (student, id) => {
    const father = {... student.father};          
        father.ID = id.toString()+'F';
    const mother = {... student.mother};          
        mother.ID = id.toString()+'M';
    const guardian = {... student.guardian};      
        guardian.ID = id.toString()+'G';
    let parents = [];
        if(father.pname != "") parents.push(father);
        if(mother.pname != "") parents.push(mother);
        if(guardian.pname != "") parents.push(guardian);

    return parents;
}

const getGuardian = (student) =>{
    if(student.Guardian == 'Father')
        return student.father.pname
    if(student.Guardian == 'Mother')
        return student.mother.pname
    if(student.Guardian == 'Guardian')
        return student.guardian.pname
    if(student.Guardian == 'Father & Mother')
        return `${student.father.pname} | ${student.mother.pname}`
}

const SaveParents = async(parents) =>{
    for(let parent of parents){
        await db.Query('INSERT INTO parents VALUE (?, ?, ?, ?, ?, ?)',
        [parent.ID, parent.pname, parent.email, parent.home_address, 
        parent.mobile, parent.relationship])
    }
}

const CreateMyParent = async(parents, Id) =>{
    for(let parent of parents){
        await db.Query('INSERT INTO myparent VALUES (?, ?, ?)',
        [parent.ID, Id, parent.ID])
    }
}

const UpdateLoginInfo = async(username, id) => {
    await db.Query('UPDATE student_login SET student_id = ? WHERE username = ?', [id, username])
}

module.exports = {
    RegisterNewStudent
}