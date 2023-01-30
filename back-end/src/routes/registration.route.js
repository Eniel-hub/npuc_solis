const router = require ('express').Router();
const auth = require('../auth/AuthAndAut')
const middleware = require('../registration/registration.middleware');

//POST
router.get('/get', auth.IsAuth, middleware.get);
router.get('/check', auth.IsAuth, middleware.check);
router.get('/getnext/:id', auth.IsAuth, middleware.getNext);
router.post('/setnext', auth.IsAuth, middleware.setNext);

module.exports = router;