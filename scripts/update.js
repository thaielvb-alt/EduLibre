const fs = require("fs");

const file = "datos/biblioteca.json";

let data = JSON.parse(fs.readFileSync(file, "utf-8"));

const nuevo = {
    id: Date.now(),
    titulo: process.env.TITULO,
    autor: process.env.AUTOR,
    descripcion: process.env.DESCRIPCION,
    categoria: process.env.CATEGORIA,
    imagen: process.env.IMAGEN || "",
    pdf: process.env.PDF || ""
};

data.push(nuevo);

fs.writeFileSync(file, JSON.stringify(data, null, 2));

console.log("Libro agregado");