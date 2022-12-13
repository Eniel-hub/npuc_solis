const router = require ('express').Router();
const school = require('../school/school.middleware');
const home = require('../home-elements/home-elements')

//get all the schools
router.get('/', home.GetHomeElements);

//get image of school
router.get('/:name', school.GetSchoolImage);

module.exports = router;
