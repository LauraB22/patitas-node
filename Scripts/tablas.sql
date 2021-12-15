drop database `heroku_56f3c8517488514`;
create schema heroku_56f3c8517488514;
use heroku_56f3c8517488514;

set @@auto_increment_increment=1;
set @@auto_increment_offset=1;

CREATE TABLE `cita` (
  `Id_Cita` INT NOT NULL auto_increment,
  `Fecha_Cita` DATETIME NOT NULL,
  PRIMARY KEY (`Id_Cita`))
ENGINE = InnoDB;

CREATE TABLE `empleado` (
  `Id_Empleado` INT NOT NULL AUTO_INCREMENT,
  `Nombre_Empleado` varchar(45) NOT NULL,
  `Apellido1_Empleado` varchar(45) NOT NULL,
  `Apellido2_Empleado` varchar(45) NOT NULL,
  `Telefono_Empleado` varchar(45) NOT NULL,
  `Especialidad` varchar(45) not null check(Especialidad in ('Perros y gatos', 'Reptiles', 'Aves', 'Peces', 'Mamiferos', 'Ninguna')),
  `Cargo_Empleado` varchar(45) NOT NULL check(Cargo_Empleado in ('Veterinario', 'Secretario', 'Finanzas', 'Gerente')),
  `Correo_Empleado` varchar(45) NOT NULL check(Correo_Empleado like '%@%'),
  `Contraseña_Empleado` varchar(45) NOT NULL check(length(Contraseña_Empleado) > 5),
  `Horario_entrada_Empleado` time NOT NULL,
  `Horario_salida_Empleado` time NOT NULL,
  PRIMARY KEY (`Id_Empleado`),
  UNIQUE KEY `Correo_Empleado_UNIQUE` (`Correo_Empleado`)
);

CREATE TABLE `mascota` (
  `Id_Mascota` INT NOT NULL AUTO_INCREMENT,
  `Id_usuario` INT NOT NULL,
  `Nombre_Mascota` varchar(45) NOT NULL,
  `Especie_Mascota` varchar(45) NOT NULL check(Especie_Mascota in ('Perros', 'Gatos', 'Reptiles', 'Aves', 'Peces', 'Mamiferos')),
  PRIMARY KEY (`Id_Mascota`),
  FOREIGN KEY (`Id_usuario`) REFERENCES `usuario` (`Id_Usuario`)
);

CREATE TABLE `producto` (
  `Id_Producto` int NOT NULL auto_increment,
  `Nombre_Producto` varchar(100) NOT NULL,
  `precio` float unsigned NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `Categoria` varchar(45) NOT NULL check (Categoria in ('Alimentos', 'Juguetes', 'Cuidados')),
  `Especie` varchar(45) NOT NULL check(Especie in ('Perros', 'Gatos', 'Reptiles', 'Aves', 'Peces', 'Mamiferos')),
  `Stock` int NOT NULL,
  `Imagen_Produc` varchar(200) NOT NULL,
  PRIMARY KEY (`Id_Producto`)
);

CREATE TABLE `sucursal` (
  `Id_Sucursal` INT NOT  NULL AUTO_INCREMENT,
  `Nombre_Sucursal` varchar(45) NOT NULL,
  `Calle_Sucursal` varchar(45) NOT NULL,
  `Num_ext_Sucursal` int NOT NULL,
  `Num_int_Sucursal` int NOT NULL,
  `Colonia__Sucursal` varchar(45) NOT NULL,
  `Delegacion_Sucursal` varchar(45) NOT NULL,
  `CP_Sucursal` varchar(45) NOT NULL,
  `Ciudad_Sucursal` varchar(45) NOT NULL,
  `Telefono` varchar(45) NOT NULL,
  PRIMARY KEY (`Id_Sucursal`)
);

