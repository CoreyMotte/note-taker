const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8001;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.listen(port);
console.log(`Server started at http://localhost:${port}`);