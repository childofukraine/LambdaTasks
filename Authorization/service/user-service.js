const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb+srv://lambda:qwerty123@cluster0.nbafx.mongodb.net/?retryWrites=true&w=majority');
const tokenService = require('./token-service') ;
const UserDto = require('../dtos/user-dto');
const bcrypt = require('bcryptjs');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(email,password) {
        const users = client.db().collection('users');
        const candidate = await users.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адрессом ${email} уже существует`)
        }
        const hashPassword = bcrypt.hashSync(password, 3);

        const userReg = await users.insertOne({email: email,password: hashPassword});
        const user = await users.findOne(userReg.insertedId);
        
        const userDto = new UserDto(user); //email,id
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);

        return {...tokens,user: userDto}
    }

    async login(email,password) {
        const users = client.db().collection('users');
        const user = await users.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден');
        }
        const isPassEquals = await bcrypt.compare(password,user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.updateToken(userDto.id,tokens.refreshToken);
        return {...tokens,user: userDto}
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.BadRequest('Токен не найден');
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb){
            throw ApiError.BadRequest('Пользователь не авторизован');
        }

        const users = client.db().collection('users');
        const user = await users.findOne({email: userData.email});

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.updateToken(userDto.id,tokens.refreshToken);
        return {...tokens,user: userDto}

    }
}

module.exports = new UserService();