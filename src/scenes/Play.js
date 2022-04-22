class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){

        this.load.image('platform', './assets/platform.png');
        this.load.image('player', './assets/player.png');
        this.load.image('oceanfield', './assets/oceanfield.png');
        this.load.atlas('seahorse', './assets/seahorse.png', './assets/seahorse.json');
        this.load.atlas('jellyfish', './assets/jellyfishplatform.png', './assets/jellyfish.json');



    }

    create(){

        this.oceanfield = this.add.tileSprite(0,0, game.config.width, game.config.height, 'oceanfield').setOrigin(0,0);

 
        // group with all active platforms.
        this.platformGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }

        });
 
        // pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }

        });
        //this.physics.add.sprite(posX, game.config.height * 0.8, "jellyfish")
        this.jellyfish = new Jellyfish(this, this.platformPool, this.platformGroup, 'jellyfish' );

        // adding a platform to the game, the arguments are platform width and x position
        //this.addPlatform(game.config.width, game.config.width / 2);
        
        this.jellyfish.addPlatform(game.config.width, game.config.width/2);

        // adding the player;
        this.horse = new Seahorse(this,game.settings.playerStartPosition, game.config.height * 0.7 , 'seahorse', 0 );
        
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNames('seahorse', {
                prefix: 'run', 
                start: 0, 
                end: 19, 
                first: 0, 
                zeroPad: 2}),
                frameRate: 10,
                repeat: -1
        });

        this.horse.myArcadeBody.anims.play('move');

        this.anims.create({
            key: 'jam', 
            frames: this.anims.generateFrameNames('jellyfish', {
                prefix: 'jellyfish', 
                start: 0, 
                end: 1,
                first: 0, 
                zeroPad: 1}), 
                frameRate: 15, 
                repeat: -1
        });

        //this.platformGroup.play('jam');
       
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.horse.myArcadeBody, this.platformGroup);

        this.input.on("pointerdown", this.jump, this);
 
    }

    jump(){
        
        if(this.horse.myArcadeBody.body.touching.down || (this.horse.playerJumps > 0 && this.horse.playerJumps < game.settings.jumps)){
            
            if(this.horse.myArcadeBody.body.touching.down){
                this.horse.playerJumps = 0;  
            }

            this.horse.myArcadeBody.setVelocityY(game.settings.jumpForce * -1);
            this.horse.playerJumps++;
            
        }

    }
    
    update(){
        //game over
        if(this.horse.myArcadeBody.y > game.config.height){
            this.scene.restart();
        }

        this.oceanfield.tilePositionX += .5;

        this.horse.update();
        
        this.jellyfish.update();        

        

    }


    


}

