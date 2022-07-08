const jwt = require('jsonwebtoken');
const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb+srv://lambda:qwerty123@cluster0.nbafx.mongodb.net/?retryWrites=true&w=majority');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    result = Math.floor(Math.random() * (max - min) + min);
    return result;
}
const expTime = getRandomInt(30,60);

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn: expTime});
        const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }
    
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token,process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId,refreshToken) {
        const tokenDB = client.db().collection('token');
        const tokenData = await tokenDB.findOne({user:userId});
        if (tokenData) {
            return tokenData.refreshToken = refreshToken;
        }
        const token = await tokenDB.insertOne({user:userId,refreshToken});
        return token;
    }

    async updateToken(userId,refreshToken){
        const tokenDB = client.db().collection('token');
        const tokenData = await tokenDB.findOne({user:userId});

        const token = tokenDB.updateOne(tokenData,{
            $set: {
                refreshToken: refreshToken
            }
        });
        return token;

    }

    async findToken(refreshToken) {
        const tokenDB = client.db().collection('token');
        const tokenData = await tokenDB.findOne({refreshToken});
        return tokenData;
    }
}

module.exports = new TokenService();