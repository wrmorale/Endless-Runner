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
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // menu text

        this.add.text(game.config.width/2, game.config.height/2,' Press Space to start \n or click the screen \n \n click the screen to jump up to two times', menuConfig).setOrigin(0.5);

        //define key
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.pointer = this.input.activePointer;

    }
    update(){

        if(Phaser.Input.Keyboard.JustDown(keySpace) || this.pointer.isDown ){
            game.settings = {
                platformStartSpeed: 350, 
                //spawn range, how far the rightmost platform should be from the right edge
                //before the next platform spawns in
                spawnRange: [80, 100],
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
                jumpForce: 500, 
                //player starting x position
                playerStartPosition: 150, 
                //consecutive jumps allowed
                jumps: 2
            }
            this.scene.start('playScene');
        }

    }

}