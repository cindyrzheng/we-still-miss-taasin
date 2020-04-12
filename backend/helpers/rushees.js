const express  = require('express');
const mongoose = require('mongoose');

// Import Schemas
require('../schemas/Rushee');
const Rushee = mongoose.model('Rushee');

// Import functions
// const photos = require('./photos').upload;

const router = express.Router();

router.post('/create', async(req, res) => {
    var firstName = req.body.body.firstName;
    var lastName  = req.body.body.lastName;
    var email     = req.body.body.email;
    var year      = req.body.body.year;
    var major     = req.body.body.major;

    // todo - image, use multer somehow

    var doc;
    try {
        doc = await Rushee.create({firstName: firstName, lastName: lastName, email: email, year: year, major: major});
    } catch (error) {
        console.log("Error: " + error.message);
        res.send({"Status": "Error", "Message": error.message}); 
    }

    console.log("success, Rushee created " + doc);
    res.send({"Status": "Success", "payload": "Rushee Saved " + firstName});
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

    res.send({"Status": "Success", "Data": docs});
});

var days = ["Sun", "M", "T", "W", "Th", "F", "Sat"];

router.get('/signIn', async(req, res) => {
    let email = req.query.email;

    // todo - verify not null
    // console.log(email);

    var d = new Date();
    var day = days[d.getDay()];
  
    let doc;
    try {
        doc = await Rushee.findOne({"email": email});
    } catch (error) {
        console.log("Error: " + error.message);
        res.send({"Status": "Error", "Message": error.message}); 
    }

    if(doc == null){
        res.send({"Status": "Error", "Message": "Couldn't find " + email + " in registered rushees"});
    }

    if(!doc.present.includes(day)){
        doc.present.push(day);

        try {
            await doc.save();
        } catch (error) {
            res.send({"Status": "Error", "Message": "Couldn't save updated attendance to db, " + error.message}); 
        }
    }

    res.send({"Status": "Success", "Data": "Checked " + email + " In!"});
});

module.exports = router;