require('dotenv').config();
const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const SCOPES = ['https://www.googleapis.com/auth/presentations'];
const slides = google.slides('v1');

const BASE_URL = "https://slides.googleapis.com";


// set auth as a global default
google.options({
    auth: oauth2Client
});

const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
   
    // If you only need one scope you can pass it as a string
    scope: SCOPES
});

module.exports = {oauth2Client, url};