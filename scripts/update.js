const fs = require("fs");

const tipo = process.env.TIPO;
const id = process.env.ID;

if (!tipo || !id) {
  throw new Error("Faltan datos básicos (tipo o id)");
}

const jsonPath = `datos/${tipo}.json`;

// cargar JSON de forma segura
let data = [];
try {
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const parsed = JSON.parse(raw);
  data = Array.isArray(parsed) ? parsed : [];
} catch {
  data = [];
}

// fecha
const fecha = new Date().toISOString().split("T")[0];

// guardar base64
function saveBase64(file, path) {
  if (!file) return;

  try {
    const base64 = file.split(",")[1];
    fs.writeFileSync(path, Buffer.from(base64, "base64"));
  } catch (e) {
    console.log("Error guardando archivo:", path);
  }
}

// crear carpetas
fs.mkdirSync(tipo, { recursive: true });
fs.mkdirSync("imagenes", { recursive: true });

// guardar archivos
saveBase64(process.env.ARCHIVO, `${tipo}/${id}.pdf`);
saveBase64(process.env.VIDEO, `${tipo}/${id}.mp4`);
saveBase64(process.env.AUDIO, `${tipo}/${id}.mp3`);
saveBase64(process.env.IMAGEN, `imagenes/${id}.jpg`);

// objeto final (TU ESTRUCTURA EXACTA)
const nuevo = {
  id,
  fecha,
  tipo,
  titulo: process.env.TITULO || "",
  autor: process.env.AUTOR || "",
  categoria: process.env.CATEGORIA || "",
  descripcion: process.env.DESCRIPCION || "",
  imagen: `imagenes/${id}.jpg`,
  pdf: tipo === "libros" ? `${tipo}/${id}.pdf` : "",
  video: tipo === "videos" ? `${tipo}/${id}.mp4` : "",
  audio: tipo === "audios" ? `${tipo}/${id}.mp3` : "",
  recomendado: false
};

data.push(nuevo);

// guardar limpio
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

console.log("OK subido:", id);