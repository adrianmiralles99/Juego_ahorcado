import comprobarboton from "./index.js";
export default class clase_botones{

    abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z"];

    //creamos los botones del teclado virtual.
    crear_botones_letras() {
        console.log()
        console.log("en la funcion");
        let div_botones = document.getElementById('botones');
        let contador = 0;
        let ol; let li; let boton; let letra;
        let fila = true;
        let idfilas = 1;
        let letraabecedario;

        for (let i = 0; i < this.abecedario.length; i++) {
            if (fila == true) {
                ol = document.createElement('ol');
                fila = false;
            }
            li = document.createElement('li');
            letraabecedario = document.createTextNode(this.abecedario[i]);
            boton = document.createElement('button');
            boton.setAttribute("class", "btn btn-outline-primary btn-lg");
            boton.setAttribute("type", "submit");
            boton.setAttribute("value", this.abecedario[i]);
            boton.setAttribute("id", this.abecedario[i]);
            //asignamos la función importada del fichero index en el event listener
            boton.addEventListener("click", comprobarboton);
            boton.appendChild(letraabecedario);
            li.appendChild(boton);
            ol.appendChild(li);
            ol.setAttribute("id", idfilas);
            div_botones.appendChild(ol);
            contador++;
            //esto sirve para que cada 9 letras haya una nueva linea
            if (contador == 9) {
                console.log(contador);
                idfilas++;
                fila = true;
                contador = 0;
            }
        }
    }
    activarbotones() {
        console.log("activando botones");
        for (let i = 0; i < this.abecedario.length; i++) {
            let boton_letra = document.getElementById(this.abecedario[i]);
            boton_letra.disabled = false;//habilitamos el botón otra vez
        }
    }
}