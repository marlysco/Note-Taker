//Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');
const generateUniqueId = require('generate-unique-id');
const { v4: uuidv4 } = require('uuid');
const e = require('express');
const { allowedNodeEnvironmentFlags } = require('process');



//Set up Express App
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json()); 

//Set the initial port
const PORT = process.env.PORT || 8046;

//Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

//Class Note will be used to create new notes and add an unique ID
class Note {
    constructor (title, text) {
        this.title = title;
        this.text = text;
        this.id = uuidv4();
    }
}
    
//Routing
//HTML Routes
app.get("/notes", function(req, res){
    res.sendFile(`${__dirname}/public/notes.html`);
  });

// Display index.html when all other routes are accessed
app.get('/', function(req,res) {
    res.sendFile(path.join(`${__dirname}/public/index.html`));
}); 

//API Routes
//GET requests
//Show all the existing notes in the note.html
app.get('/api/notes', (req, res) => {
        fs.readFile(`${__dirname}/db/db.json`, (err, data) => {
            if (err) throw err;
            else res.send(data)
        });
    });

//Show a selected note with an specific id   
app.get('/api/notes/:id', (req, res) => {
   const id = req.params.id;
   res.json(notes[id]);

});


//POST requests
//Add note
app.post('/api/notes', (req, res) => {
        const allNotes=[]
        const newNote = new Note (req.body.title, req.body.text);
        //Get all the notes from the DB
        fs.readFile(`${__dirname}/db/db.json`, 'utf8', (err, data) => {
            if (err) throw err;
            else {
                JSON.parse(data).forEach((note) => {
                console.log(note);
                allNotes.push(note);
                });
                //Adding the new note to the rest of the array of Notes
               allNotes.push(newNote)
               console.log("All notes below")
               console.log(allNotes);
            }
        fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(allNotes), (err, data) => {
            if (err) throw err;
            else {
            console.log("Note Added!")
            };
        });
        res.redirect("/api/notes")
    });
  });

//DELETE
// Delete a note with an specific id
    app.delete('/api/notes/:id', (req, res)=>{
        notes.splice(req.params.id,1);
        writeDB();
    });
    
    
// UpdateDB function
    const writeDB =() => {
        fs.writeFile('db/db.json',JSON.stringify(notes,'\t'), err => {
            if (err) throw err;
            return true; 
        });
    };
    
    

    
    
    
    
