const fs = require("fs");

const issueBody = process.env.GITHUB_EVENT_PATH
  ? JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"))
  : null;

const issue = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);

const body = issue.issue.body;

function get(field){
  const match = body.match(new RegExp(field + ": (.*)"));
  return match ? match[1].trim() : "";
}

const tipo = get("tipo");
const id = get("id");
const titulo = get("titulo");
const autor = get("autor");
const categoria = get("categoria");
const descripcion = get("descripcion");

const file = `datos/${tipo}.json`;

let data = [];

if(fs.existsSync(file)){
  data = JSON.parse(fs.readFileSync(file));
}

data.push({
  id,
  fecha: new Date().toISOString().split("T")[0],
  tipo,
  titulo,
  autor,
  categoria,
  descripcion,
  imagen: "",
  pdf: "",
  audio: "",
  video: "",
  recomendado: false
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));