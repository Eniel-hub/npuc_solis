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

module.exports = { 
    GetSchoolImage,
    GetAllSchools 
};