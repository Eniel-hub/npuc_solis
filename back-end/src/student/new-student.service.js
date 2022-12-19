const db = require('../_db/db.service');
const helper = require('../utils/helper')


const RegisterNewStudent = async (username, student) =>{
    // console.log(student)
    student.fullname = helper.FullName(student.firstname, student.lastname, student.middlename);
    student.father_name = helper.FullName(student.father_firstname, student.father_lastname, student.father_middlename);
    student.mother_name = helper.FullName(student.mother_firstname, student.mother_lastname, student.mother_middlename);
    student.middle_name = helper.FullName(student.guardian_firstname, student.guardian_lastname, student.guardian_middlename);
    if(student.nationality_id === 0) {
        const nationalityId = await SaveNationality(student.nationality);
        student.nationality_id = nationalityId;
    }
    student.guardian = getGuardian(student)    
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
                    0, student.school_id, student.student_cat_id, student.guardian, "New Student", 1])
                }

const GetStudentId = async (student) =>{
    let fullname = student.fullname;
    // let bday = student.bday;
    result = await db.Query('SELECT id FROM student WHERE fullname = ?', [fullname])
    result = helper.EmptyOrRows(result)
    return await result[0].id;
}

const GetParents = (student, id) => {
    const father = {ID: id.toString()+'F', pname: student.father_name, email: student.father_email,
                    home_address: student.father_home_address, mobile: student.father_mobile.toString(), relationship:'Father'}
    const mother = {ID: id.toString()+'M', pname: student.mother_name, email: student.mother_email,
                    home_address: student.mother_home_address, mobile: student.mother_mobile.toString(), relationship:'Mother'}
    const guardian = {ID: id.toString()+'G', pname: student.guardian_name, email: student.guardian_email,
                    home_address: student.guardian_home_address, mobile: student.guardian_mobile.toString(), relationship:'Guardian'}
    let parents = [father, mother];
    if(guardian.pname != "") parents.push(guardian);

    return parents;
}

const getGuardian = (student) =>{
    if(student.guardian == 'Father')
        return student.father_name
    if(student.guardian == 'Mother')
        return student.mother_name
    if(student.guardian == 'Guardian')
        return student.guardian_name
    if(student.guardian == 'Father & Mother')
        return `${student.father_name} | ${student.mother_name}`
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