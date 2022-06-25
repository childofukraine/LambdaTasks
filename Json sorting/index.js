const urls = require('./urls.json'); 
const axios = require('axios');

const arrUrls = urls.url;

let counter = {true: 0,false:0};

async function checkStatus (url,tries = 3) {
    const response = await axios.get(url);
    const dataArr = [response,url];
    if (response.status === 200){
        return dataArr;
    } else {
        console.log('Connection error');
        tries -= 1;
        checkStatus(url);
    }
    if (tries === 0){
        return response;
    }
}


async function getData (dataArr) {
    const response = dataArr[0].data ;
    const url = dataArr[1];
    const onlyValues = Object.values(response);

    onlyValues.forEach(el => {
        if (typeof(el) === 'boolean'){
            console.log(`${url}: isDone - ${el}`);
            if (el === true){
                counter.true +=1;
            } 
            if (el === false){
                counter.false += 1;
            }
        }
    
        if (typeof(el) === 'object'){
            if (el.hasOwnProperty('isDone')){
                console.log(`${url}: isDone - ${el.isDone}`);
                if (el.isDone === true){
                    counter.true +=1 ;
                } 
                if (el.isDone === false){
                    counter.false += 1;
                }
            }
        }
    })
}

async function start() {
    for (let url of arrUrls){
        let firstRes = await checkStatus(url);
        let secondRes = await getData(firstRes);
    }
}

start().then(() => {
    console.log(`Значений True: ${counter.true}\nЗначений False: ${counter.false}`);
})

