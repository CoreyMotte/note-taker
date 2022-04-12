const express = require('express');
const fs = require('fs');
const path = require('path');

let noteList = require('./db/db.json');

const app = express();
const port = process.env.PORT || 8001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

class Note {
    constructor(title, text) {
        Note.lastId++;
        this.id = Note.lastId;
        this.title = title;
        this.text = text;
    }
}

Note.lastId = 0;

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'db/db.json'))
});

app.post('/api/notes', function(req, res) {  
    let note = new Note(req.body.title, req.body.text);
    noteList.push(note);
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(noteList), err => {});
    res.json(note);
});

app.listen(port);
console.log(`Server started at http://localhost:${port}`);