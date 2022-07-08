const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb+srv://lambda:qwerty123@cluster0.nbafx.mongodb.net/?retryWrites=true&w=majority');
const { validationResult } = require('express-validator');
const userService = require('./service/user-service');
const tokenService = require('./service/token-service');

class authController {

    async sign_up(req,res,next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message:'Ошибка при регистрации',errors})
            }
            const {email,password} = req.body;
            const userData = await userService.registration(email,password);
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30 * 24 * 60 * 60 * 1000,httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req,res,next) {
        try {
            const {email,password} = req.body;
            const userData = await userService.login(email,password);
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30 * 24 * 60 * 60 * 1000,httpOnly: true})
            return res.json(userData);
        } catch (e){
            next(e);
        }
    }

    async refresh(req,res,next) {
        try {
            const authHeader = req.headers.authorization;
            const refreshToken = authHeader.split(" ")[1];
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30 * 24 * 60 * 60 * 1000,httpOnly: true})
            return res.json(userData);
        } catch (e){
            next(e);
        }
    }

    async me(req,res,next) {
        try {
            const authHeader = req.headers.authorization;
            const accessToken = authHeader.split(" ")[1];

            const userData = tokenService.validateAccessToken(accessToken).email;
            return res.json({
                request_num : req.params.number,
                data: {
                    username: userData
                }
            });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new authController();