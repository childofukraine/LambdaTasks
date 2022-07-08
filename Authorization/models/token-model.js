const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb+srv://lambda:qwerty123@cluster0.nbafx.mongodb.net/?retryWrites=true&w=majority');

const collectionName = 'token';
const exists = (await client.db().listCollections().toArray()).findIndex((item) => item.name === collectionName) !== -1
if (exists !== true){
    await client.db().createCollection('token',{
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['user','refreshToken'],
                properties:{
                    user:{
                        bsonType: 'Numbers',
                        description: "must be a ObjectId and is required"
                    },
                    refreshToken:{
                        bsonType: 'string',
                        description: "must be a string and is required"
                    }
                }
            }
        }
    })
}
