const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {body} = require('express-validator');
const authMiddleware = require('./middlewares/auth-middleware');

router.post('/sign_up',[
    body('email').isEmail(),
    body('password').isLength({min: 3,max: 32})
],controller.sign_up);
router.post('/login',controller.login);
router.post('/refresh',controller.refresh);
router.get('/me:number',authMiddleware,controller.me);

module.exports = router;