import clase_botones from "./botones.js";//importando la clase
import clase_vida from "./vidas.js";//importando la clase
import clase_utilidades from "./utilidades.js";//importando la clase
import animacion_universo from "./universo.js";//importando la clase

var animacion_uni = new animacion_universo();
var utils = new clase_utilidades();
var botones = new clase_botones();
var vida = new clase_vida();
//usando funciones arrow.
var vidas = vida.getVidas();//establecer las vidas predeterminadas
var vidas_permanentes = vida.getVidasPermanentes();//establecer las vidas permanentes predeterminadas
console.log("f arrow -> " + vidas_permanentes);
var palabra = "";
var letraacertada = 0;

var posicion = 0;
window.onload = function () {

    let audio1 = document.getElementById("soundtrack");
    audio1.loop = true;
    audio1.volume = 0.05;
    audio1.autoplay;
    
    //desplegamos la animación del universo paraq que sea lo primero
    animacion_uni; //para llamar al constructor de otra clase no hace falta los parentesis
    //creamos el teclado virtual
    botones.crear_botones_letras();

    let div_inicio = document.getElementById('divinicio');
    div_inicio.style.display = 'block';
    //Eventlisteners de todos los botones

    let botoninicio = document.getElementById('botoninicio');
    botoninicio.addEventListener('click', inicio);

    let botonintrucciones = document.getElementById('botonintrucciones');
    botonintrucciones.addEventListener('click', instrucciones, false);

    let botonajustes = document.getElementById('botonajustes');
    botonajustes.addEventListener('click', ajustes, false);

    let botonvolverinst = document.getElementById('botonvolver_instrucciones');
    botonvolverinst.addEventListener('click', volver, false);

    let botonvolverajust = document.getElementById('botonvolver_ajustes');
    botonvolverajust.addEventListener('click', volver, false);

    let div_ajustes = document.getElementById('divajustes');
    let botones_vida = div_ajustes.getElementsByTagName('button');
    for (let i = 0; i <= 2; i++) {
        botones_vida[i].addEventListener('click', establecervida, false);
    }

    let botonvolverjuego = document.getElementById('botonvolver_juego');
    botonvolverjuego.addEventListener('click', volver, false);

    let botonvolvervictoria = document.getElementById('botonvolver_victoria');
    botonvolvervictoria.addEventListener('click', volver, false);

    let botonvolverderrota = document.getElementById('botonvolver_derrota');
    botonvolverderrota.addEventListener('click', volver, false);

    document.documentElement.addEventListener("keyup", cambiapantalla);

    /*pruebas
    */

}

