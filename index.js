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

app.post("/generarCita/:idExpediente", (req, res) =>{
    const FechaCita = req.body.FechaCita;
    const idExpediente = req.params.idExpediente;
    const service = req.body.service;
    const tamMasc = req.body.tamMasc
    const sql = "insert into cita(Fecha_Cita, Id_Expediente, servicio, TamMascota) values (?, ?, ?, ?)";
    db.query(sql, [FechaCita, idExpediente, service, tamMasc],(err, result) =>{
        res.send(result);
    })
})

app.patch("/editarCita/:idExpediente", (req, res) =>{
    const fechaCita = req.body.fechaCita;
    const servicio = req.body.servicio
    const idExpediente = req.params.idExpediente;
    const sql = "update cita set Fecha_cita = ?, servicio =? where Id_Cita = ?";
    db.query(sql, [fechaCita, servicio, idExpediente], (err, result)=>{
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

app.get("/empleado/:email/:password", (req, res) =>{
    const email=req.params.email;
    const password=req.params.password;
   const sql = "select * from empleado where Correo_Empleado=? and Contraseña_Empleado=?";
    db.query(sql,[email, password], (err,result) =>{
        res.send(result);
    })
})

app.get("/producto", (req,res) => {
    const categoria = req.params.categoria;
    const sql = "select * from producto ";
    db.query(sql,[categoria], (err,result)=>{
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

app.get("/empleados/especialidad/:especialidad", (req, res) =>{
    const especialidad = req.params.especialidad;
    const sql = "select Nombre_Empleado, Especialidad, Apellido1_Empleado, Apellido2_Empleado, Telefono_Empleado, Correo_Empleado from empleado where Especialidad = ?";
    db.query(sql,[especialidad], (err, result) =>{
        res.send(result);
    })
})

app.get("/empleado/sucursal/:sucursal", (req, res) =>{
    const sucursal = req.params.sucursal;
    const sql = "select Nombre_Sucursal,Nombre_Empleado, Especialidad, Apellido1_Empleado, Apellido2_Empleado, Telefono_Empleado, Correo_Empleado from empleado inner join sucursal on empleado.Id_sucursal = sucursal.Id_Sucursal where sucursal.Nombre_Sucursal = ?";
    db.query(sql,[sucursal], (err, result) =>{
        res.send(result);
    })
})

app.post("/crearUsuario", (req, res)=>{
    const nombreUsuario = req.body.nombreUsuario;
    const apellido1 = req.body.apellido1;
    const apellido2 = req.body.apellido2;
    const correo = req.body.correo;
    const password = req.body.password;
    const calle = req.body.calle;
    const numext = req.body.numext;
    const numint = req.body.numint;
    const delegacion = req.body.delegacion;
    const ciudad = req.body.ciudad;
    const CP = req.body.CP;
    const MetodoPago = req.body.MetodoPago;
    const NumTarjeta = req.body.NumTarjeta;
    const Telefono = req.body.Telefono;
    const sql = "INSERT INTO usuario(Nombre_Usuario, Apellido1_Usuario, Apellido2_Usuario, Correo_Usuario, Password_Usuario, Calle_Usuario, Num_ext_Usuario, Num_int_Usuario,Delegacion_Usuario, Ciudad_Usuario, CP_Usuario, Metodo_Pago, Num_Tarjeta, Telefono_Usuario) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(sql, [nombreUsuario, apellido1, apellido2, correo, password, calle, numext, numint, delegacion, ciudad, CP, MetodoPago, NumTarjeta, Telefono], (err, result)=>{
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
app.get("/usuarioId/:email/:password", (req, res) =>{
    const email = req.params.email;
    const password = req.params.password;
    const sql = "select * from usuario where Correo_Usuario=? and Password_Usuario=?";
    db.query(sql, [email,password], (err, result) =>{
        res.send(result);
    })
})
// app.get("/usuarioId/:idUsuario", (req, res) =>{
//     const idUsuario = req.params.idUsuario;
//     const sql = "select Id_Usuario, Nombre_Usuario, Apellido1_Usuario, Apellido2_Usuario from usuario where Id_Usuario=?";
//     db.query(sql, [idUsuario], (err, result) =>{
//         res.send(result);
//     })
// })

app.get("/mascota/:id", (req, res) =>{
    const id = req.params.id;
    const sql = "select * from mascota where Id_usuario=?";
    db.query(sql,[id], (err,result) =>{
        res.send(result);
    })
})

app.get("/expediente/:id", (req, res)=>{
    const id = req.params.id;
    const sql = "select * from expediente where id_mascota=?";
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

app.patch("/elimProductos", (req, res) =>{ //Cambiar el stock de los productos
    const stock = req.body.stock;
    const Producto = req.body.Producto;
    const sql = "update producto set Stock =? where Nombre_Producto =?";
    db.query(sql, [stock, Producto], (err, result) =>{
        res.send(result);
    })
})

app.post('/creaProducto', (req,res)=>{
    const nombreProducto = req.body.nombreProducto;
    const precio = req.body.precio;
    const descrip = req.body.descrip;
    const categoria = req.body.categoria;
    const Especie = req.body.Especie;
    const Stock = req.body.Stock;
    const imagen = req.body.imagen;
    const sql = "INSERT INTO producto(Nombre_Producto, precio, Descripcion, Categoria, Especie, Stock, Imagen_Produc) VALUES(?,?,?,?,?,?,?)";
    db.query(sql, [nombreProducto, precio, descrip, categoria, Especie, Stock, imagen], (err, result) =>{
        res.send(result);
    })
})

app.patch("/editarProduct/:nombreProd", (req, res) =>{
    const precio = req.body.precio;
    const nombreProd = req.params.nombreProd;
    const sql = "update producto set precio = ? where Nombre_Producto = ?";
    db.query(sql, [precio, nombreProd], (err,result)=>{
        res.send(result);
    })
})

app.delete('/elimEmpleado', (req, res)=>{
    const nombreEmp = req.body.nombreEmp;
    const apellido1 = req.body.apellido1;
    const sql = "delete from empleado where Nombre_Empleado = ? and Apellido1_Empleado = ?";
    db.query(sql, [nombreEmp, apellido1], (err, result) =>{
        res.send(result);
    })
})

app.post('/crearEmpleado', (req, res) =>{
    const idSucursal = req.body.idSucursal;
    const NombreEmpl = req.body.NombreEmpl;
    const Apellido1 = req.body.Apellido1;
    const Apellido2 = req.body.Apellido2;
    const telefono = req.body.telefono;
    const especialidad = req.body.especialidad;
    const cargo = req.body.cargo;
    const correo = req.body.correo;
    const pass = req.body.pass;
    const horarioEntrada = req.body.horarioEntrada;
    const horarioSalida = req.body.horarioSalida;
    const sql = "insert into empleado(Id_sucursal, Nombre_Empleado, Apellido1_Empleado, Apellido2_Empleado, Telefono_Empleado, Cargo_Empleado, Especialidad, Correo_Empleado, Contraseña_Empleado, Horario_entrada_Empleado, Horario_salida_Empleado) VALUES (?,?,?,?, ?, ?,?, ?, ?, ?, ?)";
    db.query(sql, [idSucursal, NombreEmpl, Apellido1, Apellido2, telefono, especialidad, cargo, correo, pass, horarioEntrada, horarioSalida], (err, result)=>{
        res.send(result);
    })
})


app.post("/patitas/comments", async function(req, res){
    const email = req.body.email;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "correo@hotmail.com",
            pass:  "", 
        },
    });

    await transporter.sendMail({
        from: '"PATITAS MEXICO 💙" <contacto@isia.com.mx>', // sender address
        to: `${email}`, // list of receivers
        subject: "RECUPERACION DE CONTRASEÑA", // Subject line
        html: `
            <img 
                sizes = 50px 50px 
                src="/img/etc.png" 
                alt="Logo ISIA" 
            />
            <h1>Informacion sobre Pagina web</h1>
            <p><b>Nombre: </b>${name}</p>
            <hr/>
            <p><b>Telefono: </b>${phone}</p>
            <hr/>
            <p><b>Correo: </b>${mail}</p>
            <hr/>
            <p><b>Asunto: </b>${text}</p>
            <hr/>
            <a href="isia.com.mx">
                <img 
                    className='login__logo'
                    src="http://drive.google.com/uc?export=view&id=1PWTi1EVTqXOfg3NyYzeVsuPWC53Lj8cf" 
                    alt="Logo ISIA" 
                />
            </a>`
        , // html body
    });
});



app.listen(PORT, () => {
    console.log('Corriendo 3001');
});