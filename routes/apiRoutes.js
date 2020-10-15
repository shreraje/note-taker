// LOAD DATA

var fs = require("fs");
var storeData = require("../db/db.json");
const { notEqual } = require("assert");


// ROUTING

module.exports = function (app) {

    // API GET Requests

    app.get("/api/notes", function (req, res) {
        res.json(storeData);
    });
};
