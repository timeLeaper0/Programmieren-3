const Lebewesen = require("./Lebewesen.js")
const utils = require("./hilfsfunktionen.js")
module.exports = class RasenDestroyer extends Lebewesen{
    energie = 15;
    
    platziereSelbstInMatrix() {
      matrix[this.zeile][this.spalte] = 2;
    };
  
    constructor(z, s) {
      super(z, s);
      matrix[this.zeile][this.spalte] = 2;
      this.platziereSelbstInMatrix()
    };
    spielzug() {
      if (this.energie > 30) {
        this.platzierNeuesObjekt();
        this.energie = 15;
      } else if (this.energie > 0) {
        this.machSchritt();
      } else {
        matrix[this.zeile][this.spalte] = 0;
        utils.löschObjekt(this.zeile, this.spalte, objekteArray);
      }
    };
    platzierNeuesObjekt() {
      let erdeListe = this.gefilterteUmgebung(0)
  
      if (erdeListe.length > 0) {
        let koordinate = erdeListe[utils.randomNumber(0, erdeListe.length)];
        objekteArray.push(new RasenDestroyer(koordinate[0], koordinate[1]));
      }
      return;
    }
  
  
    machSchritt() {
      this.getNewCoordinates()
      let grasListe = this.gefilterteUmgebung(1)
  
      if (grasListe.length > 0) {
        let koordinate = grasListe[utils.randomNumber(0, grasListe.length)];
        matrix[this.zeile][this.spalte] = 0;
        utils.löschObjekt(koordinate[0], koordinate[1], objekteArray);
        this.zeile = koordinate[0];
        this.spalte = koordinate[1];
        matrix[this.zeile][this.spalte] = 2;
        this.energie++
      }
      else {
        this.energie--
      }
      return;
    };
  }
  