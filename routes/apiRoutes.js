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
        storeData.push(req.body);

        // Adding the updated notes into db.json file
        fs.writeFileSync("./db/db.json", JSON.stringify(storeData), function (err) {
            if (err) throw err;
        });

        // Return new note for user
        res.json(req.body)
    });

    // Deleting array of note data from db.json file
    app.delete("/api/notes/:id", function (req, res) {

        // Empty out the arrays of data
        storeData.splice(req.params.id, 1)

        // Adding the updated notes into db.json file
        fs.writeFileSync("./db/db.json", JSON.stringify(storeData), function (err) {
            if (err) throw err;
        });
        res.json(storeData);
    });

};