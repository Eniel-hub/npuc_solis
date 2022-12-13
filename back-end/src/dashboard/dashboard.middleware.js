const IsAuth = (req, res, next) =>{
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/student/login');
    }
}

const IsStudent = (req, res, next) =>{
    if(req.user.student_id !== null){
        next();
    }else {
        res.redirect('/student/no-student');
    }
}

const IsNotStudent = (req, res, next) =>{
    if(req.user.student_id === null){
        next();
    }else {
        res.redirect('/student/');
    }
}

module.exports = {
    IsAuth,
    IsStudent,
    IsNotStudent
}