require('dotenv').config();
const mongoose = require('mongoose');

let _db; // store db connection

async function initDb() {

    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }

    // options not suported?
    var options = { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };

    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, options);
        _db = connect;

        console.log("Connected to DB!");
        return {"Status": "Success", "Message": "Connected to DB!"};
    } catch (error) {
        console.log("DB connection error");
        return {"Status": "Error", "Message": error};
    }
}

module.exports = {initDb};