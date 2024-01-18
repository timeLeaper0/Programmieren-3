const Lebewesen = require("./Lebewesen.js")
const utils = require("./hilfsfunktionen.js")
const RasenDestroyer = require("./rasendestroyer.js");
const Feuer = require("./feuer.js");
module.exports = class Gras extends Lebewesen {

    energie = 0;
    

    constructor(z, s) {
        super(z, s);
        matrix[this.zeile][this.spalte] = 1;
    };
    spielzug() {

       

            if (this.energie > 5) {
                this.pflanzNeuesGrasfeld();
                this.energie = 0;
            } else {
                this.energie++;
            }
        
            

            if (utils.randomNumber(0, 100000) === 1) {
                objekteArray.push(new Feuer(this.zeile, this.spalte));
            }

            if (utils.randomNumber(0, 1000) === 1) {
                objekteArray.push(new RasenDestroyer(this.zeile, this.spalte));
            }

        };
        pflanzNeuesGrasfeld() {
            let grasListe = this.gefilterteUmgebung(0)

            if (grasListe.length > 0) {
                let koordinate = grasListe[utils.randomNumber(0, grasListe.length)];
                grasArray.push(new Gras(koordinate[0], koordinate[1]));
            }
            return;
        }

    };