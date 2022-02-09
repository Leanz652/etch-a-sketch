var colorSeleccionado = "black";
var modoActual = "negro";
var slider = document.getElementById("range");
var output = document.getElementById("valueGrid");
var container = document.querySelector(".sketch-conteiner");
var bttnRandom = document.querySelector(".random");
var bttnNegro = document.querySelector(".negro");
var bttnGomaDeBorrar = document.querySelector(".gomaDeBorrar");
var bttnLimpiar = document.querySelector(".limpiar");
var botones = [bttnGomaDeBorrar,bttnNegro,bttnRandom]


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


let update = () => {
    output.innerHTML = `Tamaño: ${slider.value} x ${slider.value} `;
    iniciarGrilla();
} 


function cambiarColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return

    if (colorSeleccionado == "black" || colorSeleccionado == "white"){
        this.style.backgroundColor = colorSeleccionado;
    } else {
        this.style.backgroundColor = random_rgba();
    }
    
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}



function iniciarGrilla() {
    borrarGrilla();
    container.style.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${slider.value}, 1fr)`;

    for (var i = 0; i<(slider.value*slider.value); i++) {
        var cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.addEventListener('mouseover', cambiarColor)
        cell.addEventListener('mousedown', cambiarColor)
        container.appendChild(cell);
    }

}



function borrarGrilla() {
    container.innerHTML = "";
}

function activarBotones () {
    botones.forEach((boton) => boton.classList.remove("active"))
    if (modoActual == "gomaDeBorrar") {
        bttnGomaDeBorrar.classList.add("active");
    }
    if (modoActual == "negro") {
        bttnNegro.classList.add("active");
    }
    if (modoActual == "random") {
        bttnRandom.classList.add("active");
    }

}


slider.addEventListener('input', update);
bttnGomaDeBorrar.onclick = () => {colorSeleccionado = "white"; modoActual = "gomaDeBorrar"; activarBotones()};
bttnNegro.onclick = () => {colorSeleccionado = "black"; modoActual = "negro"; activarBotones()}
bttnRandom.onclick = () => {colorSeleccionado = "random"; modoActual = "random"; activarBotones()}
bttnLimpiar.onclick = update; 
update();

