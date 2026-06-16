const fs = require("fs");


const tipo =
process.env.INPUT_TIPO;


const id =
process.env.INPUT_ID;


const titulo =
process.env.INPUT_TITULO;


const autor =
process.env.INPUT_AUTOR;


const categoria =
process.env.INPUT_CATEGORIA;


const descripcion =
process.env.INPUT_DESCRIPCION;



const carpeta = tipo;



const jsonPath =
`datos/${carpeta}.json`;



let data=[];


if(fs.existsSync(jsonPath)){

data =
JSON.parse(
fs.readFileSync(jsonPath,"utf8")
);

}



const nuevo = {


id:id,


fecha:
new Date()
.toISOString()
.split("T")[0],


tipo:
tipo.slice(0,-1),


titulo,


autor,


categoria,


descripcion,


imagen:
"",


pdf:
"",


audio:
"",


video:
"",


recomendado:false


};



data.push(nuevo);



fs.writeFileSync(

jsonPath,

JSON.stringify(
data,
null,
2
)

);



console.log(
"Artículo agregado correctamente"
);