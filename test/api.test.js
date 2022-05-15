const request = require('supertest');
const en = require('../src/localization/en');
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
  const validDummyIBANs = [
    'AL47212110090000000235698741',
    'CY17002001280000001200527600',
    'KW81CBKU0000000000001234560101',
    'LU280019400644750000',
    'NO9386011117947',
    'PK36SCBL0000001123456702',
    'AE160351411001955458020',
    'SE4550000000058398257466'
  ];

  it('responds with a iban is valid message', (done) => {
    validDummyIBANs.forEach((iban) => {
      request(app)
        .post('/api/v1/iban/validate/')
        .send({ iban })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { message: en('iban.valid') }, done);
    });
  });

  it('responds with IBAN is invalid', (done) => {
    request(app)
      .post('/api/v1/iban/validate/')
      .set('Accept', 'application/json')
      .send({ iban: 'AE070331234567890123' })
      .expect('Content-Type', /json/)
      .expect(200, { message: en('iban.invalid') }, done);
  });

  it('responds with a invalid', (done) => {
    request(app)
      .post('/api/v1/iban/validate/')
      .send({ iban: 'AE1603514110019554580202' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: en('iban.invalid') }, done);
  });
});

describe('POST IBAN Route Validation', () => {
  it('responds with IBAN should be 15 character long message', (done) => {
    request(app)
      .post('/api/v1/iban/validate/')
      .set('Accept', 'application/json')
      .send({ iban: '123' })
      .expect('Content-Type', /json/)
      .expect(400, { message: en('validation.min.length') }, done);
  });

  it('responds with IBAN cannot be more than 34 letters', (done) => {
    request(app)
      .post('/api/v1/iban/validate/')
      .set('Accept', 'application/json')
      .send({ iban: 'AE070331234567890123456123123312313123123' })
      .expect('Content-Type', /json/)
      .expect(400, { message: en('validation.max.length') }, done);
  });

  it('responds with IBAN must only contain alpha numeric characters', (done) => {
    request(app)
      .post('/api/v1/iban/validate/')
      .set('Accept', 'application/json')
      .send({ iban: 'ABS ASAA ASD ASD SAD ASD ASD ASD ASD' })
      .expect('Content-Type', /json/)
      .expect(400, { message: en('validation.alphaNumeric') }, done);
  });
});
