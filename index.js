const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require("mysql");

const db = mysql.createPool({
    host: "us-cdbr-east-04.cleardb.com",
    user: "b120706c0b243f",
    password: "6aae98c9",
    database: "heroku_56f3c8517488514"
})


app.use(cors({
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.get("/patitas", (req, res) =>{
    const sql = "select * FROM cita";
    db.query(sql, (err,result) =>{
        res.send(result);
    })
})

app.get("/patitas2", (req, res) =>{
    const sql = "select * FROM empleado";
    db.query(sql, (err,result) =>{
        res.send(result);
    })
})


app.listen(8080, () => {
    console.log('Corriendo 8080');
});