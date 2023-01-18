require('dotenv').config();
const helper = require('../utils/helper');
const mySQLStore = require('express-mysql-session');
const sessionDbConfig = require('../_db/db.config')[1];
const userService = require('../user/user.service');
const studentService = require('../student/student.service')


const Initialize = (app, passport, session) =>{
    app.use(session({
        Key: 'student_enrollment_key',
        secret: process.env.SESSION_SECRET,
        store: new mySQLStore(sessionDbConfig),
        resave: false,
        saveUninitialized: false,
        cookie:{
            maxAge: 1000*60*60*10 //ms*min*hours*nbOfHours 1hour
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());

}

//middleware

const CheckPassword = (password, hash, salt) => {
    var hashVerify = helper.toHash(password, salt)
    return hash === hashVerify;
}

const GenPassword = (password) => {
    const pass = helper.GenPassword(password)
    return pass;
}

const GetUser = async ({username, ID}) => {
    if(username){
        try {
            const [user, ] = await userService.GetUser(username);
            return user;
        } catch (err) {
            console.log(`error while getting user by name : ${err.message}`);
        }
    }
    if(ID){
        try {
            const [user, ] = await userService.GetUserI(ID);
            return user;
        } catch (err) {
            console.log(`error while getting user by name : ${err.message}`);
        }
    }
}

const CreateUser = async (username, password, ID) =>{
    try {
        password = GenPassword(password);
        let newUser;
        if(ID == 0){
            newUser = {
                username : username,
                hash: password.hash,
                salt: password.salt
            }
        }
        else {
            newUser = {
                username : username,
                hash: password.hash,
                salt: password.salt,
                student_id : ID
            }
        }
        await userService.CreateUser(newUser);
    } catch (err) {
        console.log(`error while creating new user ${err.message}`);
    }
}

const createUserCheck = async (req, res, next) =>{
    try{
        const student = await studentService.GetStudent(req.body.student_id)
        if(student || req.body.student_id == 0){
            try{
                let user = await GetUser({username : req.body.username});
                if(user){
                    res.json({ error : "username taken"});
                    return
                }
                else{
                    if (req.body.student_id != 0){
                        user = await GetUser({ID : req.body.student_id});
                        if(user){
                            res.json({ error : "ID taken"});
                            return
                        }
                        else{
                            next();
                        }
                    }
                    else{
                        next();
                    }
                }
            } catch(err){
                console.log(err)
            }
        }
        else{
            res.json({error : "id not found"})  
            return;         
        }
    } catch (err){
        console.log(err)
    }
}

const updatePassword = async (username, password, newPassword) =>{
    if(!newPassword){
        try {
            let pass = GenPassword(password);
            const User = {
                username : username,
                hash: pass.hash,
                salt: pass.salt
            }
            await userService.ChangePassword(User);
            return {success : true}
        } catch (err) {
            console.log(`error while updating password ${err.message}`);
            return {error : "an error occured"}
        }
    }
    let user = await GetUser({username : username})
    if(CheckPassword(password, user.hash, user.salt)){
        try {
            if(CheckPassword(newPassword, user.hash, user.salt))
                return {error : "old password"}

            let pass = GenPassword(newPassword);
            const User = {
                username : username,
                hash: pass.hash,
                salt: pass.salt
            }
            await userService.ChangePassword(User);
            return {success : true}
        } catch (err) {
            console.log(`error while updating password ${err.message}`);
            return {error : "an error occured"}
        }
    }
    else {
        return {error : "wrong password"}
    }
}

const fpswCheck = async (req, res, next) =>{
    let username = req.body.username;
    let student_id = req.body.student_id;
    let user = await GetUser({username : username})
    if(!user) return res.json({error : 'username not found'})
    if(user.student_id != student_id) return res.json({error : "id and username don't match"})
    next()
}

module.exports = {
    createUserCheck,
    updatePassword,
    CheckPassword,
    Initialize,
    CreateUser,
    fpswCheck,
    GetUser
}