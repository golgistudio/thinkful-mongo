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
});
