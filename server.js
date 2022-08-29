const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { notDeepEqual } = require("assert");
const res = require("express/lib/response");
const { get } = require("express/lib/response");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./public"));

app.get("/api/notes", (req, res) => {
  readFile("./db/db.json", "utf8").then((data) => {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  readFile("./db/db.json", "utf8")
    .then((data) => {
      const freshNote = [].concat(JSON.parse(data));
      note.id = freshNote.length + 1;
      freshNote.push(note);
      return freshNote;
    })
    .then((notes) => {
      writeFile("./db/db.json", JSON.stringify(notes));
      res.json(note);
    });
});

app.delete("/api/notes/:id", (req, res) => {
  const removeNote = req.body;
  const deleteById = notes.filter(
    (removeNote) => removeNote.id !== req.params.id
  );
  const notes = JSON.parse(FS.readFile("./db/db.json"));
  fs.writeFile("./db/db.json", JSON.stringify(deleteById));
  res.json;
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
