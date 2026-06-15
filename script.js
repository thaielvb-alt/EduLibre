let biblioteca = [];

/* =========================
   CARGAR TODO EL CONTENIDO
========================= */

async function cargarBiblioteca(){

    try{

        const libros = await fetch("datos/libros.json?v=" + Date.now())
            .then(r => r.json())
            .catch(() => []);

        const videos = await fetch("datos/videos.json?v=" + Date.now())
            .then(r => r.json())
            .catch(() => []);

        const audios = await fetch("datos/audios.json?v=" + Date.now())
            .then(r => r.json())
            .catch(() => []);

        const guias = await fetch("datos/guias.json?v=" + Date.now())
            .then(r => r.json())
            .catch(() => []);

        biblioteca = [
            ...(Array.isArray(libros) ? libros : []),
            ...(Array.isArray(videos) ? videos : []),
            ...(Array.isArray(audios) ? audios : []),
            ...(Array.isArray(guias) ? guias : [])
        ];

        render(biblioteca);
        mostrarRecomendados();

    }catch(error){
        console.error("Error cargando biblioteca:", error);
    }
}

/* =========================
   FAVORITOS
========================= */

function obtenerFavoritos(){
    return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function esFavorito(id){
    return obtenerFavoritos().includes(id);
}

function agregarFavorito(id){

    let favoritos = obtenerFavoritos();

    if(!favoritos.includes(id)){
        favoritos.push(id);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }

    render(biblioteca);
}

/* =========================
   ICONOS TIPO
========================= */

function iconoTipo(tipo){

    switch(tipo){
        case "libro": return "📖 Libro";
        case "video": return "🎥 Video";
        case "audio": return "🎧 Audio";
        case "guia": return "🎓 Guía";
        default: return "📁 Recurso";
    }
}

/* =========================
   TARJETAS
========================= */

function crearTarjeta(item){

    if(!item) return "";

    return `
    <div class="card">

        <img src="${item.imagen || 'imagenes/default.png'}"
        onerror="this.src='imagenes/default.png'">

        <div class="card-content">

            <h3>${item.titulo || "Sin título"}</h3>

            <p>${item.descripcion || ""}</p>

            <p>📚 ${item.categoria || "Sin categoría"}</p>

            <p>${iconoTipo(item.tipo)}</p>

            <div class="card-buttons">

                <button class="btn"
                onclick="verLibro('${item.id}')">
                    Ver detalles
                </button>

                <button class="btn favorito-btn"
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

/* =========================
   RENDER
========================= */

function render(lista){

    const contenido = document.getElementById("contenido");

    if(!contenido) return;

    contenido.innerHTML = "";

    lista.forEach(item => {
        contenido.innerHTML += crearTarjeta(item);
    });
}

/* =========================
   HISTORIAL
========================= */

function guardarHistorial(id){

    let historial = JSON.parse(localStorage.getItem("historial")) || [];

    historial = historial.filter(item => item !== id);
    historial.unshift(id);

    historial = historial.slice(0,20);

    localStorage.setItem("historial", JSON.stringify(historial));
}

/* =========================
   VER ITEM
========================= */

function verLibro(id){

    const item = biblioteca.find(x =>
        String(x.id) === String(id)
    );

    if(!item) return;

    localStorage.setItem("libroActual", JSON.stringify(item));

    guardarHistorial(id);

    location.href = "articulo.html";
}

/* =========================
   FILTRO
========================= */

function filtrarCategoria(categoria){

    if(categoria === "Todas"){
        render(biblioteca);
        return;
    }

    const resultado = biblioteca.filter(item =>
        item.categoria === categoria
    );

    render(resultado);
}

/* =========================
   RECOMENDADOS
========================= */

function mostrarRecomendados(){

    const contenedor = document.getElementById("recomendados");

    if(!contenedor) return;

    contenedor.innerHTML = "";

    const recomendados = biblioteca.filter(x => x.recomendado);

    recomendados.forEach(item => {
        contenedor.innerHTML += crearTarjeta(item);
    });
}

/* =========================
   DARK MODE
========================= */

function toggleDark(){

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "dark",
        document.body.classList.contains("dark")
    );
}

if(localStorage.getItem("dark") === "true"){
    document.body.classList.add("dark");
}

/* =========================
   SEARCH
========================= */

const searchInput = document.getElementById("search");

if(searchInput){

searchInput.addEventListener("input", function(){

    const texto = this.value.toLowerCase();

    const resultado = biblioteca.filter(item => {

        return (
            (item.titulo || "").toLowerCase().includes(texto) ||
            (item.autor || "").toLowerCase().includes(texto) ||
            (item.categoria || "").toLowerCase().includes(texto) ||
            (item.descripcion || "").toLowerCase().includes(texto)
        );

    });

    render(resultado);

});

}

/* =========================
   INICIO
========================= */

cargarBiblioteca();