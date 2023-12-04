module.exports = class Square {
    constructor(side){
        this.side=side;
        this.area=side*side;
    }

 getParimeter(){
     return 4*this.side;
 }


}