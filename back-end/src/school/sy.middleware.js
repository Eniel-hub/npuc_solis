const syService = require('./sy.service');

const GetSchoolYear =  async (req, res, next) => {
    //use a name coming from the user selection
    try {
        const sy = await syService.GetSchoolYear();
        res.json(sy)
    } catch (err) {
        console.log(`error while getting current school year : ${err.message}`);
        res.status(404)
    }
}

const GetNextYear = async (req, res, next) => {
    try {
        const ny = await syService.GetNextYear();
        res.json(ny);
    } catch (err) {
        console.log(`error while getting new year : ${err.message}`);
    }
}

module.exports = { 
    GetSchoolYear,
    GetNextYear 
};