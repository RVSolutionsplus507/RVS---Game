
const sectionSeleccionarAtaque = document.getElementById("ataques")
const sectionSeleccionarReglas = document.getElementById("reglas")
const sectionSeleccionarReiniciar = document.getElementById("reinicio")
const botonSeleccionar = document.getElementById("boton_seleccionar")
const botonAgua = document.getElementById("boton_agua")
const botonFuego = document.getElementById("boton_fuego")
const botonTierra = document.getElementById("boton_tierra")
const botonreiniciar = document.getElementById("boton_reiniciar")

const sectionSeleccionarAvatares = document.getElementById("seleccionar")

const spanAvatarJugador = document.getElementById("avatar_jugador")

const spanAvatarPC = document.getElementById("avatar_pc")

const ataq_jugador = document.getElementById("a_jugador")
const ataq_pc = document.getElementById("a_pc")

const nuevoAjugador = document.createElement("p")
const nuevoApc = document.createElement("p")
const spanVidasJugador = document.getElementById("vidas_jugador")
const spanVidasPC = document.getElementById("vidas_pc")

const contenedorTarjetas = document.getElementById("contenedortarjetas")

const sectionmapa = document.getElementById("mapa")
const mapa = document.getElementById("maparvs")

let personajes = []
let combateJugador
let combatePC
let opcionAvatar
let inputblastoide
let inputcharmander
let inputmetapod
let resultado
let vidasjugador = 3
let vidaspc = 3
let lienzo = maparvs.getContext("2d")
let intervalo
let mapabackground = new Image()
mapabackground.src = "./img/mapa2.jpeg"
let personajeJugador
let obtenerJugador

