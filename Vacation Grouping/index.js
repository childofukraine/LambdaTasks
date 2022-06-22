const data = require('./data.json')

const result = {}
const filtered = Object.values(data.reduce((current,next) => {
    const wkDates = {startDate: next.startDate, endDate: next.endDate}

    if (Object.keys(current).includes(next.user.name)){
        current[next.user.name].weekendDates.push(wkDates)
    } else {
        current[next.user.name] = {userId: next.user._id, name: next.user.name,weekendDates:[wkDates] }
    }
    return current;
},result));

console.log(filtered);