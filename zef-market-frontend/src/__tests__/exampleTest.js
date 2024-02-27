const sum = require("../utils/exapmpleModule")

test('two plus two is four', () => { 
  expect(2 +2 ).toBe(4)
 })
test('two plus four is sex', () => { 
  expect(sum(2 , 4 ) ).toBe(6)
 })