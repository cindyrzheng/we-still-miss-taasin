require('dotenv').config({ 'path': __dirname + '/.env' })

const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const fs         = require('fs');
const openurl    = require('openurl');

const db    = require('./helpers/db');
// const auth  = require('./helpers/auth');
// const slides = require("./helpers/slides");
const auth = require('./helpers/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer({ dest: '../photos/',
//   rename: function (fieldname, filename) {
//     return filename;
//   },
//  }));

app.get('/permission', (req, res) => {
  openurl.open(auth.url);
  res.send(auth.url);
});

app.get('/oauth', async(req, res) => {
  // callback to register tokens
  const {tokens} = await auth.oauth2Client.getToken(req.query.code)
  auth.oauth2Client.setCredentials(tokens);

  res.send("Authorized!");
});

// endpoints related to Slides
app.use('/slides', require('./helpers/slides'));

// endpoints to POST data
app.use('/rushee', require('./helpers/rushees'));

app.get('/', (req, res) => {
    res.send("we-miss-taasin-backend");
});

(async () => {
  const connection = await db.initDb();
  if (connection["Status"] == "Error") {
      console.log(connection["Message"]);
      return;
  }

  app.listen(process.env.PORT || 3005, () => {
    console.log("Server up!");
  });
})();


