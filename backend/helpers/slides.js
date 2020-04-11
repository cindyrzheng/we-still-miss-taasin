const express  = require('express');
const mongoose = require('mongoose');
const {google} = require('googleapis');
const urljoin  = require('url-join');
const axios    = require('axios');
const fs       = require('fs');

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
function listSlides(auth) {

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
}

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

router.get('/create', (req,res) => {

    var url = urljoin(BASE_URL, "v1", "presentations");
    
    var slideName = req.query.name;
    console.log("Creating new presentation named: " + slideName);

    var options = {
        'method': 'post',
        'url': url,
        'auth': {
            "Bearer": token
        },
        'data': {
            "presentationId": slideName,
            "title": slideName
        }
    };

    axios(options)
    .then(res => {
        console.log("hi");
        console.log(res);
    })
    .catch(err => {
        console.log("hi2");
        console.log(err.response.data);
    });

    
    res.send(slideName);
});

module.exports = router;