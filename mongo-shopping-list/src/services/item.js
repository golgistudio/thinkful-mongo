var Item = require('../models/item');

exports.save = function(name, callback, errback) {
    Item.create({ name: name }, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        callback(item);
    });
};

exports.list = function(callback, errback) {
    Item.find(function(err, items) {
        if (err) {
            errback(err);
            return;
        }
        callback(items);
    });
};

exports.update = function(name, id, callback, errback) {
    console.log("service update - " + id + ", name : " + name)
    Item.findById(id, function(err, doc) {
        if (err) {
            errback(err);
            return;
        }
        doc.name = name
        doc.save(function(err) {
            if (err) {
                errback(err)
                return;
            }
            callback(doc);
        })
    })
};

exports.delete = function(id, callback, errback) {
    Item.findById(id, function(err, doc) {
        if (err) {
            errback(err);
            return;
        }
        doc.remove(function(err) {
             if (err) {
                errback(err)
                return;
            }
            callback(doc);
        })
    })
};

