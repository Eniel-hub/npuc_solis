const nsService = require('./new-student.service');

const GetApplication = async (username) =>{
    try {
        const [application, ] = await nsService.GetApplication(username);
        return application;
    } catch (err) {
        console.log(`error while getting user by name : ${err.message}`);
    }
}

module.exports = {
    GetApplication
}