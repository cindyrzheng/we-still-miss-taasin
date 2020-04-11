const express  = require('express');
const mongoose = require('mongoose');

// Import Schemas
require('../schemas/Rushee');
const Rushee = mongoose.model('Rushee');

// Import functions
// const photos = require('./photos').upload;

const router = express.Router();

router.post('/create', async(req, res) => {
    var firstName = req.body.firstName;
    var lastName  = req.body.lastName;
    var email     = req.body.email;
    var year      = req.body.year;
    var major     = req.body.major;

    // todo - image, use multer somehow

    var doc;
    try {
        doc = await Rushee.create({firstName: firstName, lastName: lastName, email: email, year: year, major: major});
    } catch (error) {
        console.log("Error: " + error.message);
        res.send({"Status": "Error", "Message": error.message}); 
    }

    console.log("success, Rushee created " + doc);
    res.send({"status": "success", "payload": "Rushee Saved " + firstName});
});

async function getRushees(){
    let docs;

    try {
        docs = await Rushee.find({}).sort({ year: 1 });
    } catch (error) {
        console.log(error);
    }

    return docs
};

module.exports = {router, getRushees};