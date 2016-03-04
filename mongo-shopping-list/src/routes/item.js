var express = require('express');
var Item = require('../services/item');
var router = express.Router();

function handleGet(req, res) {
    Item.list(function(items) {
        res.json(items);
    }, function(err) {
        res.status(400).json(err);
    });
};

function handlePost(req, res) {
    Item.save(req.body.name, function(item) {
        console.log("handlePost - " + item)
        res.status(201).json(item);
    }, function(err) {
        res. status(400).json(err);
    });
};

function handleDelete(req, res) {
    Item.delete(req.params.id, function(item) {
        res.status(201).json(item);
    }, function(err) {
        res.status(400).json(err);
    });
}

function handlePut(req, res) {
    Item.update(req.body.name, req.params.id, function(item) {
        res.status(201).json(item);
    }, function(err) {
        res.status(400).json(err);
    });

}

router.get('/items', handleGet)
router.post('/items', handlePost)
router.delete('/items/:id', handleDelete)
router.put('/items/:id', handlePut) 

module.exports = router;
