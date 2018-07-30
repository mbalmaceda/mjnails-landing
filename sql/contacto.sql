CREATE TABLE contacto (
    id int NOT NULL AUTO_INCREMENT,
    tipo_solicitud varchar(255),
    nombre varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    telefono varchar(12) NOT NULL,
    comuna varchar(255),
    servicio int NOT NULL,
    fecha varchar(100),
    hora int,
    mensaje varchar(500) NOT NULL,
    PRIMARY KEY (id)
)