const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');





console.log('Hi, welcome to CLI: Primitive DB');

fs.mkdir(path.join(__dirname, 'task2'), (err) => {
    if (err){
        throw err
    }
})

const arrayWithDb = []

const questions = [
    {
        type:'input',
        name:'user',
        message:"Enter the user's name. To cancel press ENTER:",
    },
    {
        type: 'confirm',
        name: 'checkDB',
        message: 'Would you to search values in DB?',
        when(answers) {
          return answers.user === ''
        },
    },
    {
        type:'list',
        name:'gender',
        message:'Choose your Gender.',
        choices: ['male','female'],
        when(answers) {
          return answers.user !== ''
        }
    },
    {
        type:'input',
        name:'age',
        message:"Enter your age:",
        when(answers) {
          return answers.user !== ''
        }
    },
]

const questionAfterDB = [
    {
        type:'input',
        name:'findUserDB',
        message:"Enter users name you wanna find in DB: "
    },
]

const filePath = path.join(__dirname, 'task2', 'PrimitiveDB.txt')

const writeFileFunc = function(path,data) {
    fs.writeFile(path,JSON.stringify(data),err =>{
        if (err){
            throw err
        }
    })
    
}

const readFilePlusQuestionFunc = async function(path){
    fs.readFile(path, 'utf-8' ,(err,content) =>{
        if (err){
            throw err
        }
        
        console.log('\n',JSON.parse(content))
        //считали базу данных и вызвали вопрос после нёё
        userRequest(content)
            .then(ans => {
                
                const arrayWithUsers = JSON.parse(content)
                
                if (arrayWithUsers.some(el => el.user == ans.findUserDB) === true){
                    console.log(`${ans.findUserDB} was found`)
                    const foundUser = arrayWithUsers.find(el => el.user === ans.findUserDB)
                    console.log(foundUser)
                    process.exit()
                }
            
            
            }
            )   
    })    
}

const userRequest = async(textFromDb) => {
    return inquirer.prompt(questionAfterDB)
}

const runProg = async function (){
    const result = await inquirer.prompt(questions)
    .then((answers) => {
        const userAns = answers
        if (userAns.user !== ''){
            arrayWithDb.push(userAns)
            writeFileFunc(filePath,arrayWithDb)
        }
        if (userAns.checkDB === true){
            readFilePlusQuestionFunc(filePath)
        }
        if (userAns.checkDB === false){
            process.exit()
        } else{runProg()}
    }
    )   
}

runProg()