var DungeonRoom = require("./DungeonRoom.js");

class DungeonGenerator {

    constructor(size, roomCount = 12) {
        this.size = size;
        this.roomCount = roomCount;

        this.map;
        this.rooms = new Array(roomCount);

        this.generateDungeon();
    }

    createEmptyMap() {
        //creates 2D array
        this.map = new Array(this.size);
        for (var i = 0; i < this.map.length; i++) {
            this.map[i] = new Array(this.size);
        }

        //Populates array with 0's
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                this.map[x][y] = 0;
            }
        }
    }

    generateDungeon() {
        this.createEmptyMap();
        //creates rooms;
        for (var i = 0; i < this.roomCount; i++) {
            this.rooms[i] = new DungeonRoom(this.map, 7, 12);
            this.drawRoom(i);
        }
        this.drawCorridors();
    }

    //draws rooms on the map
    drawRoom(i) {
        for (var x = this.rooms[i].getX(); x < this.rooms[i].getXBounds(); x++) {
            for (var y = this.rooms[i].getY(); y < this.rooms[i].getYBounds(); y++) {
                try {
                    this.map[x][y] = this.floorTile();
                } catch(err){
                    console.log(err);
                }
            }
        }

    }

    drawCorridors(){
        for(var i = 0; i < this.roomCount - 1; i++){
            if(i < this.roomCount + 1){
                
            }
        }
    }

    floorTile(){
        return (Math.floor(Math.random() * 21) == 0) ? 18 : 19;
    }

    getMap() {
        return this.map;
    }

}

module.exports = DungeonGenerator;