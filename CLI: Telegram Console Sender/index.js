const { Command } = require('commander');
const TelegramBot = require('node-telegram-bot-api');

const program = new Command();

const token = '5057402870:AAEIZ2fi2IvC1NZt5Dsam9n7mshta3zAnMM';

const bot = new TelegramBot(token, {polling: true});

//чтобы узнать наш чат id перед использованием 
bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  console.log(chatId)
})



program
  .name('app')
  .description('CLI Message sender')
  .version('0.1.0');

program.command('message')
  .description('Send message to Telegram Bot')
  .argument('<message>','your string')
  .action(async (argument) => {
    await bot.sendMessage(422142227,argument);
    process.exit();
  });

program.command('photo')
  .description('Send photo to Telegram Bot')
  .argument('<path>', 'path to photo')
  .action(async(argument) => {
    await bot.sendPhoto(422142227,argument);
    console.log('\tYou successfully sent photo to your Teleram bot');
    process.exit();
  });  

program.parse();
