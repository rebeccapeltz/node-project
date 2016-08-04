'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const MilkShake = require('../model/milkshake.js');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;
//const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
const app = require('../server');

describe('Testing CRUD routes MilkShake', () => {
  let server;
  after((done) => {
    //process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });
  before((done) => {
    server = app.listen(3003, () => {
      console.log('up on 3003');
      done();
    });
  });


  it('should respond with 404 to a bad path', (done) => {
    request('localhost:3003')
      .get('/badpath')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('{"message":"not found"}');
        done();
      });
  });
  it('should get a list of milkshakes', (done) => {
    request('localhost:3003')
      .get('/milkshake/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
  it('should create a milkshake', (done) => {
    request('localhost:3003')
      .post('/milkshake')
      .send({
        flavor: 'strawberry',
        scoops: 3,
        milkRichness: 'whole milk'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.flavor).to.eql('strawberry');
        expect(res.body.scoops).to.eql(3);
        done();
      });
  });

  describe('tests that need an existing milkshake', () => {
    let testMilkShake;
    let server;
    before((done) => {
      server = app.listen(3004, () => {
        console.log('up on 3004');
        done();
      });
    });
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        server.close();
        done();
      });
    });
    beforeEach((done) => {
      let newMilkShake = new MilkShake({
        flavor: 'peanut butter',
        scoops: 4,
        milkRichness: '2percent milk'
      });
      newMilkShake.save((err, milkshake) => {
        testMilkShake = milkshake;
        done();
      });
    });

    it('should update a message', (done) => {
      //testMilkShake.scoops = 2;
      let update = {
        'scoops': 2
      };
      request('localhost:3003')
        .put('/milkshake/' + testMilkShake._id)
        .send(update)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully updated');
          done();
        });
    });

    it('should get rid of perfectly good milkshakes', (done) => {
      request('localhost:3003')
        .delete('/milkshake/' + testMilkShake._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('successfully deleted');
          done();
        });
    });
  });
});
