// LOAD DATA
var fs = require("fs");
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
        let note = req.body;
        note.id = Date.now();
        storeData.push(note);

        // Adding the updated notes into db.json file
        fs.writeFileSync("./db/db.json", JSON.stringify(storeData), function (err) {
            if (err) throw err;
        });

        // Return new note for user
        res.json(storeData);
    });

    // Deleting array of note data from db.json file
    app.delete("/api/notes/:id", function (req, res) {
        var toDelete = JSON.parse(fs.readFileSync('./db/db.json').toString());
        toDelete = toDelete.filter(function (note) {
            return note.id != req.params.id;
        });

        // Adding the updated notes into db.json file
        fs.writeFileSync("./db/db.json", JSON.stringify(toDelete), function (err) {
            if (err) throw err;
        });
        res.json({ ok: true });
    });
};