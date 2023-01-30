const service = require('./registration.service');
const pport = require('../auth/passport.middleware');
const Student = require('../student/student.service');
const { reset } = require('nodemon');

const get = async (req, res, next) => {
    //todo: get grade
    //get section
    let user = await pport.GetUser({username : req.user});
    try{
        const section = await service.getCurrentSection(user.student_id)
        if(!section)
            return res.json({error : true})
        return res.json(section)
    } catch (err) {
        console.log("error while getting the section ", err)
    }
}

const getNext = async (req, res, next) => {
    let user = await pport.GetUser({username : req.user});
    let gradeID = Number(req.params.id);
    //get new greade level
    let grade_level;
    try{
        grade_level = await service.getNextGradeLevel(gradeID+1)
        if(!grade_level)
            return res.json({error : true})
    } catch (err) {
        console.log("error while getting the next grade ", err)
    }
    //get section
    //get subjects might be usefull later?
    // let subjects;
    // try{
    //     subjects = await service.getSubjects(section.ID)
    //      if(!subjects)
    //          return res.json({error : "no subject found"})
    //  } catch (err) {
    //      console.log("error while getting the next section ", err)
    //  }
    //get teacher
    return res.json({
        grade_level : grade_level
        // section : section,
        // subjects : subjects
    })
}

const setNext = async (req, res, next) => {
    //set a new registration record
    let user = await pport.GetUser({username : req.user});
    let student = await Student.GetStudent(user.student_id);
    let id = user.student_id.toString() + req.body.enrollmentYearId.toString()
    try{
        await service.setNextRegistrationRecord({
            ID : id,
            student_id : student.ID,
            grade_level : req.body.grade_level,
            school_id : student.school_id,
            remarks : student.remarks
        })
    } catch (err) {
        console.log("error while getting the section ", err)
        return res.json({error: err})
    }
    return res.json({success : true})
}

const check = async (req, res, next) =>{
    let user = await pport.GetUser({username : req.user});
    let record = await service.GetRegi(user.student_id);
    if(!record)
       return res.json({notExist : true})
    return res.json(record)
}

module.exports = {
    get,
    check,
    getNext,
    setNext
}