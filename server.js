const express = require('express');
const fs = require('fs');
const path = require('path');
const injectData = require('./middleware/inject-database.js');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//Linking notes to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', injectData, (req, res) => {
    const data = req.database.db;
    res.json(data);
});


//catch all redirected to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Routing (POST)
app.post('/api/notes', injectData, (req, res) => {
    //Grab fetch request
    const data = req.body;
    //Declare variable for all notes
    const notes = req.database.db;
    //Declare variable for new note
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };
    //push new note into entire notes list
    notes.push(newNote);
    //reqrite the db file with the added entry
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error. File not saved' });
        } else {
            res.json({ message: "Note added successfully" });
        }
    })
});

// Routing (DELETE)
app.delete('/api/notes/:id', injectData, (req, res) => {
    //Grab params of wildcard and declare variable
    const noteIdToDelete = req.params.id;
    //Declare whole database
    const notes = req.database.db;
    // Filter out the note with the specified ID.  Pass on anything not equal to noteToDelete
    const newNotes = notes.filter(note => note.id !== noteIdToDelete);

    //make sure something was deleted
    if (newNotes.length < notes.length) {

        // Update db.json with the modified notes array
        fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error. File not deleted.' });
            } else {
                res.json({ message: "Note deleted successfully"});
                
            }
        });
    } 
});


// STARTS UP THE SERVER
app.listen(PORT, () =>
    console.log(`Server running.  Click here: http://localhost:${PORT}`)
);