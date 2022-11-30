var chai = require('chai');
var chaiHttp = require('chai-http');
const { describe } = require('mocha');
var expect = chai.expect;
chai.use(chaiHttp);

var userId = '12345';
var userSin = '5555555';
var recordId = '';


describe("Create record", function() {
    it("Create record have to return the new record data", function(done) {
        chai.request('http://localhost:3000')
            .post('/residentRecords/')
            .query({
                user_id: userId,
                completename: 'testuser',
                sin: userSin,
                day: '11-29-2022 21:00',
                blood_pressure: '70/120',
                respiration_rate: '85',
                blood_oxygen: '90%',
                heart_beat: '75',
                comment: 'test register' 
                }).end(function(req, res) {
                    expect(res.body.user_id).to.equal(userId);
                    recordId = res.body.id;
                    done();
            });
    });
});


describe("Modify record", function() {
    it("Modify record have to return the record data", function(done) {
        chai.request('http://localhost:3000')
            .put('/residentRecords/')
            .query({
                user_id: userId,
                completename: 'testname',
                sin: userSin,
                day: '11-29-2022 21:00',
                blood_pressure: '70/120',
                respiration_rate: '85',
                blood_oxygen: '90%',
                heart_beat: '75',
                comment: 'test register mod' 
            }).end(function(req, res) {
                expect(res.body.completename).to.equal('testname');
                done();
            });
    });
});

describe("Get a single record", function() {
    it("This function have to return resident information", function(done) {
        chai.request('http://localhost:3000')
            .get('/residentRecords/record/' + recordId)
            .query().end(function(req,res){
                expect(res.body[0].id).to.equal(recordId);
                done();
            });
    });
});

describe("Get resident records", function() {
    it("This function have to return resident records", function(done) {
        chai.request('http://localhost:3000')
            .get('/residentRecords/' + userId)
            .query().end(function(req,res){
                expect(res.body[0].user_id).to.equal(userId);
                done();
            });
    });
});

describe("Get list of records", function() {
    it("This function have to return a list of residents", function(done) {
        chai.request('http://localhost:3000')
            .get('/residentRecords/')
            .query().end(function(req,res){
                expect(res.body[0]).to.exist;
                done();
            });
    });
});

describe("Delete single record", function() {
    it("This function have to return empty information", function(done) {
        chai.request('http://localhost:3000')
            .delete('/residentRecords/' + recordId)
            .query().end(function(req,res){
                expect(res.body).to.be.empty;
                done();
            });
    });
});