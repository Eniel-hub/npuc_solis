const Auth = require('../auth/AuthAndAut');
const router = require ('express').Router();
const middleware = require('../student/student.middleware');

router.get('/profile', Auth.IsAuth, middleware.getProfile);

router.get('/nation', middleware.GetAllReligions);

// router.get('/nation/:id', Auth.IsAuth, middleware.getNation);

router.get('/religion', middleware.GetAllReligions);

// router.get('/religion/:id', Auth.IsAuth, religion.getReligion);

router.get('/category', middleware.GetAllCategories);

print=()=>{
    console.log('inside the server')
}
//POST
router.post('/application', middleware.NewApplication);

//todo router.post('/enrollment, Auth.IsAuth, middleware.NewEnrollment)

//todo: update record


module.exports = router;