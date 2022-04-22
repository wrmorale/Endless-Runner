let config = {
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480, 
    scene: [ Menu, Play ], 

    physics: {
        default: "arcade", 
        arcade: {
            debug: false
        }
    }
}

let game = new Phaser.Game(config);


let keySpace;