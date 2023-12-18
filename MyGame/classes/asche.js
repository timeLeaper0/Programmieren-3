const Gras = require("./gras.js");
const utils = require("./hilfsfunktionen.js");
module.exports = class Asche {
    zeile;
    spalte;
    energie = 100;
    constructor(z, s) {
        this.zeile = z;
        this.spalte = s;
        matrix[this.zeile][this.spalte] = 4;
    };
    spielzug() {
        if (this.energie === 0) {
            matrix[this.zeile][this.spalte] = 0;
            // if (utils.randomNumber(0, 10) === 1) {
            //     objekteArray.push(new Gras(this.zeile, this.spalte));
            // }
            utils.löschObjekt(this.zeile, this.spalte, objekteArray);
        }
        else {
            this.energie--;

        };
    };
};
