# NameAppTask

This project uses Angular for the web application. 
Node.js and Express is used for the mock server/api. It reads a json file and provides routes to fetch all data or by the name parameter.

## Running

Use 
`npm install`
and
`npm start`
to run the project. Unless you specify a port for the server, you can find the port logged to console and navigate to the according localhost address.

## Usage

Route
`/names` 
is used to fetch all data as a parsed json.

Route 
`/names/:search?=name`
Name is the parameter you want to search by. This is case sensitive. The return for this a simple string 
on your browser.

Route
`/`
leads to the we UI which displays the names.json data in a table and has options for sorting names by alphabet, or by amount(descending).
Total amount of all names is listed at the footer of the table.
