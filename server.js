const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = './data.users.json';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/dist/'));

//Init the server.
const server = app.listen(process.env.PORT || 8080, function () {
  console.log("Running on port", server.address().port);
});

//Simple API which returns information from the included names.json file

app.get('/names', (req, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      handleError(res, err.message, "Failed to read names.");
    } else {
      res.json(data);
    }
  })
});

