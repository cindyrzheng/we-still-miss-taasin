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

router.get('/getRushee', async(req, res) => {
    let email = req.query.email;

    let docs;
    try {
        docs = await Rushee.find({"email": email});
    } catch (error) {
        console.log("Error: " + error.message);
        res.send({"Status": "Error", "Message": "Rushee not found" + email}); 
    }

    res.send(docs);
});

var days = ["Sun", "M", "T", "W", "Th", "F", "Sat"];

router.get('/signIn', async(req, res) => {
    let email = req.query.email;

    var d = new Date();
    var day = days[d.getDay()];
  
    let doc;
    try {
        doc = await Rushee.findOne({"email": email});

        if(doc.present.includes(day))
            res.send("Already checked in"); 

        doc.present.push(day);
        doc.save();
        
    } catch (error) {
        console.log("Error: " + error.message);
        res.send({"Status": "Error", "Message": error.message}); 
    }

    res.send("Checked In!");
});

module.exports = router;