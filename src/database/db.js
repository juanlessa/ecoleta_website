const sqlite3 = require("sqlite3").verbose()

// create database
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db