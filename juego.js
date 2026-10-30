
const palabras = [
    { palabra: "PERRO", categoria: "Animal" },
    { palabra: "TIGRE", categoria: "Animal" },
    { palabra: "GATOS", categoria: "Animal" },
    { palabra: "PIZZA", categoria: "Comida" },
    { palabra: "MANGO", categoria: "Comida" },
    { palabra: "ARROZ", categoria: "Comida" },
    { palabra: "ROBOT", categoria: "Tecnologia" },
    { palabra: "MOUSE", categoria: "Tecnologia" },
    { palabra: "PIXEL", categoria: "Tecnologia" },
    { palabra: "TENIS", categoria: "Deporte" },
    { palabra: "RUGBY", categoria: "Deporte" },
    { palabra: "BOXEO", categoria: "Deporte" },
    { palabra: "ARBOL", categoria: "Naturaleza" },
    { palabra: "SELVA", categoria: "Naturaleza" },
    { palabra: "PLAYA", categoria: "Lugar" },
    { palabra: "PARIS", categoria: "Lugar" }
];

let palabraSecreta;
let intentos = 0;
let terminado = false;
const maxIntentos = 6;

const tablero = document.getElementById("tablero");
const categoria = document.getElementById("categoria");
const entrada = document.getElementById("respuesta");
const mensaje = document.getElementById("mensaje");

// Elegir una palabra aleatoria
function nuevoJuego() {

    const seleccion = palabras[
        Math.floor(Math.random() * palabras.length)
    ];

    palabraSecreta = seleccion.palabra;

    categoria.textContent = seleccion.categoria;

    intentos = 0;
    terminado = false;

    entrada.disabled = false;
    entrada.value = "";

    document.querySelector("button[type='submit']").disabled = false;

    tablero.innerHTML = "";

    // Crear las 6 filas de casillas
    for (let i = 0; i < maxIntentos; i++) {

        let fila = document.createElement("div");
        fila.className = "fila";

        for (let j = 0; j < 5; j++) {

            let celda = document.createElement("div");

            celda.className = "celda";
            celda.id = `celda-${i}-${j}`;

            fila.appendChild(celda);
        }

        tablero.appendChild(fila);
    }

    mensaje.textContent = "¡Buena suerte!";
}

// Comprobar la palabra
function comprobar(evento) {

    evento.preventDefault();

    if (terminado) return;

    let intento = entrada.value.toUpperCase().trim();

    if (!/^[A-ZÑÁÉÍÓÚÜ]+$/.test(intento) || intento.length !== 5) {
        mensaje.textContent = "Escribe una palabra de 5 letras.";
        return;
    }

    // Quitar tildes
    intento = intento.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    let disponibles = palabraSecreta.split("");
    let estados = Array(5).fill("fuera");

    // Primero revisar las letras correctas
    for (let i = 0; i < 5; i++) {

        if (intento[i] === palabraSecreta[i]) {

            estados[i] = "correcta";
            disponibles[i] = null;
        }
    }

    // Revisar las letras en otra posición
    for (let i = 0; i < 5; i++) {

        if (estados[i] === "correcta") continue;

        let posicion = disponibles.indexOf(intento[i]);

        if (posicion !== -1) {

            estados[i] = "posicion";
            disponibles[posicion] = null;
        }
    }

    // Mostrar las letras y colores
    for (let i = 0; i < 5; i++) {

        let celda = document.getElementById(
            `celda-${intentos}-${i}`
        );

        celda.textContent = intento[i];
        celda.classList.add(estados[i]);
    }

    intentos++;
    entrada.value = "";

    // Comprobar si ganó
    if (intento === palabraSecreta) {

        mensaje.textContent = "¡FELICIDADES! ¡Adivinaste la palabra!";
        finalizar();

    } else if (intentos === maxIntentos) {

        mensaje.textContent =
            "Perdiste. La palabra era: " + palabraSecreta;

        finalizar();

    } else {

        mensaje.textContent =
            "Incorrecto. Te quedan " +
            (maxIntentos - intentos) + " intentos.";
    }
}

// Terminar el juego
function finalizar() {

    terminado = true;
    entrada.disabled = true;

    document.querySelector("button[type='submit']").disabled = true;
}

// Eventos de los botones
document.getElementById("formulario")
    .addEventListener("submit", comprobar);

document.getElementById("nuevo")
    .addEventListener("click", nuevoJuego);

// Iniciar el juego
nuevoJuego();
