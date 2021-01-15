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
//Gets all names in json
app.get('/names', (req, res) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const parsedData = JSON.parse(data)
      if (parsedData.names) res.send(parsedData.names);
    }
  })
});

//Gets amount of names for specific name parameter
app.get('/names/:search?', (req, res) => {
  const nameParam = req.query.name;
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      throw err
    } else {
      //Check if query parameter exists
      if (nameParam === undefined || nameParam.length < 1) return res.send('No search parameter.')

      //Parse data and try to find if search parameter exists as name in data then return result
      //or return no data found.
      const parsedData = JSON.parse(data)
      const result = parsedData.names.find(val => (val.name === nameParam))
      if (result !== undefined) {
          return res.send('The amount for name ' + result.name + ' is: ' + result.amount.toString());
      }
      res.send('No data found for: ' + nameParam)
    }
  })
})

