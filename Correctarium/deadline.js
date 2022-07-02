function deadLine(workTime, dateOfBooking=undefined) {

    if (dateOfBooking === undefined) {
    dateOfBooking  = new Date().valueOf();
    }
    let date = new Date(dateOfBooking);
    let milliseconds = date.getUTCMilliseconds()
    let second = date.getUTCSeconds();
    let minutes = date.getUTCMinutes();
    let hours = date.getUTCHours() + 3;
    let dayOfTheWeek = date.getUTCDay();

    let workTimeBeforeDeadline;

    let deadline;

    
    while (workTimeBeforeDeadline !== 0) {
        
        date = new Date(date)
        
    if (hours < 10) {
        date = new Date(date.valueOf() + ((10 * 60 * 60 * 1000) - milliseconds - (second * 1000) - (minutes * 60 * 1000) - (hours * 60 * 60 * 1000)))
    } else if (hours >= 19) {
        date = new Date(date.valueOf() + (86400000 - milliseconds - (second * 1000) - (minutes * 60 * 1000) - (hours * 60 * 60 * 1000))  + (10 * 60 * 60 * 1000))
    }
       
    dayOfTheWeek = date.getUTCDay();
    if (dayOfTheWeek === 6) {
        date = new Date(date.valueOf() + (2 * 86400000 - milliseconds - (second * 1000) - (hours * 60 * 60 * 1000)))
        continue
    } else if (dayOfTheWeek === 0) {
        date = new Date(date.valueOf() + (86400000 - milliseconds - (second * 1000) - (minutes * 60 * 1000) - (hours * 60 * 60 * 1000)))
        continue
    }

    date = new Date(date);
    milliseconds = date.getUTCMilliseconds();
    second = date.getUTCSeconds();
    minutes = date.getUTCMinutes();
    hours = date.getUTCHours() + 3;
    dayOfTheWeek = date.getUTCDay();
    
    deadline = date;

            if ((hours >= 10) && (hours < 19) && (19 < (hours + (minutes / 60) + (second / (60*60)) + (milliseconds / (60*60*1000)) + workTime))) {
                workTimeBeforeDeadline = 19 - hours - (minutes / 60) - (second / (60*60)) - (milliseconds / (60*60*1000))
                workTime = workTime - workTimeBeforeDeadline;
                deadline = new Date(deadline.valueOf() + workTimeBeforeDeadline * 60 * 60 * 1000);
                date = deadline.valueOf();
            } else if ((hours >= 10) && (hours < 19) && (19 >= (hours + (minutes / 60) + (second / (60*60)) + (milliseconds / (60*60*1000)) + workTime))) {
                workTimeBeforeDeadline = workTime - workTime;
                deadline = new Date(deadline.valueOf() + workTime * 60 * 60000)
                deadline = deadline.valueOf();
                return deadline
            } 
        }
}


module.exports = deadLine;