var chai = require('chai');
var chaiHttp = require('chai-http');
const { describe } = require('mocha');
var expect = chai.expect;
chai.use(chaiHttp);

var userId = '';


describe("Create user", function() {
    it("Create user have to return the new user data", function(done) {
        chai.request('http://localhost:3000')
            .post('/users/')
            .query({
                name: 'test', 
                email: 'test@test.com', 
                password: 'test',
                profile: 'Patient'
            }).end(function(req, res) {
                expect(res.body.email).to.equal('test@test.com');
                userId = res.body.id
                done();
            });
    });
});

describe("User login test", function() {
    it("Login have to return the user information", function(done) {
        chai.request('http://localhost:3000')
            .get('/user/login')
            .query({email: 'test@test.com', password: 'test'}).end(function(req, res) {
                expect(res.body[0].id).to.equal(userId);
                done();
            });
    });
});

describe("Change password", function() {
    it("Change password have to return the user information", function(done) {
        chai.request('http://localhost:3000')
            .put('/user/changepass')
            .query({id: userId, password: 'testmod'}).end(function(req, res) {
                expect(res.body.password).to.equal('testmod');
                done();
            });
    });
});

describe("Modify user", function() {
    it("Modify user have to return the user data", function(done) {
        chai.request('http://localhost:3000')
            .put('/users/')
            .query({
                id: userId,
                user: 'test',
                email: 'test@test.com',
                profile: 'doctor'}).end(function(req, res) {
                    expect(res.body.profile).to.equal('doctor');
                    done();
            });
    });
});

describe("Get a single user", function() {
    it("This function have to return the user information", function(done) {
        chai.request('http://localhost:3000')
            .get('/user/' + userId)
            .query().end(function(req,res){
                expect(res.body[0].id).to.equal(userId);
                done();
            });
    });
});

describe("Get list of users", function() {
    it("This function have to return a list of users", function(done) {
        chai.request('http://localhost:3000')
            .get('/users/')
            .query().end(function(req,res){
                expect(res.body[0]).to.exist;
                done();
            });
    });
});

describe("Delete single user", function() {
    it("This function have to return empty information", function(done) {
        chai.request('http://localhost:3000')
            .delete('/user/' + userId)
            .query().end(function(req,res){
                expect(res.body).to.be.empty;
                done();
            });
    });
});