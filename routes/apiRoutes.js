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
        let newNote = req.body;
        newNote['id'] = Date.now();
        storeData.push(newNote);

        // Adding the updated notes into db.json file
        fs.writeFile("./db/db.json", JSON.stringify(storeData), function (err) {
            if (err) throw err;
        });

        // Return new note for user
        res.json(newNote);
    });

    // Deleting array of note data from db.json file
    app.delete("/api/notes/:id", function (req, res) {
        var chosen = req.params.id;
        fs.readFile("./db/db.json", function (err, data) {
            if (err) throw err;
            var jsonData = JSON.parse(data);
            const toDelete = jsonData.find(note => {
                return note.id == chosen;
            });
            const index = jsonData.indexOf(toDelete);
            jsonData.splice(index, 1);
            
            // Adding the updated notes into db.json file
            fs.writeFile("./db/db.json", JSON.stringify(jsonData), function (err) {
                if (err) throw err;
            });
            res.json(storeData);
        });
    });
};