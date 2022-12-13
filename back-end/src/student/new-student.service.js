const db = require('../_db/db.service');


const RegisterNewStudent = async (user, student) =>{
    if(student.nationality_id === 0) {
        const nationalityId = await SaveNationality(student.nationality);
        student.nationality_id = nationalityId;
    }
    await SaveStudent(student)
    const studentId = await GetStudentId(student.fullname, student.bday);
    const parents = GetParents(student, studentId);
    await SaveParents (parents);
    await CreateMyParent (parents, studentId);
    await UpdateLoginInfo(user, studentId)
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
    await db.Query('DELETE FROM student WHERE id = ?', [18322])
    await db.Query(`INSERT INTO student (ID, lastname, firstname, middlename, fullname, 
                    gender, bday, home_address, lrn, religion_id, nationality_id, 
                    graduated, school_id, student_cat_id, guardian, remarks, is_enrollment)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [18322, student.lastname, student.firstname, student.middlename, student.fullname, student.gender, 
                    student.bday, student.home_address, student.lrn, student.religion_id, student.nationality_id, 
                    0, student.school_id, student.student_cat_id, student.guardian, "New Student", 1])
}

const GetStudentId = async (fullname, bday) =>{
    result = await db.Query('SELECT (ID) FROM student WHERE fullname = ? AND bday = ?', [fullname, bday])
    return result[0].ID;
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

const UpdateLoginInfo = async(user, id) => {
    await db.Query('UPDATE student_login SET student_id = ? WHERE username = ?', [id, user.username])
}

module.exports = {
    RegisterNewStudent
}