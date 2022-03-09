let { getRandomNum } = require("../utils/functions");
// let assert = require('assert');

describe('Addition', function () {
  it("The function should return a random number between one and five", function () {
    // let start = 1, end = 5
    // const numbers = Array.from({ length: 100 }, () => getRandomNum(start, end));
    console.log(getRandomNum(1, 5));
    let value = getRandomNum(1, 5)

    // console.log(value)
    expect(value).toBe(2);
    // assert({
    //   given: 'start, end',
    //   should: 'generate a random number less than or equal to end',
    //   actual: numbers.every(n => n < end),
    //   expected: true
    // });

    // expect(value).arrayContaining([1, 2, 3, 4, 5])
  })
})