function inicio() {

    sonidoboton();//me ejecuta primero los alerts antes que el sonido, pero queda comprobado que me entra en la función antes.
    //debe ser por la naturaleza de los alerts

    palabra = prompt("Escriba la palabra a utilizar. \nSERÁ ALEATORIA SI NO ESCRIBES.");
    //le quitamos los espacios
    palabra = palabra.trim();
    palabra = palabra.split(" ").join("");
    palabra = palabra.toUpperCase();
    //Si está en blanco elegimos una palabra aleatoria y la ponemos en mayúsculas.
    if (palabra == "") {
        alert("Se utilizará una palabra aleatoria.");
        palabra = utils.getPalabraRandom();
    }
    botones.activarbotones();//activamos los botones por si hemos jugado anteriormente y están desactivados
    utils.crearHuecosPalabra(palabra);
    vidas = vida.getVidas();//establecer las vidas predeterminadas
    vidas_permanentes = vida.getVidasPermanentes();//establecer las vidas permanentes predeterminadas
    vida.crearVidas();
    document.documentElement.addEventListener("keyup", comprobartecla);
    pantallajuego();//vamos a la pantalla de juego

}
//para ir a la pantalla de instrucciones
function instrucciones() {
    sonidoboton();
    let div_inicio = document.getElementById('divinicio');
    div_inicio.style.display = 'none';
    let div_instrucciones = document.getElementById('divinstrucciones');
    div_instrucciones.style.display = 'block';
}
//para ir a la pantalla de ajustes
function ajustes() {
    sonidoboton();
    let div_inicio = document.getElementById('divinicio');
    div_inicio.style.display = 'none';
    let div_ajustes = document.getElementById('divajustes');
    div_ajustes.style.display = 'block';
}
//para el botón volver de todas las pantallas, pone la pantalla de inicio visible y oculta en la que se estaba
function volver() {
    sonidoboton();
    let div_inicio = document.getElementById('divinicio');
    let div_instrucciones = document.getElementById('divinstrucciones');
    let div_ajustes = document.getElementById('divajustes');
    let div_juego = document.getElementById('divjuego');
    let div_victoria = document.getElementById('divvictoria');
    let div_derrota = document.getElementById('divderrota');

    if (div_ajustes.style.display == 'block') {
        div_ajustes.style.display = 'none';
    }
    if (div_instrucciones.style.display == 'block') {
        div_instrucciones.style.display = 'none';
    }
    if (div_juego.style.display == 'block') {
        div_juego.style.display = 'none';
        utils.borrarHuecosPalabra(palabra);
        vida.borrarVidas();
        letraacertada = 0;
    }
    if (div_victoria.style.display == 'block') {
        div_victoria.style.display = 'none';
        utils.borrarHuecosPalabra(palabra);
        vida.borrarVidas();
        letraacertada = 0;
    }
    if (div_derrota.style.display == 'block') {
        div_derrota.style.display = 'none';
        utils.borrarHuecosPalabra(palabra);
        vida.borrarVidas();
        letraacertada = 0;
    }
    div_inicio.style.display = 'block';
}

