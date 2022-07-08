require('dotenv').config();
const express = require('express');
const {MongoClient} = require('mongodb');
const authRouter = require('./authRouter');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const client = new MongoClient('mongodb+srv://lambda:qwerty123@cluster0.nbafx.mongodb.net/?retryWrites=true&w=majority');

app.use(express.json());
app.use(cookieParser());
app.use('/auth',authRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port : ${PORT}`))
        await client.connect();
        console.log('DB Ready');
    } catch (e) {
        console.log(e);
    }
}

start();