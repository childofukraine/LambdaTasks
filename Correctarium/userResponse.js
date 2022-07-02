const price = require('./price')
const deadLine = require('./deadline')


const userResponse = (data) => {
    const language = data.language;
    const mimeType = data.mimetype;
    let charNumber = data.count;

    const result = price(charNumber,language,mimeType);
    const timeOfWork = result.timeOfWork;
    const cost = result.cost;

    const resultTwo = deadLine(timeOfWork);
    const deadline = resultTwo;
    const deadline_date = new Date(deadline).toLocaleString("uk-Uk");
    
    const final = {cost,timeOfWork,deadline,deadline_date};
    return JSON.stringify(final)
}



module.exports = userResponse;