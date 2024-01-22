const Gras = require("./classes/gras.js");
const Rasendestroyer = require("./classes/rasendestroyer.js");
const Feuer = require("./classes/feuer.js");
const Asche = require("./classes/asche.js");
const utils = require("./classes/hilfsfunktionen.js")


const express = require("express");
const { ClientRequest } = require("http");
const { SocketAddress } = require("net");
const app = express();

let server = require("http").Server(app);
let io = require("socket.io")(server);

let clients = [];
let isGameRunning = false;
let interValID;
let intervalSeasonID;

let i = 0;
matrix = createMatrix(100);
objekteArray = [];
let jahreszeit = 0;

app.use(express.static("./client"));

app.get("/", function (req, res) {
    res.redirect("index.html")
})

server.listen(3000, function () {
    console.log("Der Server läuft auf Port 3000...")

    //   initGame();
    //   setInterval(function(){
    //       updateGame();
    //   },1000);
    // }, );

    io.on("connection", function (socket) {
        console.log("ws connection established...")
        //socket.emit("matrix", matrix);
        clients.push(socket.id);

        if (clients.length == 1 && isGameRunning == false) {
            console.log("Starting Game...")
            initGame();
            interValID = setInterval(updateGame, 100);
            isGameRunning = true;
            //set interval für jahreszeit
            intervalSeasonID = setInterval(seasons, 1000);
            //setTimeout(intervalSeasonID,25000);
        }

        socket.on("disconnect", function () {
            console.log("client left...");
            const foundIndex = clients.findIndex(id => id === socket.id);
            //client disconneted, finden, löschen
            if (foundIndex >= 0) {
                clients.splice(foundIndex, 1);
            }

            if (clients.length == 0) {
                isGameRunning = false;
                clearInterval(interValID);
                console.log("Spiel gestoppt: keine Clients", clients.length);
            }
        });

        socket.on("reset", function () {
            console.log("resete matrix...");
            matrix = createMatrix(100);
            objekteArray = [];


            initGame();
            //interValID = setInterval(updateGame, 100);


        });

    })

});
//game logic on server


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


function initGame() {
    console.log("init game")
    objekteArray.push(new Gras(45, 45));

    //also working

    //for (i = 0; i <= 6; i++) {
        //objekteArray.push(new Gras(utils.randomNumber(0,matrix.length),utils.randomNumber(0,matrix.length)));
        //}

    //also working


    console.log("Sende Matrix zu clients...");
    io.sockets.emit("matrix", matrix);


}

//gras aus objekte array filtern, anzahl gras objekte zählen, wenn anzahl gras gleich oder weniger als 6 -> mehr gras erstellen lassen

function grasFilter() {
    //console.log("filtern.....")
    let gefiltertesGras = [];
    for (let i = 0; i < objekteArray.length; i++) {
        
        let objekt = objekteArray[i];
        //console.log("typeof "+ typeof objekt)
        if (Gras.prototype.isPrototypeOf(objekt)) {
            //console.log("is it working until here?"+ " no!")
            gefiltertesGras.push(objekt)
            console.log("gefiltertesGras:"+gefiltertesGras.length)
        }
        //console.log(gefiltertesGras.length)
        
        
    }
    
    return gefiltertesGras;
}




function seasons() {
    if (jahreszeit >= 3) {
        console.log("000000000000")
        jahreszeit = -1;
    }
    jahreszeit++;
    console.log("neue Jahreszeit", jahreszeit)
    io.sockets.emit("Jahreszeit", jahreszeit)
}

function updateGame() {
    console.log("update game");
    for (let i = 0; i < objekteArray.length; i++) {
        //console.log(objekteArray.length)
        objekteArray[i].spielzug();
       
        

       


        
        //grasArray[i].spielzug();
        //console.log("grasssssssss");
    }
   
    let anzahlGras = grasFilter();
    //console.log(anzahlGras.length)

    if (anzahlGras.length < 7) {
        //console.log("zu wenig grass");
        objekteArray.push(new Gras(100, 100));
        //for (i = 0; i <= 6; i++) {
            //objekteArray.push(new Gras(utils.randomNumber(0,matrix.length),utils.randomNumber(0,matrix.length)));
        //}

    }



    // if (grasArray.length <= 6){
    //grasArray.push(new Gras(utils.randomNumber(0,matrix.length),utils.randomNumber(0,matrix.length)));
    // }

   

    //console.log(matrix);
    //console.log("Sende Matrix zu clients...");
    io.sockets.emit("matrix", matrix);

}
