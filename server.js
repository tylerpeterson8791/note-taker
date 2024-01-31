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
//THIS PROJECT DOESN'T LOOK LIKE I NEED TO BUILD ROUTES
//IF I DO PUT app.use(routes) HERE

// Routing
// SEND / TO INDEX.  THIS MIGHT NOT EVEN BE NECESSARY
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//Linking notes to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', injectData, (req, res) => {
    ///API GET REQUEST OF NOTES. LINES 31-37 IN INDEX.JS
    const data = req.database.db;
    res.json(data);
});


//catch all redirected to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Routing (POST)
app.post('/api/notes', injectData, (req, res) => {
    ///HERE'S WHERE THE POST LOGIC GOES FOR API.  LINES 39-46 IN INDEX.JS
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
    //res with the new notes with the entry added
    res.json(notes)
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
    //DELETE LOGIC GOES HERE. LINES 48-54 IN INDEX.JS!!!!!!!
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
                //redirect them to the /notes page again so it refreshes with updated db on left side after record is removed
                res.redirect('/notes');
                return;
            }
        });
    } 
});


// STARTS UP THE SERVER
app.listen(PORT, () =>
    console.log(`Server running.  Click here: http://localhost:${PORT}`)
);











/*
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page

WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column

WHEN I enter a new note title and the note’s text
THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page

WHEN I click on the Save button
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear

WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column and a "New Note" button appears in the navigation

WHEN I click on the "New Note" button in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears

I googled "How to create unique ID in java" into google and got this.  Make sure to credit: 

First page found that sent me down rabbit hole
https://stackoverflow.com/questions/2982748/create-a-guid-uuid-in-java
Official NPM Page
https://www.npmjs.com/package/uuidv4

Filter Method
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

res.redirect()
https://masteringjs.io/tutorials/express/redirect


*/
