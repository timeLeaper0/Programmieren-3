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


matrix = createMatrix(100);
objekteArray = [];
let jahreszeit = 0;
let beginnendeJahreszeit = -1;


app.use(express.static("./client"));

app.get("/", function (req, res) {
    res.redirect("index.html")
})

server.listen(3000, function () {
    console.log("Der Server läuft auf Port 3000...")

    io.on("connection", function (socket) {
        console.log("ws connection established...")
        //socket.emit("matrix", matrix);
        clients.push(socket.id);

        if (clients.length == 1 && isGameRunning == false) {
            console.log("Starting Game...")
            initGame();
            interValID = setInterval(updateGame, 100);
            isGameRunning = true;
            intervalSeasonID = setInterval(seasons, 10000);
           
            
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
    console.log("init game");
    objekteArray.push(new Gras(45, 45));
    jahreszeit = 0;
    beginnendeJahreszeit = 0;
    io.sockets.emit("beginnende Jahreszeit", beginnendeJahreszeit);
    console.log("beginnendeJahrszeit: "+beginnendeJahreszeit);

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
        
        if (
            //Gras.prototype.isPrototypeOf(objekt)
            Gras === objekt
            ) {
            console.log("is it working until here?"+ " yes!")
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
    //console.log("update game");
    for (let i = 0; i < objekteArray.length; i++) {
        //console.log(objekteArray.length)
        objekteArray[i].spielzug();
       
        

       


        
        //grasArray[i].spielzug();
        //console.log("grasssssssss");
    }
   
    let anzahlGras = grasFilter();
    //console.log(anzahlGras.length)

    if (anzahlGras.length <= 6) {
        //console.log("zu wenig grass");
        
        
        objekteArray.push(new Gras(utils.randomNumber(0,matrix.length),utils.randomNumber(0,matrix.length)));
        
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
