const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();
const db = path.join(__dirname, './db/db.json');

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

//LINKING THE NOTES.HTML PAGE
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    ///Logic goes here for API Get Request OF NOTES
});


//CATCH ALL REDIRECTED TO INDEX FOR NOW
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Routing (POST)
app.post('/api/notes', (req, res) => {
    ///HERE'S WHERE THE POST LOGIC GOES FOR API
});

// Routing (DELETE)
app.delete('/api/notes/:id', (req, res) => {
    //DELETE LOGIC GOES HERE.  DO SOME RESEARCH ON THIS
})

// STARTS UP THE SERVER
app.listen(PORT, () =>
    console.log(`Server running.  Click here: http://localhost:${PORT}`)
);











/*
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete

GIVEN a note-taking application
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
*/
