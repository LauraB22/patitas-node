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

app.get("/citas", (req, res) =>{
    const sql = "select * FROM cita";
    db.query(sql, (err,result) =>{
        res.send(result);
    })
})

app.post("/empleados", (req, res) =>{
    // const id=req.params.id;
    const email = req.body.email;
    const password = req.body.password;
    const sql = "select * from empleado where Correo_Empleado=? and Contraseña_Empleado=?";
    db.query(sql,[email,password], (err,result) =>{
        res.send(result);
    })
})

app.get("/empleado/:id", (req, res) =>{
    const id=req.params.id;
   const sql = "select * from empleado where Id_Empleado=?";
   db.query(sql,[id], (err,result) =>{
       res.send(result);
   })
})

app.get("/producto/:categoria", (req,res) => {
    const categoria = req.params.categoria;
    const sql = "select * from producto where Categoria=?";
    db.query(sql,[categoria], (err,result)=>{
        res.send(result);
    })
})

app.get("/productoSucursal/:idProducto", (req, res) =>{
    const idProducto = req.params.idProducto;
    const sql = "select Nombre_Producto, precio, Categoria, Especie, Imagen_Produc, Nombre_Sucursal from productosucursal inner join producto on productosucursal.id_producto = producto.Id_Producto join sucursal on productosucursal.id_sucursal = sucursal.Id_Sucursal where producto.Id_Producto=?";
    db.query(sql, [idProducto], (err, result) =>{
        res.send(result);
    })
})

app.get("/sucursales", (req,res) => {
    const sql = "select * from sucursal";
    db.query(sql,(err, result) => {
        res.send(result);
    })
})

app.get("/sucursalempleado/:especialidad", (req, res) =>{
    const especialidad = req.params.especialidad;
    const sql = "select Nombre_Empleado, Apellido1_Empleado, Apellido2_Empleado, Telefono_Empleado, Especialidad, Nombre_Sucursal from sucursalempleado inner join empleado on sucursalempleado.id_empleado = empleado.Id_Empleado join sucursal on sucursalempleado.id_sucursal = sucursal.Id_Sucursal where empleado.Especialidad=?";
    db.query(sql,[especialidad], (err, result) =>{
        res.send(result);
    })
})

app.post("/usuario", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sql = "select * from usuario where Correo_Usuario=? and Password_Usuario=?";
    db.query(sql, [email, password], (err, result) =>{
        res.send(result);
    })
})

app.get("/mascota/:id", (req, res) =>{
    const id = req.params.id;
    const sql = "select * from mascota where Id_usuario=?";
    db.query(sql,[id], (err,result) =>{
        res.send(result);
    })
})

app.get("/expediente/:id", (req, res)=>{
    const id = req.params.id;
    const sql = "select Fecha_Cita, id_sucursal, id_expediente from expediente inner join cita on expediente.id_cita = cita.Id_Cita where id_mascota=?";
    db.query(sql, [id], (err, result) =>{
        res.send(result);
    })
})

app.get("/ticket/:id", (req,res) =>{
    const id=req.params.id;
    const sql = "select * from ticket where Id_usuario=?";
    db.query(sql,[id], (err, result) =>{
        res.send(result);
    })
})

app.get("/ticketProducto/:idTicket", (req, res) =>{
    const idTicket = req.params.idTicket;
    const sql = "select * from ticketproducto inner join producto on ticketproducto.id_producto = producto.Id_Producto where id_ticket=?";
    db.query(sql, [idTicket], (err, result) =>{
        res.send(result);
    })
})

app.patch("/elimProductos", (req, res) =>{
    const stock = req.body.stock;
    const Producto = req.body.Producto;
    const sql = "update producto set Stock =? where Nombre_Producto =?";
    db.query(sql, [stock, Producto], (err, result) =>{
        res.send(result);
    })
})

app.listen(PORT, () => {
    console.log('Corriendo 8080');
});