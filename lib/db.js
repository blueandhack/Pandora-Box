/**
 * Created by Yoga on 1/14/17.
 */
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/HITODAY');

exports.mongoose = mongoose;