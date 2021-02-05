const express = require("express")
const server = express()
const path = require('path');
// load batabase
const db = require("./database/db")
// configure nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// public folder
server.use(express.static('public'))
// enable req.body
server.use(express.urlencoded({extended: true}))

// application routes
// page home
server.get("/", (req, res) => {
    return res.render("index.html")
})
// page create point 
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})
// page seach results
server.get("/search-results", (req, res) => {
    const search = req.query.search
    if (search == ""){
        return res.render("search-results.html", { total: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err){
            return console.log(err)
        }
        return res.render("search-results.html", {places: rows, total: rows.length})
    })
    
})



// post methods
// create new point
server.post("/create-point", (req, res) => {
    // insert data
    const query = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`
    const value = [req.body.image, req.body.name, req.body.address, req.body.address2, req.body.state, req.body.city, req.body.items]
    function afterImsert(err){
        if (err){
            console.log(err)
            return res.send("erro no cadastro")
        }
        console.log("cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }
    db.run(query, value, afterImsert)
})


// start server
server.listen(3000)