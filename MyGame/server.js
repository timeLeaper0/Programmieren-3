const Gras = require("./classes/gras.js");
const Rasendestroyer = require("./classes/rasendestroyer.js");
const Feuer = require("./classes/feuer.js");
const Asche = require("./classes/asche.js");


const express = require("express");
const app = express();

let server = require("http").Server(app);
let io = require("socket.io")(server);

server.listen(3000, function(){
  console.log("Der Server läuft auf Port 3000...")
  initGame();
  setInterval(function(){
      updateGame();
  },1000);
}, );

//game logic on server

i = 0;
matrix = createMatrix(100);
objekteArray = [];
jahreszeiten = 0;

function createMatrix(length) {
    let matrix = [];
    for (let zeile = 0; zeile < length; zeile++) {
        matrix.push([]);
        for (let spalte = 0; spalte < length; spalte++) {
            matrix[zeile][spalte] = 0;
        }
    }
    return matrix
}


function initGame(){
    console.log("init game")
    objekteArray.push(new Gras(45,45));
    

}

function updateGame(){
    console.log("update game");
    for (let i = 0; i < objekteArray.length; i++) {
        objekteArray[i].spielzug();
    }
    if (i % 100 === 0) {
        console.log("neue Jahreszeit")
        jahreszeiten++;
        if (jahreszeiten >= 4) {
            jahreszeiten = 0;
        }
    }

    i++;
console.log(matrix)

}