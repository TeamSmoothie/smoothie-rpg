var Phaser = require('phaser');
var DungeonGenerator = require('./DungeonGenerator.js');

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image("dungeon-tiles", "./assets/tiles.png");
}

let controls;

function create() {
    var dungeon = new DungeonGenerator(80);
    var map = this.make.tilemap({ data: dungeon.getMap(), tileWidth: 16, tileHeight: 16 });
    var tileset = map.addTilesetImage('dungeon-tiles');
    var layer = map.createStaticLayer(0, tileset, 0, 0);

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

    // Set up the arrows to control the camera
    const cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5
    });

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}

function update(time, delta) {
    controls.update(delta);
}