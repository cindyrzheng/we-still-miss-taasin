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

/**
 * Get a single slide json request
 * @param {object} licenseData data about the license
 * @param {object} index the slide index
 * @return {object} The json for the Slides API
 * @example licenseData: {
 *            "licenseName": "mit",
 *            "percent": "12.5",
 *            "count": "1667029"
 *            license:"<body>"
 *          }
 * @example index: 3
 */
function createSlideJSON(licenseData, index) {
    // Then update the slides.
    const ID_TITLE_SLIDE = 'id_title_slide';
    const ID_TITLE_SLIDE_TITLE = 'id_title_slide_title';
    const ID_TITLE_SLIDE_BODY = 'id_title_slide_body';
  
    return [{
      // Creates a "TITLE_AND_BODY" slide with objectId references
      createSlide: {
        objectId: `${ID_TITLE_SLIDE}_${index}`,
        slideLayoutReference: {
          predefinedLayout: 'TITLE_AND_BODY'
        },
        placeholderIdMappings: [{
          layoutPlaceholder: {
            type: 'TITLE'
          },
          objectId: `${ID_TITLE_SLIDE_TITLE}_${index}`
        }, {
          layoutPlaceholder: {
            type: 'BODY'
          },
          objectId: `${ID_TITLE_SLIDE_BODY}_${index}`
        }]
      }
    }, {
      // Inserts the license name, percent, and count in the title
      insertText: {
        objectId: `${ID_TITLE_SLIDE_TITLE}_${index}`,
        text: `#${index + 1} ${licenseData.firstName}  — ~${licenseData.lastName})`
      }
    }, {
      // Inserts the license in the text body paragraph
      insertText: {
        objectId: `${ID_TITLE_SLIDE_BODY}_${index}`,
        text: licenseData.license
      }
    }, {
      // Formats the slide paragraph's font
      updateParagraphStyle: {
        objectId: `${ID_TITLE_SLIDE_BODY}_${index}`,
        fields: '*',
        style: {
          lineSpacing: 10,
          spaceAbove: {magnitude: 0, unit: 'PT'},
          spaceBelow: {magnitude: 0, unit: 'PT'},
        }
      }
    }, {
      // Formats the slide text style
      updateTextStyle: {
        objectId: `${ID_TITLE_SLIDE_BODY}_${index}`,
        style: {
          bold: true,
          italic: true,
          fontSize: {
            magnitude: 10,
            unit: 'PT'
          }
        },
        fields: '*',
      }
    }];
}

const SLIDE_TITLE_TEXT = 'Open Source Licenses Analysis';

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

    const allSlides = docs.map((data, index) => createSlideJSON(data, index+1));
    slideRequests = [].concat.apply([], allSlides); // flatten the slide requests
    slideRequests.push({
      replaceAllText: {
        replaceText: SLIDE_TITLE_TEXT,
        containsText: { text: '{{TITLE}}' }
      }
    })


    // for (let i = 0 ; i < docs.length; i++){
        // let obj = {
        //     "createSlide": {
        //         "objectId": i,
        //         "slideLayoutReference": {
        //         "predefinedLayout": "TITLE_AND_TWO_COLUMNS"
        //         },
        //         "placeholderIdMappings": [
        //             {
        //                 "layoutPlaceholder": {
        //                     "type": "TITLE",
        //                     "index": 0
        //                 },
        //                 "objectId": "NAME",
        //             },
        //         ],
        //     },
        //     "insertText": {
        //         "objectId": "NAME",
        //         "text": docs[i]["firstName"] + " " + docs[i]["lastName"],
        //     }
        // }

        
        // requests.push(obj);
    // }
    
    const hii = await slides.presentations.batchUpdate({
        "presentationId": presentationId, 
        "resource": {
            "requests": slideRequests
        }
    });
    console.log(presentationId);
    console.log(hii);

    res.send(slideName);
});

module.exports = router;