var chai = require('chai');
var chaiHttp = require('chai-http');
const { describe } = require('mocha');
var expect = chai.expect;
chai.use(chaiHttp);

var userId = '12345';
var userSin = '5555555';
var residentId = '';


describe("Create resident", function() {
    it("Create resident have to return the new resident data", function(done) {
        chai.request('http://localhost:3000')
            .post('/residents/')
            .query({
                user_id: userId, 
                }).end(function(req, res) {
                    expect(res.body.user_id).to.equal(userId);
                    done();
            });
    });
});


describe("Modify resident", function() {
    it("Modify resident have to return the resident data", function(done) {
        chai.request('http://localhost:3000')
            .put('/residents/')
            .query({
                user_id: userId,
                completename: 'testname',
                address: 'testaddress',
                city: 'testcity',
                phone: 'testphone',
                age: '30',
                sin: userSin
            }).end(function(req, res) {
                expect(res.body.completename).to.equal('testname');
                done();
            });
    });
});

describe("Get a single resident by sin", function() {
    it("This function have to return resident information", function(done) {
        chai.request('http://localhost:3000')
            .get('/resident/bysin/' + userSin)
            .query().end(function(req,res){
                expect(res.body[0].sin).to.equal(userSin);
                residentId = res.body[0].id
                done();
            });
    });
});

describe("Get a single resident by id", function() {
    it("This function have to return resident information", function(done) {
        chai.request('http://localhost:3000')
            .get('/resident/byid/' + userId)
            .query().end(function(req,res){
                expect(res.body[0].user_id).to.equal(userId);
                done();
            });
    });
});

describe("Get list of residents", function() {
    it("This function have to return a list of residents", function(done) {
        chai.request('http://localhost:3000')
            .get('/residents/')
            .query().end(function(req,res){
                expect(res.body[0]).to.exist;
                done();
            });
    });
});

describe("Delete single resident", function() {
    it("This function have to return empty information", function(done) {
        chai.request('http://localhost:3000')
            .delete('/residents/' + residentId)
            .query().end(function(req,res){
                expect(res.body).to.be.empty;
                done();
            });
    });
});