const router = require ('express').Router();
const nsService = require('../student/new-student.service');
// const newStudents = require('../../test.s/newStudent');
// student1 = newStudents[0]
// student2 = newStudents[1]

router.get('/application', (req, res, next)=>{
    // console.log(student1)
    // res.json(student1)
    // nsService.RegisterNewStudent(student2)
    user = req.user;
    // nsService.RegisterNewStudent(user, student1)
    console.log(user)
    res.send('<h1>Student Saved</h1>')
})
router.post('/application', (req, res, next) =>{
})



module.exports = router;