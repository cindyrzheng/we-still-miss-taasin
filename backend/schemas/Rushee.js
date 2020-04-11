var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Rushee = new Schema({
    firstName: {type: String, required : true},
    lastName : {type: String, required : true},
    email    : {type: String, required : true, unique : true, dropDups: true}, // use as a Primary Key
    year     : {type: String, required : true},
    major    : {type: String, required : true},
    present  : [{type: String}], 
    image    : {data: Buffer, contentType: String}
});

module.exports = mongoose.model('Rushee', Rushee);