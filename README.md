# Logo Maker
  
  ## Description
  
  My motivation for this project was to make a note taking web application.  Quick notes can be created, stored, pulled back up for editing and deleted.

  This project was a great lesson in routing and using express to alter a database.
  
  
  ## Installation
  
  We were provided the user side of the code for this project and were tasked with writing the code for the back-end to make it functional.

  The first step was setting up my routes and inplementing my server.js file.  I used middleware called InjectData to access the database for altering.

  The first get request was pretty straighforward and is written to get the entire db.

  The post request takes the user input of a new note (both Title and Text) then adds it to the existing database.

  This was my first time writing a DELETE request so this part was a bit trickier.  After looking at the front end code I realized that in order to accomplish this I had to give each note a unique ID so it could be identified and deleted properly.

  After some research I discovered the UUID NPM.  After installing this I added it to the POST request as well as the DELETE request.  Then for the DELETE section I used the .filter() method to identify the requested delete and keep everything that wasn't requested as a delete.  Then as a percaution I made sure that the new notes list was smaller than the original one and re-wrote the db.

  THIS IS THE DEPLOYED SITE https://note-taker-8791-e764898c16cc.herokuapp.com/

  ## Usage
  
  The user begins they start at a simple landing page with a single "Get Started" button that will re-direct them to the Note Taker page itself (./notes)
  
 ![NoteTakerLanding](https://github.com/tylerpeterson8791/note-taker/assets/75902133/001d3aa1-4e15-4902-93b0-e505fdfaa296)


  Once there on the right side of the screen there's empty fields for a Title and the Text for the notes.  After both fields have something in them a "Save Note" button appears allowing the user to add it to the database.
 
 ![NoteTakerAppPage](https://github.com/tylerpeterson8791/note-taker/assets/75902133/03def81e-cd17-4f23-b8b9-56bffb1fda20)

  Any saved notes appear on the left hand side of the page with a Delete (trashcan) button for each individual button.  This allows the user to remove each individual note once it's no longer needed.

  ## Credits

  There’s a few resources I referenced during the course of creating this project.  

  When trying to figure out a way to make unique IDs efficiently, this was the first page found that sent me down rabbit hole
  https://stackoverflow.com/questions/2982748/create-a-guid-uuid-in-java
  
  This is the official NPM Page for UUID.  This page is great, super easy to follow and implement.
  https://www.npmjs.com/package/uuidv4

  Then I needed a way to target the IDs so I found this page on the Filter Method.
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter //

  Finally a big thanks for my instructor Gary for explaining things so well in class and for extending the deadline of this project to 2/2!
