const schlService = require('./school.service');

const GetSchoolImage =  async (req, res, next) => {
    //use a name coming from the user selection
    try {
        const school = await schlService.GetSchoolByName(req.params.name);
        const image = await schlService.GetImage(school.ID);
        res.json({image})
    } catch (err) {
        console.log(`error while getting image of school : ${err.message}`);
        res.status(404)
    }
}

const GetAllSchools = async (req, res, next) => {
    try {
        const schools = await schlService.GetAllSchools();
        res.json(schools);
    } catch (err) {
        console.log(`error while getting all schools : ${err.message}`);
    }
}


const getGrades = async (req, res, next) =>{
    //1st step : get academic_dept ID
    let academic_dept_IDs = await schlService.getAcademicDept(req.body.school_id);
    let grades = [];
    academic_dept_IDs.forEach(async (academic_dept) => {
        //2nd step : get grades
        let Grades = await schlService.getGrades(academic_dept.ID);
        Grades.forEach(grade =>{
            grades.push(grade.grade_level)
        })
    });
    setTimeout(() => {
        res.json(grades)
    }, 100);
}

module.exports = { 
    GetSchoolImage,
    GetAllSchools,
    getGrades
};