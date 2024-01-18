let matrix =[];
let jahreszeiten = 3;
let lenght= 100;
let seite = 500 / matrix.length




function main(){
    const socket = io();
    let button = document.getElementById("button");
    console.log('Ready to dispaly GoL...');
    


    function gotMatrix(data){
        
        matrix= data;
    }

    
    function neueJahreszeit(data){
        console.log("Hallo", data)
        jahreszeiten=data;  
    }

    socket.on("matrix", gotMatrix);


   socket.on("Jahreszeit", neueJahreszeit )


    function resetMatrix(){
        console.log("button geklicket...");
        socket.emit("reset");
    
    }
    
    button.onclick = resetMatrix;
}

function setup(){
    createCanvas(500,500);
}

function draw(){
    

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            quadrat(i, j, matrix[i][j])
        }
    }

   
        
      
}


let jahreszeitenFarben=[
    [235,235,235],//winter
    [34,139,34],//spring
    [147,154,84],//summer
    [166,94,47]//autumn
    
]

function quadrat(zeile, spalte, sw) {
    let farbe=jahreszeitenFarben[jahreszeiten]
    if (sw === 1) {
        fill(farbe[0],farbe[1],farbe[2])
    } else if (sw === 2) {
        fill(255, 0, 0);
    } else if (sw === 3) {
        fill(255, 191, 0);
    }else if (sw === 4){
        fill(143,143,142);
    }else {
        fill(209, 188, 138);
    }

    

    let seite = 500 / matrix.length
    rect(spalte * seite, zeile * seite, seite, seite)


    
};

window.onload= main;


