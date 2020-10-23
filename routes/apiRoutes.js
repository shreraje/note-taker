// LOAD DATA
var fs = require("fs");
var path = require("path");
var storeData = require("../db/db.json");

// ROUTING
module.exports = function (app) {

    // API GET Requests
    app.get("/api/notes", function (req, res) {
        res.json(storeData);
        console.log(storeData);
    });

    // API POST Requests
    app.post("/api/notes", function (req, res) {

        // Adding id to each note
        let newNote = req.body;
        newNote['id'] = Date.now();
        storeData.push(newNote);

        // Adding the updated notes into db.json file
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(storeData), function (err) {
            if (err) throw err;
        });

        // Return new note for user
        res.json(newNote);
    });

    // Deleting array of note data from db.json file
    app.delete("/api/notes/:id", function (req, res) {
        storeData = storeData.filter((note) => note.id != req.params.id);

        // Adding the updated notes into db.json file
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(storeData), function (err) {
            if (err) throw err;
        });
        res.json({ ok: true });
    });
};