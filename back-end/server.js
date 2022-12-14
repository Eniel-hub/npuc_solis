require('dotenv').config();
const path = require('path');
const cors = require('cors')
const express = require('express');
const flash = require('req-flash');
const passport = require('passport');
const session = require('express-session');
const homeRouter = require('./src/routes/home.route');
const userRouter = require('./src/routes/user.route');
const studentRouter = require('./src/routes/student.route');
const dashboardRouter = require('./src/routes/dashboard.route');
const pportMiddleware = require('./src/auth/passport.middleware');
const pportController = require('./src/auth/passport.controller');

const app = express();
const PORT = process.env.PORT || 8080;

//middleware
pportMiddleware.Initialize(app, passport, session);
app.use(express.urlencoded({ extended : true, }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
pportController(passport);
app.use(express.json());
app.use(flash());
app.use(cors({
    origin: [
        "http://localhost:4200"
    ], 
    credentials: true
}));

//routes
app.use('/home', homeRouter);
app.use('/user',  userRouter);
app.use('/student', studentRouter);
// app.use('/dashboard', dashboardRouter);
app.get('/', (req, res) =>{ res.redirect('/home') });
// app.get('*', function(req, res){
//     res.sendFile(path.resolve('../frontend/enrollement-process/src/index.html'))
// })

//launch application
app.listen(PORT, (err)=>{
    if (err) throw err;
    console.log(`app running at: http://localhost:${PORT}`);
})
