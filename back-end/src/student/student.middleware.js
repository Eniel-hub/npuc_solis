const SaveNationality = async (nationality) => {
    await db.Query('INSERT INTO student_nationality (nationality) VALUES (?)', [nationality]);
    return await GetNationalityId(nationality);
}

const GetNationalityId = async (nationality) => {
    const result = await db.Query('SELECT (ID) FROM student_nationality WHERE nationality = ?', [nationality])
    return result[0].ID;
}

const SaveStudent = async (student) =>{
    await db.Query('DELETE FROM student WHERE id = ?', [18323])
    await db.Query(`INSERT INTO student 
                        (ID, lastname, firstname, middlename, fullname, 
                        gender, bday, home_address, lrn, religion_id, 
                        nationality_id, graduated, school_id, 
                        student_cat_id, guardian, remarks, is_enrollment)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [18323, student.lastname, student.firstname, student.middlename, student.fullname, student.gender, 
                    student.bday, student.home_address, student.lrn, student.religion_id, student.nationality_id, 
                    0, student.school_id, student.student_cat_id, student.guardian, "New Student", 1])
}

const GetStudentId = async (fullname, bday) =>{
    row = await db.Query('SELECT (ID) FROM student WHERE fullname = ? AND bday = ?', [fullname, bday])
    result = row[0]
    console.log(row)
    console.log(result)
    console.log(result.ID)
    return result.ID;
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