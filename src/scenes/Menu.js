class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){

    }
    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: 'red',
            color: 'black',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // menu text

        this.add.text(game.config.width/2, game.config.height/2,' Press Space to start', menuConfig).setOrigin(0.5);

        //define key
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update(){

        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            game.settings = {
                platformStartSpeed: 350, 
                //spawn range, how far the rightmost platform should be from the right edge
                //before the next platform spawns in
                spawnRange: [80, 300],
                //platform width range, might be useless in my implementation
                platformSizeRange:[90,300],
                //a height range between rightmost platform and next platform to be spawned
                platformHeightRange: [-5,5],
                //a scale to be multiplied by platform HeightRange
                platformHeightScale: 20, 
                //platform max and min height
                platformVerticalLimit: [0.4,0.8],
                //player Gravity
                playerGravity: 900,
                //player jump force 
                jumpForce: 400, 
                //player starting x position
                playerStartPosition: 200, 
                //consecutive jumps allowed
                jumps: 2
            }
            this.scene.start('playScene');
        }

    }

}