const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb+srv://lambda:qwerty123@cluster0.nbafx.mongodb.net/?retryWrites=true&w=majority');


const collectionName = 'users';
const exists = (await client.db().listCollections().toArray()).findIndex((item) => item.name === collectionName) !== -1
if (exists !== true){
    await client.db().createCollection('users',{
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['email','password'],
                properties:{
                    email:{
                        bsonType: 'string',
                        description: "must be a string and is required"
                    },
                    password:{
                        bsonType: 'string',
                        description: "must be a string and is required"
                    }
                }
            }
        }
    })
}