//según el valor del botón marcado establecemos una vida u otra
function establecervida() {
    sonidoboton();
    let idboton = this.id;
    //usando funciones arrow.
    vida.establecervida(idboton);

}
//preparamos la pantalla de juego
function pantallajuego() {
    
    let div_inicio = document.getElementById('divinicio');
    div_inicio.style.display = 'none';
    let div_juego = document.getElementById('divjuego');
    div_juego.style.display = 'block';

}
//esta función es como comprobarbotón pero con las teclas y el evento keyup
function comprobartecla(lyric) {
    let div_juego = document.getElementById('divjuego');

    if (div_juego.style.display == 'block') {
        sonidobotoncitos();
        let letra = lyric.key;
        letra = letra.toUpperCase();
        let boton = document.getElementById(letra);
        let li_letra;
        let existe = false;
        for (let i = 0; i < palabra.length; i++) {
            li_letra = document.getElementById("let" + i);
            if (letra == palabra[i]) {
                li_letra.innerHTML = letra;
                syncDelay(200);
                existe = true;
                letraacertada++;//contador para saber cuando hemos acertado una letra
            }
        }

        if (existe == false && letra != "ENTER") {
            quitarVida();
        }
        if (lyric.keyCode >= 65 || lyric.keyCode >= 90) {
            boton.disabled = true;//deshabilitamos el boton
        }
        if (vidas == 0) {
            syncDelay(1000);
            juegoPerdido();
        }
        else {
            //si los aciertos son los mismos que la longitud de la palabra es que está entera
            if (letraacertada == palabra.length) {
                syncDelay(1000);
                juegoGanado();
            }

        }
    }
}
//exportamos la funcion de comprueba letra para asignarla en la clase botones en el fichero botones.js
export default
    function comprobarboton() {
    sonidobotoncitos();
    console.log(this.id);
    let letra = this.id; //el boton en el que hemos pinchado
    let boton = document.getElementById(letra);
    let li_letra;
    let existe = false;
    for (let i = 0; i < palabra.length; i++) {
        li_letra = document.getElementById("let" + i);
        if (letra == palabra[i]) {
            li_letra.innerHTML = letra;
            syncDelay(200);
            existe = true;
            letraacertada++;//contador para saber cuando hemos acertado una letra
        }
    }

    if (existe == false) {
        quitarVida();
    }
    boton.disabled = true;//deshabilitamos el boton
    if (vidas == 0) {
        syncDelay(1000);
        juegoPerdido();
    }
    else {
        //si los aciertos son los mismos que la longitud de la palabra es que está entera
        if (letraacertada == palabra.length) {
            syncDelay(1000);
            juegoGanado();
        }
    }
}
function quitarVida() {
    let ol_vidas = document.getElementById('vidas');
    console.log(ol_vidas);
    //primero el li de la nave
    console.log("numero de vidas -> " + vidas);
    let li_corazon;
    li_corazon = document.getElementById("corazon_" + vidas);
    console.log(li_corazon);
    ol_vidas.removeChild(li_corazon);
    //luego creamos otro li, con la imagen de un caza destruido
    let li_cazadestruido = document.createElement('li');
    //creamos la etiqueta img
    let img_caza = document.createElement('img');
    img_caza.setAttribute("src", "../imagenes/caza_destruido.png");
    img_caza.setAttribute('width', '95px')
    li_cazadestruido.setAttribute("id", "corazon_" + (vidas));
    li_cazadestruido.appendChild(img_caza);
    ol_vidas.appendChild(li_cazadestruido);
    //restamos una vida
    sonidocaza();
    vidas--;

}
//pantalla del juego cuando has finalizado y has ganado
function juegoGanado() {
    sonidovictoria();
    let div_juego = document.getElementById('divjuego');
    let pantallavictoria = document.getElementById("divvictoria");
    div_juego.style.display = 'none';
    pantallavictoria.style.display = 'block';

}
//pantalla del juego cuando has finalizado y has perdido
function juegoPerdido() {
    sonidoderrota();
    let div_juego = document.getElementById('divjuego');
    let pantalladerrota = document.getElementById("divderrota");
    div_juego.style.display = 'none';
    pantalladerrota.style.display = 'block';
}
function cambiapantalla(valor) {
    let tecla = valor.keyCode;
    let div_inicio = document.getElementById('divinicio');
    let div_victoria = document.getElementById('divvictoria');
    let div_derrota = document.getElementById('divderrota');
    let div_ajustes = document.getElementById('divajustes');

    if (tecla == 13) {
        //tecla I
        if (div_inicio.style.display == "block") {
            inicio();
        }
    }
    if (tecla == 8) {
        //tecla delete
        volver();
    }
    if (tecla == 65) {
        //tecla A
        if (div_inicio.style.display == "block") {
            ajustes();
        }
    }
    if (tecla == 73) {
        //tecla I
        if (div_inicio.style.display == "block") {
            instrucciones();
        }
        if (div_victoria.style.display == "block") {
            volver();
        }
        if (div_derrota.style.display == "block") {
            volver();
        }
    }
    if (tecla == 72){
        if (div_ajustes.style.display == "block") {
            let idboton = "boton_hardcore";
            vida.establecervida(idboton);
            sonidoboton();

        }
    }
    if (tecla == 78){
        if (div_ajustes.style.display == "block") {
            let idboton = "boton_normal";
            sonidoboton();
            vida.establecervida(idboton);
        }
    }
    if (tecla == 80){
        if (div_ajustes.style.display == "block") {
            let idboton = "boton_facil";
            vida.establecervida(idboton);
            sonidoboton();

        }
    }
}
function sonidoboton(){
    let music = new Audio('/audios/boton.mp3');
    music.play();
    music.volume = 0.25;
    console.log("ey")
}
function sonidocaza(){
    let music = new Audio('/audios/cazadestruido.mp3');
    music.play();
    music.volume = 0.25;
}
function sonidovictoria(){
    let music = new Audio('/audios/Amaze.mp3');
    music.play();
    music.volume = 0.50;
}
function sonidoderrota(){
    let music = new Audio('/audios/The power of the dark side.mp3');
    music.play();
    music.volume = 0.50;
}
function sonidobotoncitos(){
    let music = new Audio('/audios/botoncito.mp3');
    music.play();
    music.volume = 0.75 ;
}
function syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while ((end - start) < milliseconds) {
        end = new Date().getTime();
    }
}

