const expect = require('chai').expect;
const it = require('mocha').it;
it('Sum two numbers', function(){
  const num1 = 6;
  const num2 = 6;
  expect(num1 + num2).to.equal(12);
});