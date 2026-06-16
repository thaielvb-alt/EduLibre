const fs = require("fs");

function decode(file){
  if(!file) return null;
  const base64 = file.split(",")[1];
  return Buffer.from(base64, "base64");
}

function saveFile(path, data){
  if(!data) return;
  fs.writeFileSync(path, data);
}

/* =========================
   INPUTS
========================= */

const tipo = process.env.INPUT_TIPO;
const id = process.env.INPUT_ID;
const titulo = process.env.INPUT_TITULO;
const autor = process.env.INPUT_AUTOR;
const categoria = process.env.INPUT_CATEGORIA;
const descripcion = process.env.INPUT_DESCRIPCION;

const archivo = decode(process.env.INPUT_ARCHIVO);
const video = decode(process.env.INPUT_VIDEO);
const audio = decode(process.env.INPUT_AUDIO);
const imagen = decode(process.env.INPUT_IMAGEN);

/* =========================
   RUTAS
========================= */

const dirMap = {
  libros: "libros",
  videos: "videos",
  audios: "audios",
  guias: "guias"
};

const carpeta = dirMap[tipo] || "libros";

/* =========================
   GUARDAR ARCHIVOS
========================= */

if(imagen)
  saveFile(`${carpeta}/${id}.jpg`, imagen);

if(archivo)
  saveFile(`${carpeta}/${id}.pdf`, archivo);

if(video)
  saveFile(`${carpeta}/${id}.mp4`, video);

if(audio)
  saveFile(`${carpeta}/${id}.mp3`, audio);

/* =========================
   ACTUALIZAR JSON
========================= */

const jsonPath = `datos/${carpeta}.json`;

let data = [];

if(fs.existsSync(jsonPath)){
  data = JSON.parse(fs.readFileSync(jsonPath));
}

const nuevo = {
  id,
  fecha: new Date().toISOString().split("T")[0],
  tipo: tipo.slice(0,-1),
  titulo,
  autor,
  categoria,
  descripcion,
  imagen: `${carpeta}/${id}.jpg`,
  pdf: `${carpeta}/${id}.pdf`,
  video: `${carpeta}/${id}.mp4`,
  audio: `${carpeta}/${id}.mp3`,
  recomendado: false
};

data.push(nuevo);

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));