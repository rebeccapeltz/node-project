'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const IceCream = require('../model/icecream');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;

process.env.MONGODB_URI = 'mongodb://localhost/test_db';
var app = require('../server');



describe('Testing CRUD routes IceCream', () => {
  let server;
  before((done) => {
    server = app.listen(3003, () => {
      console.log('up on 3003');
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('should respond with 404 to bad path', (done) => {
    request('localhost:3003')
      .get('/badpath')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('{"message":"not found"}');
        done();
      });
  });
  it('should get a list of ice cream', (done) => {
    request('localhost:3003')
      .get('/icecream/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
  it('should create ice cream', (done) => {
    request('localhost:3003')
      .post('/icecream/')
      .send({
        flavor: 'chocolate',
        scoops: 1,
        vessel: 'cup'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.flavor).to.eql('chocolate');
        expect(res.body.vessel).to.eql('cup');
        done();
      });
  });

  describe('tests that need ice cream already', () => {
    let testIceCream;
    let server;
    before((done) => {
      server = app.listen(3004, () => {
        console.log('up on 3004');
        done();
      });
    });
    beforeEach((done) => {
      let newIceCream = new IceCream({
        flavor: 'vanilla',
        scoops: 2,
        vessel: 'waffle cone'
      });
      newIceCream.save((err, icecream) => {
        testIceCream = icecream;
        done();
      });
    });
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        server.close();
        done();
      });
    });

    it('should update a message', (done) => {
      let update = {
        'flavor': 'coffee'
      };
      request('localhost:3004')
        .put('/icecream/' + testIceCream._id)
        .send(update)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          console.log(res.body);
          expect(res.body.message).to.eql('successfully updated');
          done();
        });
    });

    it('should get rid of perfectly good ice cream', (done) => {
      request('localhost:3004')
        .delete('/icecream/' + testIceCream._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully deleted');
          done();
        });
    });
  });
});
