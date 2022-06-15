const { default: axios } = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const token = '5057402870:AAEIZ2fi2IvC1NZt5Dsam9n7mshta3zAnMM';

const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const result = msg.text;
    const userInfo = msg.from;
    if (result === 'photo'){
        axios({
            method: 'get',
            url: 'https://picsum.photos/200/300',
            responseType: 'stream'
          })
            .then(function (response) {
                response.data.pipe(fs.createWriteStream('ph.jpg'));
            });
        const photoPath = path.join(__dirname,'ph.jpg');
        bot.sendPhoto(chatId,photoPath);
        console.log(`Пользователь ${userInfo.first_name} запросил картинку`);
    }
    if (result !== 'photo'){
        bot.sendMessage(chatId, `Вы написали : "${result}"`);
        console.log(`Пользователь ${userInfo.first_name} написал: ${result}`);
    }
  });

