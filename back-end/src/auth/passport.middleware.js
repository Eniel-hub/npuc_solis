require('dotenv').config();
const helper = require('../utils/helper');
const mySQLStore = require('express-mysql-session');
const sessionDbConfig = require('../_db/db.config')[1];
const userService = require('../user/user.service');


const Initialize = (app, passport, session) =>{
    app.use(session({
        Key: 'student_enrollment_key',
        secret: process.env.SESSION_SECRET,
        store: new mySQLStore(sessionDbConfig),
        resave: false,
        saveUninitialized: false,
        cookie:{
            maxAge: 1000*60*60*1 //ms*min*hours*nbOfHours 1hour
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

const GetUser = async (username) => {
    try {
        const [user, ] = await userService.GetUser(username);
        return user;
    } catch (err) {
        console.log(`error while getting user by name : ${err.message}`);
    }
}

const CreateUser = async (username, password) =>{
    try {
        password = GenPassword(password);
        const newUser = {
            username : username,
            hash: password.hash,
            salt: password.salt
        }
        await userService.CreateUser(newUser);
    } catch (err) {
        console.log(`error while creating new user ${err.message}`);
    }
}

const UserExits = async (req, res, next) =>{
    try{
        const user = await GetUser(req.body.username);
        if(user){
            res.json({ error : "username taken"});
        }
        else{
            next();
        }
    } catch(err){
        console.log(err)
    }
}



module.exports = {
    CheckPassword,
    Initialize,
    CreateUser,
    UserExits,
    GetUser
}