CREATE TABLE `expediente` (
  `id_expediente` INT NOT NULL AUTO_INCREMENT,
  `id_sucursal` INT NOT NULL,
  `id_mascota` INT NOT NULL,
  `id_cita` INT NOT NULL,
  PRIMARY KEY (`id_expediente`),
  KEY `id_sucursal` (`id_sucursal`),
  KEY `id_mascota` (`id_mascota`),
  KEY `id_cita` (`id_cita`),
  CONSTRAINT `expediente_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`Id_Sucursal`),
  CONSTRAINT `expediente_ibfk_2` FOREIGN KEY (`id_mascota`) REFERENCES `mascota` (`Id_Mascota`),
  CONSTRAINT `expediente_ibfk_3` FOREIGN KEY (`id_cita`) REFERENCES `cita` (`Id_Cita`)
);

CREATE TABLE `productosucursal` (
  `id_ProducSuc` INT NOT NULL AUTO_INCREMENT,
  `id_sucursal` INT NOT NULL,
  `id_producto` INT NOT NULL,
  PRIMARY KEY (`id_ProducSuc`),
  KEY `id_sucursal` (`id_sucursal`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `productosucursal_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`Id_Sucursal`),
  CONSTRAINT `productosucursal_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`Id_Producto`)
);

CREATE TABLE `sucursalempleado` (
  `Id_sucursalempleado` INT NOT NULL AUTO_INCREMENT,
  `id_empleado` INT NOT NULL,
  `id_sucursal` INT NOT NULL,
  PRIMARY KEY (`Id_sucursalempleado`),
  KEY `id_empleado` (`id_empleado`),
  KEY `id_sucursal` (`id_sucursal`),
  CONSTRAINT `sucursalempleado_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`Id_Empleado`),
  CONSTRAINT `sucursalempleado_ibfk_2` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`Id_Sucursal`)
);

CREATE TABLE `ticket` (
  `Id_Ticket` INT NOT NULL AUTO_INCREMENT,
  `Id_usuario` INT NOT NULL,
  `Fecha` datetime NOT NULL,
  `Cantidad` INT NOT NULL,
  PRIMARY KEY (`Id_Ticket`),
  FOREIGN KEY (`Id_usuario`) REFERENCES `usuario` (`Id_Usuario`)
);

CREATE TABLE `ticketproducto` (
  `id_ticketproducto` INT NOT NULL AUTO_INCREMENT,
  `id_ticket` INT NOT NULL,
  `id_producto` INT NOT NULL,
  PRIMARY KEY (`id_ticketproducto`),
  KEY `id_ticket` (`id_ticket`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `ticketproducto_ibfk_1` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`Id_Ticket`),
  CONSTRAINT `ticketproducto_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`Id_Producto`)
);

 CREATE TABLE `usuario` (
  `Id_Usuario`INT NOT NULL AUTO_INCREMENT,
  `Nombre_Usuario` varchar(45) NOT NULL,
  `Apellido1_Usuario` varchar(45) DEFAULT NULL,
  `Apellido2_Usuario` varchar(45) DEFAULT NULL,
  `Correo_Usuario` varchar(45) NOT NULL check(Correo_Usuario like '%@%'),
  `Password_Usuario` varchar(45) NOT NULL check(length(Password_Usuario) > 5),
  `Calle_Usuario` varchar(45) NOT NULL,
  `Num_ext_Usuario` int unsigned NOT NULL,
  `Num_int_Usuario` int unsigned NOT NULL,
  `Delegacion_Usuario` varchar(45) NOT NULL,
  `Ciudad_Usuario` varchar(45) NOT NULL,
  `CP_Usuario` int unsigned NOT NULL,
  `Metodo_Pago` varchar(45) NOT NULL check (Metodo_Pago in ('Debito', 'Credito', 'Paypal')),
  `Num_Tarjeta` bigint NOT NULL,
  `Telefono_Usuario` varchar(45) NOT NULL,
  PRIMARY KEY (`Id_Usuario`),
  UNIQUE KEY `idUsuario_UNIQUE` (`Id_Usuario`),
  UNIQUE KEY `Correo_Usuario_UNIQUE` (`Correo_Usuario`)
);


drop table cita;
drop table empleado;
drop table mascota;
drop table sucursal;
drop table expediente;
drop table usuario;
drop table productosucursal;
drop table ticketproducto;
drop table producto;

alter table cita AUTO_INCREMENT=0;
alter table empleado AUTO_INCREMENT=0;
alter table mascota AUTO_INCREMENT=0;
alter table producto AUTO_INCREMENT=0;
alter table sucursal AUTO_INCREMENT=0;
alter table sucursalempleado auto_increment=0;
alter table expediente AUTO_INCREMENT=0;
alter table ticket AUTO_INCREMENT=0;
alter table ticketproducto auto_increment=0;
alter table productosucursal AUTO_INCREMENT=0;
alter table usuario AUTO_INCREMENT=0;


alter table producto add Stock int after Especie;