class DungeonRoom {
    
    constructor(map, maxSize, minSize){
        this.map = map;
        this.maxSize = maxSize;
        this.minSize = minSize;

        this.xPos;
        this.yPos;
        this.height;
        this.width;

        this.createRoom();
    }

    //TODO
    roomIsValid(width, height, xPos, yPos){
        //checks if inbounds of map

        var xBounds = xPos + width,
            yBounds = yPos + height,
            xRange = 3,
            yRange = 5;

        if( !(xPos - xRange > 0 && 
            0 < yPos - yRange && 
            yBounds + yRange < this.map.length - 1 && 
            this.map.length - 1 > xBounds + xRange)
        ){
            return false;
        } else {
            var x = xPos - xRange,
                y = yPos - yRange,
                isInbounds = true;

            while(isInbounds){
                if(x < xBounds + xRange){
                    if(this.map[x][y] != 0){
                        return false;
                    }
                    x++;
                } else if(y < yBounds + yRange) {
                    x = xPos - xRange;
                    y++;
                } else {
                    isInbounds = false;
                }
            }
        }
        return true;

    }

    createRoom(){
        var randHeight = Math.floor(Math.random() * (this.maxSize + 1 - this.minSize) ) + this.minSize,
            randWidth = Math.floor(Math.random() * (this.maxSize + 1 - this.minSize) ) + this.minSize,
            randX = Math.floor(Math.random() * this.map.length),
            randY = Math.floor(Math.random() * this.map[0].length);
        //console.log(this.roomIsValid(randWidth, randHeight, randX, randY));
        if(this.roomIsValid(randWidth, randHeight, randX, randY)){
            this.width = randWidth;
            this.height = randHeight;
            this.xPos = randX;
            this.yPos = randY;
        } else {
            this.createRoom();
        }

    }

    getX() {
        return this.xPos;
    }

    getY() {
        return this.yPos;
    }

    getWidth() {
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    getXBounds(){
        return this.xPos + this.width;
    }

    getYBounds(){
        return this.yPos + this.height;
    }

    getRoomCenter(){
        var xCenter = Math.round(this.xPos + (this.width / 2)),
            yCenter = Math.round(this.yPos + (this.height / 2));
        return [xCenter, yCenter];
    }

}

module.exports = DungeonRoom;