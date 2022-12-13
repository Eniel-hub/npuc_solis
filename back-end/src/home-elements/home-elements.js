const service = require('../school/school.service');
const School = require('../school/school.middleware');
const SchoolYear = require('../school/sy.service');


const GetHomeElements = async (req, res, next) => {
    try {
        const schools  = await service.GetAllSchools();
        const current_year = await SchoolYear.GetSchoolYear();
        const next_year = await SchoolYear.GetNextYear();
        let response = {schools : schools,
                        current_year : current_year, 
                        next_year : next_year}
        res.json(response)
    } catch (err) {
        console.log(`error while getting elements for home : ${err.message}`);
    }
}

const GetSchoolImage =  async (req, res, next) => { //get image using name
    try {
        const school = await service.GetSchoolByName(req.params.name);
        const image = await service.GetImage(school.ID);
        res.json({image})
    } catch (err) {
        console.log(`error while getting image of school : ${err.message}`);
    }
}

module.exports = { 
    GetSchoolImage,
    GetHomeElements
};
