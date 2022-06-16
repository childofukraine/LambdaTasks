const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '5526539464:AAFNe4s6d0x8Pvk58HxiPa5h5dxUoTxLRSs';
const bot = new TelegramBot(token, {polling: true});
const apiKey = 'c2bf63227cf0885ce975b5083a27820d';


let arrData = []
const weatherKharkiv = async() => {
    return axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/forecast?q=Kharkiv,ua&appid=c2bf63227cf0885ce975b5083a27820d&units=metric&lang=ru`
      })
        .then((response) => {
            arrData = response.data.list
        })
        .catch((err) => console.log(err.message)); 
};

const cityOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text:'Харьков',callback_data:'Kh'}]
        ]
    })
};

const timeOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text:'С интервалом в 3 часа',callback_data:'3'},{text:'С интервалом в 6 часов',callback_data:'6'}]
        ]
    })
};

const currencyOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text:'USD',callback_data:'USD'},{text:'EUR',callback_data:'EUR'}]
        ]
    })
};

const start = async () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/weather', description: 'Узнать погоду'},
        {command: '/currency', description: 'Узнать курс валют'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start'){
            return bot.sendMessage(chatId,'Приветствую тебя в своем боте')
        }
        if (text === '/weather'){
            return bot.sendMessage(chatId,'Выбори в каком городе ты хочешь посмотреть погоду: ',cityOptions)
        }
        if (text === '/currency'){
            return bot.sendMessage(chatId,'Курс какой валюты ты хочешь посмотреть? ',currencyOptions)
        }
        return bot.sendMessage(chatId,'Я тебя не понимаю')
    })

    let dayArray = [];
    const filterDay = (arr,query) => {
        return arr.filter(el => {
            const elUnixTimestamp = el.dt;
            const elDate = new Date(elUnixTimestamp * 1000);
            const elCurrentDay = elDate.getUTCDate();
            if (elCurrentDay === query){
                dayArray.push(el);
            }
        })
    };

    let tempArrForSix = [];
    const filterSix = (arr) =>{
        return arr.filter (el =>{
            const elSixUnixTimestamp = el.dt;
            const elSixDate = new Date(elSixUnixTimestamp * 1000);
            const elSixHour = elSixDate.getUTCHours();
            if (elSixHour % 6 === 0){
                tempArrForSix.push(el);
            }
        })
    };

    const usd = (chatId) => {
        return axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((resp) => {
            bot.sendMessage(chatId,`USD\nПокупка: ${resp.data[0].buy}\nПродажа: ${resp.data[0].sale}`)
    })
    }
    const eur = (chatId) => {
        return axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((resp) => {
            bot.sendMessage(chatId,`EUR\nПокупка: ${resp.data[1].buy}\nПродажа: ${resp.data[1].sale}`)
    })
    }

    bot.on('callback_query',async msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id;

        await weatherKharkiv();

        const unixTimestamp = arrData[0].dt;
        const date = new Date(unixTimestamp * 1000);
        let currentDay = date.getDate();

        if (data === 'USD'){
            usd(chatId)
        }
        if (data === 'EUR'){
            eur(chatId)
        }
        if (data === 'Kh'){
            bot.sendMessage(chatId,'С каким интервалом показать погоду: ',timeOptions);
        }
        if (data === '3'){
            for(const dayThree = currentDay;currentDay < dayThree +5;currentDay +=1){
                await filterDay(arrData,currentDay);
                const threeUnixTemestamp = dayArray[0].dt;
                const threeDate = new Date(threeUnixTemestamp * 1000);
                const threeOptions = {weekday:'long',day:'numeric',month:'long'};
                const threeTitle = new Intl.DateTimeFormat('ru-RU', threeOptions).format(threeDate);
                const result = dayArray.map(el => {
                    const time = el.dt_txt.slice(11,16);
                    return ` ${time}, ${Math.floor(el.main.temp)} °C, ощущается как: ${Math.floor(el.main.feels_like)} °C, ${el.weather[0].description}\n`
                }).join(" ");
                await bot.sendMessage(chatId,`${threeTitle}:\n ${result}`);
                dayArray = [];
            }
        }

        if (data === '6'){
            for(const daySix = currentDay;currentDay < daySix +5;currentDay +=1){
                await filterDay(arrData,currentDay);
                await filterSix(dayArray);
                const sixUnixTemestamp = tempArrForSix[0].dt;
                const sixDate = new Date(sixUnixTemestamp * 1000);
                const sixOptions = {weekday:'long',day:'numeric',month:'long'};
                const sixTitle = new Intl.DateTimeFormat('ru-RU', sixOptions).format(sixDate);
                const resultSix = tempArrForSix.map(el => {
                    const time = el.dt_txt.slice(11,16);
                    return ` ${time}, ${Math.floor(el.main.temp)} °C, ощущается как: ${Math.floor(el.main.feels_like)} °C, ${el.weather[0].description}\n`
                }).join(" ");
                await bot.sendMessage(chatId,`${sixTitle}:\n ${resultSix}`);
                dayArray = [];
                tempArrForSix = [];
            }
        }
    })

}

start();