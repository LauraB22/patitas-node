const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require("mysql");

const PORT = process.env.PORT || 3001;
//usamos una constante para el puerto de conexion en caso de que este en modo de produccion (Heroku)y obtenga el puerto del mismo servidor 
//o en caso de que este en modo de desarrollo usamos nuestro propio puerto (nodemon)

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

app.post("/patitas2", (req, res) =>{
    // const id=req.params.id;
    const email = req.body.email;
    const password = req.body.password;
    const sql = "select * from empleado where Correo_Empleado=? and Contraseña_Empleado=?";
    db.query(sql,[email,password], (err,result) =>{
        res.send(result);
    })
})

app.get("/patitas3/:id", (req, res) =>{
     const id=req.params.id;
    const sql = "select * from empleado where Id_Empleado=?";
    db.query(sql,[id], (err,result) =>{
        res.send(result);
    })
})

app.listen(PORT, () => {
    console.log('Corriendo 8080');
});