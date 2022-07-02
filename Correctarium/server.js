const express = require('express');
const userResponse = require('./userResponse');

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.post('/',(req,res) => {
  console.log(req.body);
  res.status(201).send(userResponse(req.body));
  
});

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});