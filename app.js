const express = require("express");
const app = express();
const path = require("path");

//Port
const PORT = process.env.PORT || 3000;

// express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//filesystem
const util = require("util");
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Routes

function init() {
  // HTML routes
  app.get(`/`, function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

  //API routes GET-POST-DELETE
  app.get("/api/notes", function(req, res) {
    readFileAsync("./db/db.json", "utf8").then(data => {
      let notesData = JSON.parse(data);
      return res.json(notesData);
    });
  });

  // create new note
  app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    readFileAsync("./db/db.json", "utf8").then(data => {
      console.log("You made a note!");
      
      let notesData = JSON.parse(data);
      if (notesData.length >= 1) {
        newNote.id = notesData[notesData.length - 1].id + 1;
      } else {
        newNote.id = 1;
      }
      notesData.push(newNote);
      writeFileAsync("./db/db.json", JSON.stringify(notesData), "utf8");
      res.json(true);
    

    });
  });

  delete note;
  app.delete(`/api/notes/:id`, function(req, res) {
    console.log("You deleted a note!");
    let deleteNote = parseInt(req.params.id);
    console.log(req.params.id);
    
    readFileAsync("./db/db.json", "utf8").then(data => {
      let notesData = JSON.parse(data);
      const removeIndex = notesData.findIndex(x => x.id === deleteNote);
      notesData.splice(removeIndex, 1);
      writeFileAsync("./db/db.json", JSON.stringify(notesData), "utf8");
      res.json(req.body);
    });
  });

  // Notes DATA
  // let noteIDs = [0];
  // let notesData = [
  //   {
  //     title: "Note 1",
  //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     id: 1
  //   },
  //   {
  //     title: "Note 2",
  //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     id: 2
  //   }
  // ];

  // PORT LISTEN
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
;
}

init();
