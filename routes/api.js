/**
 * Created by Yoga on 1/14/17.
 */
var express = require('express');
var router = express.Router();
var Task = require('../models/task');
var moment = require('moment');
var crypto = require('crypto');

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

    var getAllTask = Task.find({}, null, {sort: {create: -1}}).exec();
    getAllTask.then(function (tasks) {
        res.json(tasks);
    });

});


router.post('/task/remove', function (req, res, next) {
    var number = req.body.number;
    var id = "";
    var getAllTasks = Task.find({}).exec();
    getAllTasks.then(function (tasks) {
        if (tasks.length == 0 || number > tasks.length) {
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


module.exports = router;