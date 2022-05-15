const request = require('supertest');

const app = require('../src/app');

describe('GET Api Status Check', () => {
  it('responds with a true message', (done) => {
    request(app)
      .get('/api/v1/status')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual('OK');
        done();
      });
  });
});

describe('POST IBAN Validation', () => {
  it('responds with ', (done) => {
    request(app)
      .post('/api/v1/iban/validate/')
      .send({ iban: 'DUMMYIBAN' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, '"DUMMYIBAN is valid"', done);
  });
});
