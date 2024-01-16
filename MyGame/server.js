const Gras = require("./classes/gras.js");
const Rasendestroyer = require("./classes/rasendestroyer.js");
const Feuer = require("./classes/feuer.js");
const Asche = require("./classes/asche.js");


const express = require("express");
const { ClientRequest } = require("http");
const { SocketAddress } = require("net");
const app = express();

let server = require("http").Server(app);
let io = require("socket.io")(server);

let clients = [];
let isGameRunning = false;
let interValID;

let i = 0;
matrix = createMatrix(100);
objekteArray = [];
jahreszeit = 0;

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
            jahreszeit= setInterval(seasons,4000);
            
        }

        socket.on("disconnect", function () {
            console.log("client left...");
            const foundIndex = clients.findIndex(id => id === socket.id);
            //client disconneted, finden, löschen
            if(foundIndex >= 0){
                clients.splice(foundIndex,1);
            }
            
            if (clients.length == 0) {
                isGameRunning = false;
                clearInterval(interValID);
                console.log("Spiel gestoppt: keine Clients", clients.length);
            }
        });

        socket.on("reset", function(){
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
    console.log("Sende Matrix zu clients...");
    io.sockets.emit("matrix", matrix);


}

function seasons(){
    console.log("neue Jahreszeit")
        jahreszeit++;
        if (jahreszeit >= 4) {
            jahreszeit = 0;
        }

    io.sockets.emit("Jahreszeit", jahreszeit)   
}

function updateGame() {
    //console.log("update game");
    for (let i = 0; i < objekteArray.length; i++) {
        objekteArray[i].spielzug();
    }
    // if (i % 100 === 0) {
    //     console.log("neue Jahreszeit")
    //     jahreszeiten++;
    //     if (jahreszeiten >= 4) {
    //         jahreszeiten = 0;
    //     }
    // }

    // i++;
    //console.log(matrix);
    //console.log("Sende Matrix zu clients...");
    io.sockets.emit("matrix", matrix);

}
