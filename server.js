const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors())
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// PLACEHOLDER FOR SAPLING ENDPOINT

const SAPLING_API_URL = 'https://api.sapling.ai';
const API_KEY = 'AR46FO1Z1P4KMK17RZ6XVO6ZAUFPW9SG';

app.post('/sapling/*', (req, res, next) => {
  // remove the '/sapling/' prefix from the request path
  let requestPath  = req.path.substring(8);
  // pass request path along to Sapling
  let requestUrl = `${SAPLING_API_URL}${requestPath}`;
  // add the API Key
  req.body.key = API_KEY;
  axios({
    url: requestUrl,
    data: req.body,
    method: 'post',
  })
  .then(function (response) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response.data));
  });
})

// You can change default port but make sure to change for frontend `endpointHostname` as well
const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);