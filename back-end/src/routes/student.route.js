const Auth = require('../auth/AuthAndAut');
const router = require ('express').Router();
const nsService = require('../student/new-student.service');
const pport = require('../auth/passport.middleware');
const studentMiddleware = require('../student/student.middleware')

router.get('/application', (req, res, next)=>{
    user = req.user;
    console.log(user)
    res.send('<h1>Student Saved</h1>')
})

router.get('/profile', Auth.IsAuth, async (req, res, next)=>{
    let username = req.user;

    let user = await pport.GetUser(username);
    console.log(await pport.GetUser(username))
    let student;

    if(!user.student_id)
        return res.json({error: 'not a student'})
    
    student = await studentMiddleware.GetStudent(user.student_id);
    return res.json(student);
})

router.post('/application', (req, res, next) =>{
})



module.exports = router;