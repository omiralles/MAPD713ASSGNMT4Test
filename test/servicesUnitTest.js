var chai = require('chai');
var chaiHttp = require('chai-http');
const { describe } = require('mocha');
var expect = chai.expect;
chai.use(chaiHttp);

var userId = '12345';
var userSin = '5555555';
var serviceId = '';


describe("Create service", function() {
    it("Create service have to return the new service data", function(done) {
        chai.request('http://localhost:3000')
            .post('/services/')
            .query({
                user_id: userId,
                day: '11-29-2022 21:00',
                speciality: 'Derma',
                center: 'North'
                }).end(function(req, res) {
                    expect(res.body.user_id).to.equal(userId);
                    serviceId = res.body.id;
                    done();
            });
    });
});


describe("Modify service", function() {
    it("Modify service have to return the service data", function(done) {
        chai.request('http://localhost:3000')
            .put('/services/')
            .query({
                id: serviceId,
                user_id: userId,
                day: '11-29-2022 21:00',
                speciality: 'Dermatologig',
                center: 'North York'
            }).end(function(req, res) {
                expect(res.body.center).to.equal('North York');
                done();
            });
    });
});

describe("Get a single service by id", function() {
    it("This function have to return service information", function(done) {
        chai.request('http://localhost:3000')
            .get('/services/' + serviceId)
            .query().end(function(req,res){
                expect(res.body[0].id).to.equal(serviceId);
                done();
            });
    });
});

describe("Get list of services", function() {
    it("This function have to return a list of services", function(done) {
        chai.request('http://localhost:3000')
            .get('/services/')
            .query({user_id: userId}).end(function(req,res){
                expect(res.body[0]).to.exist;
                done();
            });
    });
});

describe("Delete single service", function() {
    it("This function have to return empty information", function(done) {
        chai.request('http://localhost:3000')
            .delete('/services/' + serviceId)
            .query().end(function(req,res){
                expect(res.body).to.be.empty;
                done();
            });
    });
});