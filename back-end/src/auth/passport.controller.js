const auth = require('./passport.middleware');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('req-flash')

module.exports = (passport) => {

    const fields = {
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }
    
    const VerifyCallback = async (req, username, password, done) =>{
        try{
            let user;
            if(!(username.match(/[a-zA-Z]/))) {
                let ID = Number(username)
                user = await auth.GetUser({ID : ID})
            } 
            else user = await auth.GetUser({username : username});
            if(!user)
                return done(null, false, {error : "username not found"});
            const isValid = auth.CheckPassword(password, user.hash, user.salt);
            if(isValid)
                return done(null, user.username);
            else 
                return done(null, false, {error : "wrong password"});
            
        } catch (err){
            return done(err);
        }
    }
    
    const verifyStrategy = new LocalStrategy(fields, VerifyCallback);
    passport.use(verifyStrategy);
    
    // used to serialize the user for the session
    passport.serializeUser((user, done) => done(null, user));
    
    // used to deserialize the user
    passport.deserializeUser(async (user, done) => {
        try{ done(null, user) } catch (err) { done(err) }
    });
}