const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const sortMethods = '\n1.Words by name (form A to Z).\n2.Show digits from the smallest.\n3.Show digits from the biggest.\n4.Word by quantity of letter.\n5.Only unique words.\n6.All unique values'

const main = async () => {
    const firstAns = await new Promise(words => rl.question('Hello.Enter 10 words or digits deviding them in spaces: ',words))
    
    if (firstAns === 'exit'){
        process.exit()
    }

    const arrayWithWordsAndNumbers = firstAns.split(' ')

    const innerFunc = async (array) => {
        const secondAns = await new Promise(sortType =>rl.question(`How would you like to sort values:${sortMethods}\n\nSelect (1 - 5) and press ENTER: `,sortType))
        switch(secondAns){
        case '1':
            arrayWithWordsAndNumbers.sort()
            console.log(arrayWithWordsAndNumbers)
            break
        case '2':
            const fromSmalltoBigArray = arrayWithWordsAndNumbers.filter(item=>!isNaN(parseInt(item)))
            fromSmalltoBigArray.sort((a,b) => a-b)
            console.log(fromSmalltoBigArray)
            break
        case '3':
            const fromBigToSmallArray = arrayWithWordsAndNumbers.filter(item=>!isNaN(parseInt(item)))
            fromBigToSmallArray.sort((a,b) => b-a)
            console.log(fromBigToSmallArray)
            break
        case '4':
            const onlyWordsArray = arrayWithWordsAndNumbers.filter(word => isNaN(word))
            onlyWordsArray.sort((a,b) => a.length - b.length);
            console.log(onlyWordsArray)
            break
        case '5':
            const onlyUniqueWordsAndNumsArray = [...new Set(arrayWithWordsAndNumbers)].sort()
            const withOutNumsArray = onlyUniqueWordsAndNumsArray.filter(word => isNaN(word))
            console.log(withOutNumsArray)
            break
        case '6':
            const allUniqeValues = [...new Set(arrayWithWordsAndNumbers)].sort()
            console.log(allUniqeValues)
            break
        }

        main() 
    }

    innerFunc(arrayWithWordsAndNumbers)
}
main()


