const price = require('../price');

test(' 1000 , ua, doc ',() => {
    expect(price(1000,'ua','doc')).toStrictEqual({ cost: 50, timeOfWork: 1.5 });
})

test(' 1000 , ua, other ',() => {
    expect(price(1000,'ua','other')).toStrictEqual({ cost: 60, timeOfWork: 1.7999999999999998 });
})

test(' 1334, ua, doc ',() => {
    expect(price(1334,'ua','doc')).toStrictEqual({ cost: 66.7, timeOfWork: 2.5 });
})

test(' 1334 , ua, other ',() => {
    expect(price(1334,'ua','other')).toStrictEqual({ cost: 80.04, timeOfWork: 3 });
})

test(' 333 , en, doc ',() => {
    expect(price(333,'en','doc')).toStrictEqual({ cost: 120, timeOfWork: 1.5 });
})

test(' 334 , en, doc ',() => {
    expect(price(334,'en','doc')).toStrictEqual({ cost: 120, timeOfWork: 2.5 });
})

test(' 333 , en, other ',() => {
    expect(price(333,'en','other')).toStrictEqual({ cost: 144, timeOfWork: 1.7999999999999998 });
})

test(' 334 , en, other ',() => {
    expect(price(334,'en','other')).toStrictEqual({ cost: 144, timeOfWork: 3 });
})