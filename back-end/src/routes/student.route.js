const Auth = require('../auth/AuthAndAut');
const router = require ('express').Router();
const nsService = require('../student/new-student.service');

router.get('/application', (req, res, next)=>{
    user = req.user;
    console.log(user)
    res.send('<h1>Student Saved</h1>')
})

router.get('/profile', Auth.IsAuth, (req, res, next)=>{
    let username = req.user;
    res.json(username);
})

router.post('/application', (req, res, next) =>{
})



module.exports = router;