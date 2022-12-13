const nsController = require('./new-student.controller');

const NoApplication = async (req, res, next) =>{
    username = req.user.username;
    const application = await nsController.GetApplication(username);
    if(application === undefined){
        next();
    }else {
        res.redirect('/new-student/review');
    }
}

const HasApplication = async (req, res, next) =>{
    username = req.user.username;
    const application = await nsController.GetApplication(username);
    if(application !== undefined){
       res.json(application);
    }else {
        res.redirect('/new-student/application');
    }
}

module.exports = {
    NoApplication,
    HasApplication
}