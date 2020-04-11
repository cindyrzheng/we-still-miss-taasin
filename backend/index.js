// require('dotenv').config({ 'path': __dirname + '/.env' })

const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/oauth', (req, res) => {
  // console.log(req);
  res.send(req.code);
});

app.get('/', (req, res) => {
    res.send("we-miss-taasin-backend");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server up!");
});
