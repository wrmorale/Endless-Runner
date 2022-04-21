let config = {
    type: Phaser.CANVAS, 
    width: 1334, 
    height: 750, 
    scene: [ Menu, Play ], 

    physics: {
        default: "arcade", 
        arcade: {
            debug: true
        }
    }
}

let game = new Phaser.Game(config);


let keySpace;