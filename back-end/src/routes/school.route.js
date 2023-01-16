const router = require ('express').Router();
const middleware = require('../school/school.middleware');

//POST
router.post('/grades', middleware.getGrades);

//todo router.post('/enrollment, Auth.IsAuth, middleware.NewEnrollment)

//todo: update record


module.exports = router;