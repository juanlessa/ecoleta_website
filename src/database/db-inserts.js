const db = require("./db")
//function to create places table
function createTables() {
    db.serialize(() => {
        // create table
        db.run(`
            CREATE TABLE IF NOT EXISTS places (
                id          INTEGER     PRIMARY KEY AUTOINCREMENT,
                image       TEXT,
                name        TEXT,
                address     TEXT,
                address2    TEXT,
                state       TEXT,
                city        TEXT,
                items       TEXT
            );
        `)
    })
}
// function to insert data into places table
function InsertIntoPlaces(image, name, address, address2, state, city, items) {
    const query = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`
    const value = [image, name, address, address2, state, city, items]
    function afterImsert(err){
        if (err){
            console.log(err)
            return res.send("erro no cadastro")
        }
        console.log("cadastrado com sucesso")
        console.log(this)
    }
    db.run(query, value, afterImsert)
}

//create places table
createTables()
//insert data
InsertIntoPlaces("https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80", "Recishow", "rua Barão do Triunfo", "Numero 756, segundo andar", "Rio de Janeiro", "Duque de Caxias", ["Pilhas e Baterias", , "Resíduos Eletrônicos"])
InsertIntoPlaces("https://images.unsplash.com/photo-1525695230005-efd074980869?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", "Terra Nostra", "rua Itapolis", "Numero 1400", "Rio Grande do Norte", "Natal", ["Lâmpadas", "Pilhas e Baterias", "Papéis e Papelão", "Óleo de Cozinha"])
InsertIntoPlaces("https://images.unsplash.com/photo-1528323273322-d81458248d40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1401&q=80", "Recicle Posto 15", "rua Itaipu", "Numero 253", "Mato Grosso", "Alta Floresta", ["Resíduos Eletrônicos"])
InsertIntoPlaces("https://images.unsplash.com/photo-1604631698209-c105c7874ea8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=659&q=80", "Colectoria", "rua João de Barro", "Numero 70", "Santa Catarina", "Rio do Sul", ["Resíduos Orgânicos"])
InsertIntoPlaces("https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", "ColeTania", "rua Dr Borges", "Numero 515", "Minas Gerais", "Bandeira do Sul", ["Óleo de Cozinha", "Resíduos Orgânicos", "Resíduos Eletrônicos"])
