export default class clase_vidas {

    vidas = 0;
    vidas_permanentes = 0;
    constructor() {
        this.vidas = 5;
        this.vidas_permanentes = 5;
        console.log("En el constructor -> " + this.vidas);
    }
    //usando funciones arrow.
    getVidasPermanentes = () => this.vidas_permanentes;
    getVidas = () => this.vidas;

    crearVidas() {
        console.log("creando vidas " + this.vidas_permanentes);
        for (let i = 0; i < this.vidas_permanentes; i++) {
            let li = document.createElement('li');
            let img_caza = document.createElement('img');
            img_caza.setAttribute("src", "../imagenes/caza.png");
            img_caza.setAttribute('width', '95px')
            li.setAttribute("id", "corazon_" + (i + 1));
            li.appendChild(img_caza);
            let ol_vidas = document.getElementById('vidas');
            ol_vidas.appendChild(li);
        }
    }
    //función arrow
    establecervida = (idboton) => {
        console.log("función arrow ->" +  idboton);
        var trozos = idboton.split('_');
        var modo = trozos[1];
        if (modo == "hardcore") {
            this.vidas = 3;
            this.vidas_permanentes = 3;
        } else if (modo == "facil") {
            this.vidas = 7;
            this.vidas_permanentes = 7;
        } else {
            this.vidas = 5;
            this.vidas_permanentes = 5;
        }
    }
    borrarVidas() {
        console.log(this.vidas_permanentes);
        let ol_vidas = document.getElementById('vidas');
        let li_corazon;

        for (let i = 0; i < this.vidas_permanentes; i++) {
            li_corazon = document.getElementById("corazon_" + (i + 1));
            ol_vidas.removeChild(li_corazon);
        }
    }

}