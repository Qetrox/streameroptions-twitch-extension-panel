const express = require('express');
const app = express();

app.use(express.static("public"));
app.use(express.json());

const fs = require('fs'),
    http = require('http'),
    https = require('https');

const options = {
    key: fs.readFileSync('./.ssl/privatekey.pem'),
    cert: fs.readFileSync('./.ssl/certificate.pem'),
};

let server = https.createServer(options, app).listen(443, function(){
    console.log("Express server listening on port " + 443);
});