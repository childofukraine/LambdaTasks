const deadLine = require('../deadline');

test('Пятница 18:00,4 часа работы',() => {
    expect(deadLine(4,1657292400000)).toStrictEqual(1657533600000);
})

test('Суббота 18:00,4 часа работы',() => {
    expect(deadLine(4,1657378800000)).toStrictEqual(1657537200000);
})

test('Четверг 18:00,12 часа работы',() => {
    expect(deadLine(12,1657206000000)).toStrictEqual(1657530000000);
})

test('Воскресенье 19:00,4 часа работы',() => {
    expect(deadLine(4,1657468800000)).toStrictEqual(1657537200000);
})


