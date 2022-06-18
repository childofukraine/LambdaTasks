const fs = require('fs');
const { google } = require('googleapis');
const inquirer = require('inquirer');
const path = require('path');
const shortUrl = require('node-url-shortener');

const GOOGLE_API_FOLDER_ID = '1W3DSye3VInpvRDZh4htihi_3IBNz4RLK';


const question1 = [
    {
        type:'input',
        name:'filePath',
        message:'Drag and drop your image to terminal and press Enter for upload:'
    }
];



async function uploadFile(driveName) {
    try{
        const auth = new google.auth.GoogleAuth({
            keyFile: './googlekey.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        });

        const driveService = google.drive({
            version:'v3',
            auth
        });

        
        const fileMetaData = {
            'name': `${driveName}`,
            'parents':[GOOGLE_API_FOLDER_ID]
        };
        
        const media = {
            mimeType: 'image/jpg',
            body: fs.createReadStream('/home/sailant/VisualStudio/ProjectName/snow.jpg')
        };

        const response = await driveService.files.create({
            resource:fileMetaData,
            media:media,
            field:'id'
        });
        
        
        return response.data.id;

    }catch(err){
        console.log('Upload file error',err);
    }
};

inquirer.prompt(question1).then((ans) => {
    const filePath = ans.filePath;
    const fileName = path.basename(filePath);
    const fileExt = path.extname(filePath);
    const question2 = [
        {
            type:'confirm',
            name:'changeName',
            message:`Youre uploading the file with the name: ${fileName}\nWould you like to change it?`
        }
    ];
    const question3 = [
        {
            type:'input',
            name:'rename',
            message:`Enter new file name (WITHOUT extensions aka .jpg, .png, etc.)\n`
        }
    ];
    const question4 = [
        {
            type:'confirm',
            name:'link',
            message:`Would you like to shorten link?`
        }
    ];
    if (ans.filePath !== ''){
        console.log(`File name : ${fileName}\nFile extension: ${fileExt}`);
        inquirer.prompt(question2).then((ans2) => {
            if (ans2.changeName === true){
                inquirer.prompt(question3).then((ans3) => {
                    let driveName = ans3.rename;
                    uploadFile(driveName).then(data => {
                        const photoId = data;
                        console.log('Succesfully uploaded');
                        inquirer.prompt(question4).then((ans4) => {
                            if (ans4.link === true){
                                return shortUrl.short(`https://drive.google.com/uc?export=view&id=${photoId}`, function(err, url){console.log(`Your short link:${url}`)});
                            }else {
                                return console.log(`https://drive.google.com/uc?export=view&id=${photoId}`);
                            }
                        })
                    }) 
                })
            }else {
                uploadFile(fileName).then(data => {
                    const photoId = data;
                    console.log('Succesfully uploaded');
                    inquirer.prompt(question4).then((ans4) => {
                        if (ans4.link === true){
                            return shortUrl.short(`https://drive.google.com/uc?export=view&id=${photoId}`, function(err, url){console.log(`Your short link:${url}`)});
                        }else {
                            return console.log(`https://drive.google.com/uc?export=view&id=${photoId}`);
                        }
                    })
                })
            }
        })
    }
})