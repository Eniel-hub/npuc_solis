const service = require('./student.service');
const nsService = require('./new-student.service');
const pport = require('../auth/passport.middleware');

const NewApplication = async (req, res, next) =>{
    // const application = req.body;
    
    let application = {};
    application.username = 'enielleba'
    application.lastname = 'leba'
    application.firstname = 'eniel'
    application.middlename = 'middl'
    application.fullname = ''
    application.gender = 'Male'
    application.bday = new Date("2022-12-20")
    application.home_address = 'aup'
    application.lrn = 'asdf'
    application.religion_id = 100
    application.nationality_id = 000
    application.nationality = 'French'
    application.school_id = 1114
    application.student_cat_id = 'E'
    application.father_lastname = 'leba'
    application.father_firstname = 'ariel'
    application.father_middlename = 'ambomo'
    application.father_email = 'his@email.com'
    application.father_home_address = 'his address'
    application.father_mobile = '00112233'
    application.mother_lastname = 'la'
    application.mother_firstname = 'mere'
    application.mother_middlename = ''
    application.mother_email = 'lamere@gmail.com'
    application.mother_home_address = 'her address'
    application.mother_mobile = '123789'
    application.guardian = 'Father & Mother'
    application.guardian_lastname = ''
    application.guardian_firstname = ''
    application.guardian_middlename = ''
    application.guardian_email = ''
    application.guardian_home_address = ''
    application.guardian_mobile = ''


    console.log(application)
    try{
        await nsService.RegisterNewStudent(application.username, application);
        res.json({response : true})
    } catch(err){
        console.log(err)
        res.json({error : err.messsage})
        console.log(`error while doing a new application : ${err.message}`);
    }
}

const getProfile = async (req, res, next)=>{
    let user = await pport.GetUser(req.user);

    if(!user.student_id)
        return res.json({error: 'not a student'})
    
    let student = await service.GetStudent(user.student_id);
    return res.json(student);
}

const GetAllCategories = async (req, res, next) =>{
    try {
        const categories  = await service.getAllCategories();
        res.json(categories)
    } catch (err) {
        console.log(`error while getting categories : ${err.message}`);
    }
}

const GetAllReligions = async (req, res, next) => {
    try {
        const religions  = await service.GetAllReligions();
        res.json(religions)
    } catch (err) {
        console.log(`error while getting religions : ${err.message}`);
    }
}

const GetReligion =  async (req, res, next) => { //get a religion based on id
    const id = req.params.id;
    try {
        const response = await service.GetReligion(id);
        if(!response)
            res.json({error : 'no religion found'})
        else
            res.json(response)
    } catch (err) {
        console.log(`error while getting a religion : ${err.message}`);
    }
}

const GetAllNations = async (req, res, next) => {
    try {
        const response  = await service.GetAllNations();
        res.json(response)
    } catch (err) {
        console.log(`error while getting nations : ${err.message}`);
    }
}

const GetNation =  async (req, res, next) => { //get a religion based on id
    const id = req.params.id;
    try {
        const response = await service.GetNation(id);
        if(!response)
            res.json({error : 'no nation found'})
        else
            res.json(response)
    } catch (err) {
        console.log(`error while getting a nation : ${err.message}`);
    }
}


module.exports = {
    GetNation,
    getProfile,
    GetReligion,
    GetAllNations,
    NewApplication,
    GetAllReligions,
    GetAllCategories,
}