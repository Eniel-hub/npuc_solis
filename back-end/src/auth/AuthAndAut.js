const IsAuth = (req, res, next) =>{
    if(req.isAuthenticated()){
        next();
    } 
    else {
        res.json({message : "not authenticated"});
    }
}

const IsStudent = (req, res, next) =>{
    if(req.user.student_id !== null){
        next();
    }else {
        res.redirect('/student/no-student');
    }
}

module.exports = {
    IsAuth,
    IsStudent
}