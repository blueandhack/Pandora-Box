/**
 * Created by Yoga on 1/14/17.
 */

var mongodb = require('../lib/db');

var Schema = mongodb.mongoose.Schema;


var taskSchema = new Schema({
    content: {type: String, default: ""},
    create: {type: Date, default: Date.now()}
});

// Index
taskSchema.index({create: 1});
taskSchema.index({student: true});

var Task = mongodb.mongoose.model('task', taskSchema);

module.exports = Task;