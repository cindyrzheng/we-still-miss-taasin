const express  = require('express');
const mongoose = require('mongoose');
const {google} = require('googleapis');
// const urljoin  = require('url-join');
// const axios    = require('axios');
// const fs       = require('fs');

const auth  = require('./auth');

const router = express.Router();

const BASE_URL = "https://slides.googleapis.com";
const slides = google.slides('v1');

// Import Schemas
require('../schemas/Rushee');
const Rushee = mongoose.model('Rushee');

async function getRushees(){
    let docs;

    try {
        docs = await Rushee.find({}).sort({ year: 1 });
    } catch (error) {
        console.log(error);
    }

    return docs
};

/**
 * Prints the number of slides and elements in a sample presentation:
 * https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
router.get('/test', (req, res) => {
    slides.presentations.get({
        presentationId: '1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc',
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const length = res.data.slides.length;
        console.log('The presentation contains %s slides:', length);
        res.data.slides.map((slide, i) => {
          console.log(`- Slide #${i + 1} contains ${slide.pageElements.length} elements.`);
        });
      });

    res.send("pls");
});

router.get('/create', async(req,res) => {
    
    let slideName = req.query.name;
    console.log("Creating new presentation named: " + slideName);

    let presentationId;

    try {
        const hi = await slides.presentations.create({
            'title': slideName,
        });
        presentationId = hi.data.presentationId;
        console.log(presentationId);
    } catch (error) {
        console.log(error);
        // res.send('error');
    }

    let docs = await getRushees();
    console.log(docs);

    requests = [];

    for (let i = 0 ; i < docs.length; i++){
        let obj = {
            "createSlide": {
                "objectId": i,
                "slideLayoutReference": {
                "predefinedLayout": "TITLE_AND_TWO_COLUMNS"
                },
                "placeholderIdMappings": [
                {
                    "layoutPlaceholder": {
                    "type": "TITLE",
                    "index": 0
                    },
                    "objectId": "NAME",
                    },
                ],
            },
            "insertText": {
                "objectId": "NAME",
                "text": docs[i]["firstName"] + " " + docs[i]["lastName"],
            }
        }
        requests.push(obj);
    }
    
    const hii = await slides.presentations.batchUpdate({"presentationId": presentationId, "requestBody": requests});
    console.log(hii);

    res.send(slideName);
});

module.exports = router;