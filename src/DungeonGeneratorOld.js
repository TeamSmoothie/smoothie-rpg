class DungeonGenerator {

    constructor(width, height, roomCount = 7) {
        this.width = width;
        this.height = height;
        this.roomCount = roomCount;
        this.map = null;
        this.rooms = new Array(this.roomCount);
        this.generateDungeon()
    }

    generateDungeon() {
        this.createEmptyMap();

        for(var i = 0; i < this.roomCount; i++){
            this.createRoom(7, 15);
        }
        
        this.renderWalls();
    }

    createEmptyMap() {
        //Creates a two dimensional array
        this.map = new Array(this.width);
        for (var i = 0; i < this.map.length; i++) {
            this.map[i] = new Array(this.height);
        }

        //Fills 2D array with 0's
        for (var x = 0; x < this.map.length; x++) {
            for (var y = 0; y < this.map[x].length; y++) {
                this.map[x][y] = 0;
            }
        }
    }

    createRoom(minSize = 1, maxSize = 10){
        var roomX = Math.floor(Math.random() * this.width),
            roomY = Math.floor(Math.random() * this.height),
            roomWidth = Math.floor(Math.random() * (maxSize + 1 - minSize) ) + minSize,
            roomHeight = Math.floor(Math.random() * (maxSize + 1 - minSize) ) + minSize;
        
        console.log(`min size is: ${minSize} and max size is ${maxSize}`);
        console.log(`${roomWidth}, ${roomHeight}`);
        
        //checks if it can place the current size room at the position, if not it runs the function again until it can
        if(this.roomIsValid(roomX, roomY, roomWidth, roomHeight)){
            for(var x = roomX; x < roomX + roomWidth; x++){
                for(var y = roomY; y < roomY + roomHeight; y++){
                    if(Math.floor(Math.random() * 21) == 0){
                        this.map[x][y] = 18;
                    } else {
                        this.map[x][y] = 19;
                    }
                }
            }
        } else {
            this.createRoom(minSize, maxSize);
        }

        return {roomX, roomY, roomWidth, roomHeight};

    }

    roomIsValid(roomX, roomY, roomWidth, roomHeight){
        //checks if room is in bounds of the map to avoid errors
        if(roomX + roomWidth + 1 < this.width && roomY + roomHeight + 2 < this.height && roomX - 1 > 0 && roomY - 1 > 0){
            //iterates through map at room location to ensure there isn't a room already there 
            for(var x = roomX - 1; x < roomX + roomWidth + 1; x++){
                for(var y = roomY - 3; y < roomY + roomHeight + 3; y++){
                    if(this.map[x][y] != 0 ){
                        return false;
                    }
                }
            }
        } else { 
            return false;
        }
        return true
    }

    renderWalls(){
        for(var x = 0; x < this.width; x++){
            for(var y = 0; y < this.height; y++){
                if(x + 1 < this.width && y + 1 < this.height && this.map[x][y] == 0){
                    if(this.map[x][y + 1] == 18 || this.map[x][y + 1] == 19){
                        //this.map[x][y] = 9;
                    } else if([18, 19].includes(this.map[x + 1][y]) ){
                        //this.map[x][y] = 27;
                        this.map[x][y] = 10;
                    }
                }
            }
        }
    }

    getMap(){
        return this.map;
    }
    
}

//module.exports = DungeonGenerator;