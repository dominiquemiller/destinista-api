let superTest = require("supertest");
let app = require('../server.js');
let tellJasmineDone = require('jasmine-supertest')

const req_body = { "network": "xbox", "tag": "mr1monkey" };

describe('gamerInfoController', () => {
    it('POST /gamerInfo should return response', (doneMock) => {
       superTest(app).post('/gamerinfo')
                      .send(req_body)
                      .expect('Content-Type', /json/)
                      .expect(200, req_body)
                      .end(tellJasmineDone(doneMock)); 

    });
});
