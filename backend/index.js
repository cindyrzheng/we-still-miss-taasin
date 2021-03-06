require('dotenv').config({ 'path': __dirname + '/.env' })

const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const fs         = require('fs');
var opener       = require("opener");

const db    = require('./helpers/db');
// const auth  = require('./helpers/auth');
// const slides = require("./helpers/slides");
const auth = require('./helpers/auth');

const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(multer({ dest: '../photos/',
//   rename: function (fieldname, filename) {
//     return filename;
//   },
//  }));

app.get('/permission', (req, res) => {
  try {
    opener(auth.url);
    res.send(auth.url);
  } catch (error) {
    console.log(error);
  }
});

app.get('/oauth', async(req, res) => {
  // callback to register tokens
  const {tokens} = await auth.oauth2Client.getToken(req.query.code)
  auth.oauth2Client.setCredentials(tokens);

  res.sendFile(__dirname + '/close.html');
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


