let biblioteca = [];

async function cargarBiblioteca(){

    try{

        const libros =
            await fetch(
                "datos/libros.json"
            )
            .then(r=>r.json());

        const videos =
            await fetch(
                "datos/videos.json"
            )
            .then(r=>r.json());

        const audios =
            await fetch(
                "datos/audios.json"
            )
            .then(r=>r.json());

        const guias =
            await fetch(
                "datos/guias.json"
            )
            .then(r=>r.json());

        biblioteca = [

            ...libros,

            ...videos,

            ...audios,

            ...guias

        ];

        render(biblioteca);
        mostrarRecomendados();

    }catch(error){

        console.error(error);

    }

}


function obtenerFavoritos(){

    return JSON.parse(
        localStorage.getItem(
            "favoritos"
        )
    ) || [];

}

function esFavorito(id){

    return obtenerFavoritos()
    .includes(id);

}

function agregarFavorito(id){

    let favoritos =
        obtenerFavoritos();

    if(
        !favoritos.includes(id)
    ){

        favoritos.push(id);

        localStorage.setItem(

            "favoritos",

            JSON.stringify(
                favoritos
            )

        );

        render(biblioteca);

    }

}

function iconoTipo(tipo){

    switch(tipo){

        case "libro":
            return "📖 Libro";

        case "video":
            return "🎥 Video";

        case "audio":
            return "🎧 Audio";

        case "guia":
            return "🎓 Guía";

        default:
            return "📁 Recurso";

    }

}

function crearTarjeta(item){

    return `

    <div class="card">

        <img
        src="${item.imagen}"
        onerror="
        this.src='imagenes/default.png'
        ">

        <div class="card-content">

            <h3>${item.titulo}</h3>

            <p>${item.descripcion}</p>

            <p>
            📚 ${item.categoria}
            </p>
            <p>
            ${iconoTipo(item.tipo)}
            </p>

            <div class="card-buttons">

                <button
                class="btn"
                onclick="verLibro('${item.id}')">

                Ver detalles

                </button>

                <button
                class="btn favorito-btn"
                onclick="agregarFavorito('${item.id}')">

                ${
                    esFavorito(item.id)
                    ? "✅ Guardado"
                    : "⭐ Favorito"
                }

                </button>

            </div>

        </div>

    </div>

    `;

}

function render(lista){

    const contenido =
        document.getElementById(
            "contenido"
        );

    contenido.innerHTML = "";

    lista.forEach(item=>{

        contenido.innerHTML +=
            crearTarjeta(item);

    });

}

function guardarHistorial(id){

    let historial =
        JSON.parse(
            localStorage.getItem(
                "historial"
            )
        ) || [];

    historial =
        historial.filter(
            item=>item!==id
        );

    historial.unshift(id);

    historial =
        historial.slice(0,20);

    localStorage.setItem(

        "historial",

        JSON.stringify(
            historial
        )

    );

}

function verLibro(id){

    const libro =
        biblioteca.find(
            x=>String(x.id)
            ===
            String(id)
        );

    localStorage.setItem(

        "libroActual",

        JSON.stringify(
            libro
        )

    );

    guardarHistorial(id);

    location.href =
        "articulo.html";

}

function filtrarCategoria(categoria){

    if(
        categoria==="Todas"
    ){

        render(
            biblioteca
        );

        return;

    }

    const resultado =
        biblioteca.filter(item=>

            item.categoria
            ===
            categoria

        );

    render(resultado);

}

function mostrarRecomendados(){

const contenedor =
document.getElementById(
"recomendados"
);

if(!contenedor)
return;

const recomendados =
biblioteca.filter(
x=>x.recomendado
);

recomendados.forEach(item=>{

contenedor.innerHTML +=
crearTarjeta(item);

});

}

function toggleDark(){

    document.body
    .classList
    .toggle("dark");

    localStorage.setItem(

        "dark",

        document.body
        .classList
        .contains("dark")

    );

}

if(
localStorage.getItem(
"dark"
)==="true"
){

document.body.classList.add(
"dark"
);

}

document
.getElementById("search")
.addEventListener("input",function(){

    const texto =
        this.value.toLowerCase();

    const resultado =
        biblioteca.filter(item=>

        item.titulo
        .toLowerCase()
        .includes(texto)

        ||

        item.autor
        .toLowerCase()
        .includes(texto)

        ||

        item.categoria
        .toLowerCase()
        .includes(texto)

        ||

        item.descripcion
        .toLowerCase()
        .includes(texto)

        );

    render(resultado);

});

cargarBiblioteca();