
//auth
const IsAuth = (req, res, next) =>{
    if(req.isAuthenticated()){
        next();
    } 
    else {
        res.json({message : "not authenticated"});
        console.log('not authenticated')
    }
}


module.exports = {
    IsAuth,
    // IsStudent
}