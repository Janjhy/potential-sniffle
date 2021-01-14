const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = './src/data/names.json';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/dist/'));

//Init the server.
const server = app.listen(process.env.PORT, function () {
  console.log("Running on port", server.address().port);
});

//Simple API which returns information from the included names.json file
app.get('/names', (req, res) => {
  fs.readFile(path, 'utf8',(err, data) => {
    if (err) {
      throw err;
    } else {
      const parsedData = JSON.parse(data)
      if(parsedData.names) res.send(parsedData.names);
    }
  })
});

