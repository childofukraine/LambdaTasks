const data = {
    language: {
        uaAndRu: {char: 0.05, charHour: 1333},
        en: {char: 0.12,charHour: 333}
    },
    mimeType: ['none','doc','docx','rtf'],
    multiplierIfOther: 1.2,
    baseMultiplier: 1,
    uaAndRuMinPrice: 50,
    enMinPrice: 120,
    minTimeOfWork: 1,
}


const price = (charNumber,lang,fileExt) => {

    const multiplier = data.mimeType.includes(fileExt)? data.baseMultiplier : data.multiplierIfOther;
    
    const charPrice = lang === 'en' ? data.language.en.char : data.language.uaAndRu.char;

    const charPerHour = lang === 'en'? data.language.en.charHour : data.language.uaAndRu.charHour;

    const minPrice = (lang === 'en' ? data.enMinPrice : data.uaAndRuMinPrice) * multiplier;

    let cost = charNumber * charPrice * multiplier;

    let timeOfWork = Math.ceil(charNumber/charPerHour) + 0.5;

    if (timeOfWork < data.minTimeOfWork) {
        timeOfWork = data.minTimeOfWork;
    }

    if (fileExt === "other") {
        timeOfWork = timeOfWork * 1.2;
    }

    cost = cost > minPrice ? cost : minPrice;

    
    return {cost,timeOfWork}
}


module.exports = price;



