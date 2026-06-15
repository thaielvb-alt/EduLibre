const fs = require("fs");

const tipo = process.env.TIPO;

const jsonPath = `datos/${tipo}.json`;

let data = [];

try {
  data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
} catch {
  data = [];
}

// ID limpio
const id = process.env.TITULO
  .toLowerCase()
  .replace(/\s+/g, "_")
  .replace(/[^a-z0-9_]/g, "");

const fecha = new Date().toISOString().split("T")[0];

// construir objeto completo
const nuevo = {
  id,
  fecha,
  tipo,
  titulo: process.env.TITULO,
  autor: process.env.AUTOR,
  categoria: process.env.CATEGORIA || "General",
  descripcion: process.env.DESCRIPCION,
  imagen: process.env.IMAGEN || "",
  pdf: process.env.PDF || "",
  audio: process.env.AUDIO || "",
  video: process.env.VIDEO || "",
  recomendado: false
};

data.push(nuevo);

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

console.log("OK agregado:", id);