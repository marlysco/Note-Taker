//Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');
const generateUniqueId = require('generate-unique-id')

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


fs.readFile('db/db.json', 'utf8', (err, data) => {
    
    if (err) throw err;
    
// Data
const notes = JSON.parse(data);
    
    
//Routing

//HTML Routes

app.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

// Display index.html when all other routes are accessed
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
}); 

//API Routes

//GET requests
//Show all the existing notes in the note.html
app.get('/api/notes', (req, res) => {
        return res.json(notes);
        });
//Show a selected note with an specific id   
app.get('/api/notes/:id', (req, res)=>{
res.json(notes[req.params.id]);
});


//POST request
app.post('/api/notes', (req, res) => {
    var newNote=[];
    const id = generateUniqueId();
    newNote.push(id);
    newNote.push(req.body);
    res.json(newNote);
    writeDB();
  })

//DELETE
// Delete a note with an specific id
    app.delete('/api/notes/:id', (req, res)=>{
        notes.splice(req.params.id,1);
        writeDB();
    });
    
    
// UpdateDB function
    const writeDB =() => {
        fs.writeFile('db/db.json',JSON.stringify(newNote,'\t'), err => {
            if (err) throw err;
            return true; 
        })
    }
    
    
    })
    
    
    
    
