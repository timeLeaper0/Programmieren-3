const os = require("os");

let message = "the operating system is";

function main(){
    console.log(message+os.platform());
}

main();