class Personaje {
    constructor(nombre, foto, vida, x = 10, y = 10) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.x = x
        this.y = y
        this.w = 60
        this.h = 60
        this.mapafoto = new Image()
        this.mapafoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarpersonaje() {
        lienzo.drawImage(
            this.mapafoto,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }
}

let blastoide = new Personaje("Blastoide", "./img/blastoide.png", 3)
let charmander = new Personaje("Charmander", "./img/charmander.png", 3)
let metapod = new Personaje("Metapod", "./img/metapod.png", 3)

let blastoideenemigo = new Personaje("Blastoide", "./img/blastoide.png", 3, 80, 120)
let charmanderenemigo = new Personaje("Charmander", "./img/charmander.png", 3, 395, 25)
let metapodenemigo = new Personaje("Metapod", "./img/metapod.png", 3, 300, 190)

personajes.push(blastoide, charmander, metapod)

function iniciarjuego() {

    sectionSeleccionarAtaque.style.display = "none"
    sectionSeleccionarReglas.style.display = "none"
    sectionSeleccionarReiniciar.style.display = "none"
    sectionmapa.style.display = "none"

    personajes.forEach((Personaje) => {
        opcionAvatar = `<input type="radio" id=${Personaje.nombre} name="avatar">
<label class="nombres" for=${Personaje.nombre}><img class="imagenes" src=${Personaje.foto} alt=${Personaje.nombre}
        width="30px" height="30px"></label>`
        contenedorTarjetas.innerHTML += opcionAvatar
        inputblastoide = document.getElementById("Blastoide")
        inputcharmander = document.getElementById("Charmander")
        inputmetapod = document.getElementById("Metapod")
    })
    botonSeleccionar.addEventListener("click", seleccionarAvatarJugador)


    botonAgua.addEventListener("click", ataqueagua)
    botonFuego.addEventListener("click", ataquefuego)
    botonTierra.addEventListener("click", ataquetierra)

    botonreiniciar.addEventListener("click", reiniciarjuego)
}


//Avatar del Jugador
function seleccionarAvatarJugador() {

    sectionSeleccionarAvatares.style.display = "none"
    // sectionSeleccionarAtaque.style.display = "flex"
    sectionSeleccionarReglas.style.display = "block"


    if (inputblastoide.checked) {
        spanAvatarJugador.innerHTML = inputblastoide.id
        personajeJugador = inputblastoide.id

    } else if (inputcharmander.checked) {
        spanAvatarJugador.innerHTML = inputcharmander.id
        personajeJugador = inputcharmander.id

    } else if (inputmetapod.checked) {
        spanAvatarJugador.innerHTML = inputmetapod.id
        personajeJugador = inputmetapod.id

    } else {
        alert("NO SELECCIONASTE UNA MASCOTA 😒")

    }

    sectionmapa.style.display = "flex"

    iniciarmapa()
}
//Avatar Aleatorio
function seleccionarAvatarPC() {


    let avatarAleatorioPC = aleatorio(0, personajes.length - 1)

    spanAvatarPC.innerHTML = personajes[avatarAleatorioPC].nombre
}
//Ataques del Jugador
function ataqueagua() {
    combateJugador = "AGUA"
    ataquePC()

}
function ataquefuego() {
    combateJugador = "FUEGO"
    ataquePC()
}
function ataquetierra() {
    combateJugador = "TIERRA"
    ataquePC()
}
//Ataques del PC
function ataquePC() {

    let ataqueAleatorioPC = aleatorio(1, 3)
    if (ataqueAleatorioPC == 1) {
        combatePC = "AGUA"

    } else if (ataqueAleatorioPC == 2) {
        combatePC = "FUEGO"

    } else {
        combatePC = "TIERRA"

    }
    resultados()
    mensajeCombate()


}
function mensajeCombate() {


    nuevoAjugador.innerHTML = combateJugador
    nuevoApc.innerHTML = combatePC
    // parrafo.innerHTML = `Tu Avatar atacó con: ${combateJugador} La PC atacó con: ${combatePC}`

    ataq_jugador.appendChild(nuevoAjugador)
    ataq_pc.appendChild(nuevoApc)

    spanVidasJugador.innerHTML = vidasjugador
    spanVidasPC.innerHTML = vidaspc
}

function resultados() {

    if (combateJugador == combatePC) {
        resultado = "EMPATASTE"

    } else if (combateJugador == "FUEGO" && combatePC == "TIERRA") {
        resultado = "GANASTE"

    } else if (combateJugador == "AGUA" && combatePC == "FUEGO") {
        resultado = "GANASTE"

    } else if (combateJugador == "TIERRA" && combatePC == "AGUA") {
        resultado = "PERDISTE"

    } else {
        resultado = "PERDISTE"

    }


    vidasAvatares()
    revisarvidas()

}

function vidasAvatares() {



    if (resultado == "PERDISTE") {
        vidasjugador--
        vidaspc = vidaspc



    } else if (resultado == "GANASTE") {
        vidasjugador = vidasjugador
        vidaspc--
    }

    else {
        vidasjugador = vidasjugador
        vidaspc = vidaspc
    }

}

function revisarvidas() {

    sectionSeleccionarReiniciar.style.display = "block"
    if (vidaspc == 0) {
        alert("GANASTE!! 😎😎😎👍")

        botonAgua.disabled = true
        botonFuego.disabled = true
        botonTierra.disabled = true

    } else if (vidasjugador == 0) {
        alert("PERDISTE!! 🤣🤣🤣🤣👎👎")

        botonAgua.disabled = true
        botonFuego.disabled = true
        botonTierra.disabled = true
    }

}

function reiniciarjuego() {
    location.reload()
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarcanvas() {
    obtenerJugador.x = obtenerJugador.x + obtenerJugador.velocidadX
    obtenerJugador.y = obtenerJugador.y + obtenerJugador.velocidadY
    lienzo.clearRect(0, 0, maparvs.width, maparvs.height)
    lienzo.drawImage(
        mapabackground,
        0,
        0,
        maparvs.width,
        maparvs.height
    )
    obtenerJugador.pintarpersonaje()
    blastoideenemigo.pintarpersonaje()
    charmanderenemigo.pintarpersonaje()
    metapodenemigo.pintarpersonaje()

    if (obtenerJugador.velocidadX !== 0 || obtenerJugador.velocidadY !== 0) {
        colision(charmanderenemigo)
        colision(blastoideenemigo)
        colision(metapodenemigo)
    }
}

function moverderecha() {
    obtenerJugador.velocidadX = 5
}
function moverizquierda() {
    obtenerJugador.velocidadX = -5
}
function moverarriba() {
    obtenerJugador.velocidadY = -5
}
function moverabajo() {
    obtenerJugador.velocidadY = 5
}

function detenermovimiento() {
    obtenerJugador.velocidadY = 0
    obtenerJugador.velocidadX = 0
}

function teclapresionada(event) {
    switch (event.key) {
        case "ArrowUp":
            moverarriba()
            break
        case "ArrowDown":
            moverabajo()
            break
        case "ArrowLeft":
            moverizquierda()
            break
        case "ArrowRight":
            moverderecha()
            break
        default:
            break
    }
}

function iniciarmapa() {
    maparvs.width = 500
    maparvs.height = 300
    obtenerJugador = seleccionarObjetoPersonaje(personajeJugador)
    intervalo = setInterval(pintarcanvas, 50)
    window.addEventListener("keydown", teclapresionada)
    window.addEventListener("keyup", detenermovimiento)
}

function seleccionarObjetoPersonaje() {
    for (let i = 0; i < personajes.length; i++) {
        if (personajeJugador === personajes[i].nombre) {
            return personajes[i]
        }

    }
}

function colision(enemigo) {
    const arribaenemigo = enemigo.y
    const abajoenemigo = enemigo.y + enemigo.h
    const derechaenemigo = enemigo.x + enemigo.w
    const izquierdaenemigo = enemigo.x

    const arribaavatar = obtenerJugador.y
    const abajoavatar = obtenerJugador.y + obtenerJugador.h
    const derechaavatar = obtenerJugador.x + obtenerJugador.w
    const izquierdaavatar = obtenerJugador.x

    if (abajoavatar < arribaenemigo ||
        arribaavatar > abajoenemigo ||
        derechaavatar < izquierdaenemigo ||
        izquierdaavatar > derechaenemigo) {
        return
    }
    detenermovimiento()
    alert("Hay Pelea! con: " + enemigo.nombre + " " + "⚔️⚔️⚔️🔥🔥🔥")
    sectionSeleccionarAtaque.style.display = "flex"
    sectionmapa.style.display = "none"

    seleccionarAvatarPC(enemigo)
}

window.addEventListener("load", iniciarjuego)
