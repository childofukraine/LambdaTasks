const express = require('express');
const binarySearch = require('./index.js')

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(function(request, response) {
    //user ip 
    let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    
    // ip for test -  5.44.80.51 (put instead arg ip)
    binarySearch(ip).then(result => response.send(result));

})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
})