const express = require("express");
const app = express();
const database = require("./database");

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("<h>Hey this home page of notes app</h>");
})

app.get("/date",(req, res) =>{
    res.send(`<h1>${Date()}</h1>`);  // dynamic html
});   // move the static one down cause to make which ever meets the crietira is executed

app.get("/html", (req, res)=>{
    res.render("index.ejs",{
        noOfIterations : 20     // passing the data for to use in index.ejs
    });
});



app.get("/notes", (req, res)=>{
    const searchTerm = req.query.searchTerm;
    const notes = database.getNotes(searchTerm);
    res.render("notes.ejs",{
        notes,      // since the key and value have same names
    });
});

app.get("/notes/:id", (req, res) =>{
    const id = +req.params.id;           // adding a + prefix to a string js will try to read it as a number.
    //const note = notes.find(note => note.id === id);   // finding the note which has the id as entered
   // res.send(note); // rathr create a new ejs for a single note

   const note = database.getNote(id);

   // if no note of requested id is found then 404 error
   if(!note){
    res.status(404).render("note404.ejs");
    return //as further execution should not occur in case of this.
   }
   res.render("singleNote.ejs",{
    note,
   });
});

// to create a note
app.get("/createNote",(req, res)=>{
    res.render("createNote.ejs");
});

// adding form data
app.post("/createNotes",(req, res) =>{
    let data = req.body;
     data = database.addNote(data);
    // res.send(data); to show the added note
    res.redirect("/notes");
})

app.post("/notes/:id/delete",(req, res)=>{
    const id = +req.params.id;
    database.deleteNote(id); 
    res.redirect("/notes");
})

app.use(express.static("public"));  // with this we will be able to access the html and css and any img or any data in the folder public by just /filename in url at end after 8080
// but using this way we get only static html , like hardcoded ones we cant get thngs which are created by server.

const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`this notes app is listengin at http://localhost:${PORT}`);
})