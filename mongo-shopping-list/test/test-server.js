var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../src/server.js');
var Item = require('../src/models/item');
var seed = require('../src/db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        seed.run(function() {
            done();
        });
    });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });

    var results

    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                results = res.body
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });

    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Kale');
                //storage.items.should.be.a('array');
                //storage.items.should.have.length(4);
                //storage.items[3].should.be.a('object');
                //storage.items[3].should.have.property('_id');
                //storage.items[3].should.have.property('name');
                //storage.items[3].id.should.be.a('number');
                //storage.items[3].name.should.be.a('string');
                //storage.items[3].name.should.equal('Kale');
                done();
            });
    });

    it('should edit an item on put', function(done) {
        chai.request(app)
            .put('/items/' + results[0]._id)
            .send({'name': 'Milk', _id: results[0]._id})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Milk');
                //storage.items.should.be.a('array');
                //storage.items.should.have.length(4);
                //storage.items[1].should.be.a('object');
                //storage.items[1].should.have.property('_id');
                //storage.items[1].should.have.property('name');
                //storage.items[1].id.should.be.a('number');
                //storage.items[1].name.should.be.a('string');
                //storage.items[1].name.should.equal('Milk');
                done();
            });
    });

    it('should delete an item on delete', function(done) {
        chai.request(app)
            .delete('/items/' + results[2]._id)
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Peppers');
                //storage.items.should.be.a('array');
                //storage.items.should.have.length(3);
                //storage.items[0].name.should.equal('Broad beans');
                //storage.items[1].name.should.equal('Milk');
                //storage.items[2].name.should.equal('Kale');
                done();
            });
    });

    it('should return error for delete request that does not exist', function(done) {
        chai.request(app)
            .delete('/items/5')
            .end(function(err, res) {
                err.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                //storage.items.should.be.a('array');
                //storage.items.should.have.length(3);
                //storage.items[0].name.should.equal('Broad beans');
                //storage.items[1].name.should.equal('Milk');
                //storage.items[2].name.should.equal('Kale');
                done();
            });
    });
});
