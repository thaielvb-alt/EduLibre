const fs = require("fs");

const tipo = process.env.TIPO;

const archivoJSON = `datos/${tipo}.json`;

let data = [];

try {
    data = JSON.parse(fs.readFileSync(archivoJSON, "utf-8"));
} catch (e) {
    console.log("JSON vacío o corrupto, creando nuevo");
    data = [];
}

const nuevo = {
    id: Date.now(),
    titulo: process.env.TITULO,
    autor: process.env.AUTOR,
    descripcion: process.env.DESCRIPCION,
    archivo: process.env.ARCHIVO
};

data.push(nuevo);

fs.writeFileSync(archivoJSON, JSON.stringify(data, null, 2));

console.log("Contenido agregado en " + tipo);