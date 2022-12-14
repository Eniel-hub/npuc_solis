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
            user = await auth.GetUser(username);
            if(!user)
                    return done(null, false, {error : "username not found"});
            const isValid = auth.CheckPassword(password, user.hash, user.salt);
            if(isValid)
                return done(null, username);
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