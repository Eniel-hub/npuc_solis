const passport = require('passport');
const router = require ('express').Router();
const pportMiddleware = require('../auth/passport.middleware');
const auth = require('../auth/AuthAndAut');
const { indexOf } = require('../_db/db.config');
let errorMsg;

//post request
router.get('/', auth.IsAuth, async (req, res, next) =>{
    let user = await pportMiddleware.GetUser(req.user);
    return res.json({
        username : user.username, 
        profile_picture : user.profile_picture,
        student_id : user.student_id
    });
})

router.post('/login', (req, res, next) =>{
    passport.authenticate('local', (err, user, info)=>{
        if(err) return next(err);
        if(!user) return res.json({error : info.error});
        req.logIn(user, (err) =>{
            if(err) return next(err);
            req.session.user = user;
            return res.json(user)
        });
    })(req, res, next)
})

router.post('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) { 
            return next(err);
        }
        res.redirect('/');
    });
});

router.post('/register', pportMiddleware.UserExits, (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    pportMiddleware.CreateUser(username, password);
    res.json({"success" : "success"});
});

module.exports = router;
