
const mongoose = require('mongoose');
const User = require('../models/User');

// Importing Test Tools

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const should = chai.should();

// Using Http from chai
chai.use(chaiHttp);

// Cleaning the Database After Each Testing

describe('User', () => {
   
    after(function (done) {
          mongoose.connection.close(done)        
    })
    
  describe('Visiting Root Routes', () => {
      it('should Show the form search', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
      });
  });

  describe('Query Database', () => {
    context("When There's a match", () => {
        it('Should Return 10 searched data ', (done) => {
            chai.request(server)
                .get('/people-like-you?age=24')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.peopleLikeYou.length.should.be.eql(10);

                done();
            });
        });
    });

    context("When There's no match", () => {
        it('Should Return Error message', () => {
            chai.request(server)
                .get('/people-like-you?age=9999')
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('peopleLikeYou').eql("There's no Match for people you searched")
                });
        });
    });
  });

});