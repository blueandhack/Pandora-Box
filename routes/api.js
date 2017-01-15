/**
 * Created by Yoga on 1/14/17.
 */
var express = require('express');
var router = express.Router();
var Task = require('../models/task');
var moment = require('moment');
var crypto = require('crypto');
var fs = require('fs');

router.post('/task/add', function (req, res, next) {
    var content = req.body.content;

    var newTask = new Task({
        content: content,
        create: Date.now()
    });


    var saveNewTask = newTask.save();

    saveNewTask.then(function () {
        var status = {
            status: "ok"
        };
        res.json(status);
    });


});


router.get('/task/get', function (req, res, next) {

    var getAllTask = Task.find({}, null, {sort: {create: 1}}).exec();
    getAllTask.then(function (tasks) {
        res.json(tasks);
    });

});


router.post('/task/remove', function (req, res, next) {
    var number = req.body.number;
    var id = "";
    var getAllTasks = Task.find({}).exec();
    getAllTasks.then(function (tasks) {
        if (number == 0 || tasks.length == 0 || number > tasks.length) {
            var status = {status: "error"};
            res.json(status);
        } else {
            id = tasks[number - 1]._id;
            var delTask = Task.remove({_id: id});
            delTask.then(function () {
                res.json({status: "ok"});
            });
        }
    });
});


router.get('/light/status', function (req, res, next) {
    var obj = JSON.parse(fs.readFileSync('ledstatus.json', 'utf8'));
    res.json(obj);
});


router.post('/light/change', function (req, res, next) {
    var change = req.body.change;
    if (change == "on") {
        var on = {status: "on"};
        fs.writeFile('ledstatus.json', JSON.stringify(on), 'utf8', function () {
            res.json({status: "ok"});
        });
    } else {
        var off = {status: "off"};
        fs.writeFile('ledstatus.json', JSON.stringify(off), 'utf8', function () {
            res.json({status: "ok"});
        });
    }

});


router.get('/door/status', function (req, res, next) {
    var obj = JSON.parse(fs.readFileSync('doorstatus.json', 'utf8'));
    res.json(obj);
});


router.post('/door/change', function (req, res, next) {
    var change = req.body.change;
    if (change == "open") {
        var on = {door: "open"};
        fs.writeFile('doorstatus.json', JSON.stringify(on), 'utf8', function () {
            res.json({status: "ok"});
        });
    } else {
        var off = {door: "close"};
        fs.writeFile('doorstatus.json', JSON.stringify(off), 'utf8', function () {
            res.json({status: "ok"});
        });
    }
});


router.get('/fan/status', function (req, res, next) {
    var obj = JSON.parse(fs.readFileSync('fanstatus.json', 'utf8'));
    res.json(obj);
});


router.post('/fan/change', function (req, res, next) {
    var change = req.body.change;
    if (change == "on") {
        var on = {fan: "on"};
        fs.writeFile('fanstatus.json', JSON.stringify(on), 'utf8', function () {
            res.json({status: "ok"});
        });
    } else {
        var off = {fan: "off"};
        fs.writeFile('fanstatus.json', JSON.stringify(off), 'utf8', function () {
            res.json({status: "ok"});
        });
    }
});


router.post('/all/change', function (req, res, next) {
    var change = req.body.change;
    if (change == "on") {
        var on = {fan: "on"};
        fs.writeFile('fanstatus.json', JSON.stringify(on), 'utf8', function () {
            var onOne = {door: "open"};
            fs.writeFile('doorstatus.json', JSON.stringify(onOne), 'utf8', function () {
                var onTwo = {status: "on"};
                fs.writeFile('ledstatus.json', JSON.stringify(onTwo), 'utf8', function () {
                    res.json({status: "ok"});
                });
            });
        });
    } else {
        var off = {fan: "off"};
        fs.writeFile('fanstatus.json', JSON.stringify(off), 'utf8', function () {
            var offOne = {door: "close"};
            fs.writeFile('doorstatus.json', JSON.stringify(offOne), 'utf8', function () {
                var offTwo = {status: "off"};
                fs.writeFile('ledstatus.json', JSON.stringify(offTwo), 'utf8', function () {
                    res.json({status: "ok"});
                });
            });
        });
    }

});

module.exports = router;