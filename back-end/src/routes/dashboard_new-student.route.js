const router = require('express').Router();
const nsService = require('../student/new-student.service');
// const stdMiddleware = require('../dashboard/dashboard.middleware');
const auth = require('../auth/AuthAndAut');
const nsMiddleware = require('../student/new-student.middleware');

router.get('/', auth.IsAuth,
            (req, res) =>{
                res.send('<h1>WELCOME TO NPUC SOLIS</h1><br /><a href="/new-student/application">application</a>')
            }
        );
            
router.get('/application', auth.IsAuth,
            nsMiddleware.NoApplication,
            (req, res) =>{
                res.render('application-form')
            }
        );

router.get('/review',
            auth.IsAuth,
            nsMiddleware.HasApplication
        );

router.post('/application', (req, res, next) =>{
    var appl = {
            lrn : req.body.lrn,
            bday : req.body.bday,
            gender : req.body.gender,
            shool_id : req.body.shool_id,
            father_name : req.body.father_name,
            mother_name : req.body.mother_name,
            guardian_name : req.body.guardian_name,
            username : req.user.username,
            lastname : req.body.lastname,
            fullname : req.body.fullname,
            firstname : req.body.firstname,
            father_email : req.body.father_email,
            mother_email : req.body.mother_email,
            guardian_email : req.body.guardian_email,
            father_mobile : req.body.father_mobile,
            mother_mobile : req.body.mother_mobile,
            guardian_mobile : req.body.guardian_mobile,
            middlename : req.body.middlename,
            religion_id : req.body.religion_id,
            home_address : req.body.home_address,
            nationality_id : req.body.nationality_id,
            nationality : req.body.nationality,
            student_cat_id : req.body.student_cat_id,
            father_home_address : req.body.father_home_address,
            mother_home_address : req.body.mother_home_address,
            guardian_home_address : req.body.guardian_home_address,
            p_relationship_2 : req.body.p_relationship_2,
            p_relationship_1 : req.body.p_relationship_1,
            guardian : req.body.guardian
    }
    try {
        nsService.CreateApplication(appl);
    } catch (err) {
        console.log(`error while creating new application ${err.message}`);
    }

    res.redirect('/new-student/review');
})

module.exports = router;