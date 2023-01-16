const service = require('./student.service');
const nsService = require('./new-student.service');
const pport = require('../auth/passport.middleware');

const NewApplication = async (req, res, next) =>{
    // const application = req.body; 
    let application = {};
    application = {... req.body}
    application.username = req.user;

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
    let user = await pport.GetUser({username : req.user});

    if(!user.student_id)
        return res.json({error: 'not a student'})
    
    let student = await service.GetStudent(user.student_id);
    let myParents = await service.GetMyParents(student.ID);
    let parents =[];
    for (let par of myParents){
        let parent = await service.GetParent(par.ID)
        parents.push(parent)
    };
    let [father, ] = parents.filter(parent => parent.relationship === 'Father')
    let [mother, ] = parents.filter(parent => parent.relationship === 'Mother')
    let [guardian, ] = parents.filter(parent => parent.relationship === 'Guardian')

    if(father) student.father = {... father}
    if(mother) student.mother = {... mother}
    if(guardian) student.guardian = {... guardian}
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