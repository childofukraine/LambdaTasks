const fs = require('fs');
const path = require('path');


console.time();
const allFilesUnique = [];
const arrData = [];

for (let i = 0;i < 20; i += 1){
    const filePath = path.join(__dirname, 'words2kk', `out${i}.txt`);
    const data = fs.readFileSync(filePath, 'utf-8');
    arrData.push(data.split(/\r?\n/));
    allFilesUnique.push(arrData);
}

const start = (inFiles) => {
    const filteredArr = arrData.map(element => [...new Set(element)]);
    const counter = {};
    filteredArr.flat().forEach(value => {
        counter[value] = (counter[value] || 0) + 1
    });
    const entries = Object.entries(counter);
    const result = [];
    
    entries.forEach(([key,value]) => {
        if (value >= inFiles){
        result.push(key);
    }});
    console.log(result.length);
    
}
start(1);
start(10);
start(20);

console.timeEnd();