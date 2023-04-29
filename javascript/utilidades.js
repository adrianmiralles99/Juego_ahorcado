export default class clase_utilidades{

    palabras = ["Jedi", "Yoda" , "Caza", "Republica", "Fuerza", "Stormtrooper", "Luke", "Leia", "Mandaloriano","Skywalker","Anakin","Imperio", "Sith", "Ewok"];
    
    getPalabraRandom(){
        let num = Math.floor(Math.random() * (this.palabras.length - 0) + 0);
        let palabra = this.palabras[num]; 
        palabra=palabra.toUpperCase();
        return palabra;
    }
    crearHuecosPalabra(palabra){
        console.log("creando huecos de " + palabra);
        for(let i = 0; i<palabra.length;i++) {
            let li = document.createElement('li');
            li.setAttribute("id", "let"+i);
            let guion = document.createTextNode('_');
            li.appendChild(guion);
            let ol_palabra = document.getElementById('palabra');
            ol_palabra.appendChild(li);
        }
    }
    borrarHuecosPalabra(palabra){
        console.log("borrando huecos -> "+palabra);
        let ol_palabra = document.getElementById('palabra');
        let li_letra;
        for(let i= 0; i < palabra.length; i++){
            console.log(palabra[i]);
            li_letra =document.getElementById("let"+i);
            ol_palabra.removeChild(li_letra);
        }
    }
}