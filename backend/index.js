require('dotenv').config({ 'path': __dirname + '/.env' })

const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const fs         = require('fs');

const db    = require('./helpers/db');
// const auth  = require('./helpers/auth');
// const slides = require("./helpers/slides");
const oauth2Client = require('./helpers/retry');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer({ dest: '../photos/',
//   rename: function (fieldname, filename) {
//     return filename;
//   },
//  }));

app.get('/oauth', async(req, res) => {
  const {tokens} = await oauth2Client.getToken(req.query.code)
  oauth2Client.setCredentials(tokens);
  res.send(req.query.code);
});

app.get("/token", (req, res) => {
  // Load client secrets from a local file.
  fs.readFile('./helpers/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Slides API.
    auth.authorize(JSON.parse(content));
  });

  res.send("Token!");
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

  app.listen(process.env.PORT || 3000, () => {
    console.log("Server up!");
  });
})();


