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
                spawnRange: [100, 350],
                platformSizeRange:[50,250], 
                playerGravity: 900, 
                jumpForce: 400, 
                playerStartPosition: 200, 
                jumps: 2
            }
            this.scene.start('playScene');
        }

    }

}