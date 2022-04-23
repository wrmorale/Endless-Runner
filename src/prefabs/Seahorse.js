class Seahorse extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        // add object to existing scene

        this.myArcadeBody = scene.physics.add.sprite(game.settings.playerStartPosition, game.config.height / 2, texture);
        this.myArcadeBody.setGravityY(game.settings.playerGravity);
        

        // number of consecutive jumps made by the player
        this.playerJumps = 0;

        this.playerHadJumped = false;

    }

    //the player jumps when on the ground, or in the air if any jumps are left            
    update(){
        
        this.myArcadeBody.x = game.settings.playerStartPosition;
        this.myArcadeBody.setVelocityX(game.settings.platformStartSpeed);

    }

    

}