const fs = require("fs");

const tipo = process.env.TIPO;

const jsonPath = `datos/${tipo}.json`;

let data = [];

try {
    data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
} catch {
    data = [];
}

// crear ID seguro
const id = process.env.TITULO
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

const nuevo = {
    id,
    titulo: process.env.TITULO,
    autor: process.env.AUTOR,
    descripcion: process.env.DESCRIPCION,
    imagen: process.env.IMAGEN,
    archivo: process.env.ARCHIVO
};

data.push(nuevo);

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

console.log("Contenido agregado en " + tipo);