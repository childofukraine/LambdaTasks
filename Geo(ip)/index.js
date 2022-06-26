const fs = require('fs/promises');

async function importDB() {
   const data = await fs.readFile('./data.csv','utf8');
   return data.split('\n');
}

function ipToInt(ip) {
    let parts = ip.split(".");
    let res = 0;

    res += parseInt(parts[0], 10) << 24;
    res += parseInt(parts[1], 10) << 16;
    res += parseInt(parts[2], 10) << 8;
    res += parseInt(parts[3], 10);

    return res
}

async function binarySearch(ip) {
    ip = ipToInt(ip)
    const dataArr = await importDB().then(arr => {return arr})
    let result;
    let first = 0;    
    let last = dataArr.length; 
    let found = false;
    let middle;
    
    while (found === false && first <= last) {
        middle = Math.floor((first + last)/2);
    if (dataArr[middle].split(',')[0].slice(1,-1) <= ip && dataArr[middle].split(',')[1].slice(1,-1) >= ip) {
        found = true;
        result = dataArr[middle].split(',');
        return JSON.parse(`{"Range":[${result[0].slice(1,-1)},${result[1].slice(1,-1)}], "Country": ${result[3]}}`);
    } else if (ip < dataArr[middle].split(',')[0].slice(1,-1)) {  
        last = middle - 1;
    } else {  
        first = middle + 1;
    }
}
}

module.exports = binarySearch
