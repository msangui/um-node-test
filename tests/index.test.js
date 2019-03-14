var request = require('supertest');
var app = require('../index.js');


describe('try get methods', () => {
  it('/hello should respond with the correct json message', (done) => {
    request(app).get('/hello').expect(JSON.stringify({message: 'hello'}), done);
  });

  it('/bye should respond with the correct json message', (done) => {
    request(app).get('/bye').expect(JSON.stringify({message: 'goodbye'}), done);
  });
});
