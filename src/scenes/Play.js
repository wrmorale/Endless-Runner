class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('platform', './assets/platform.png');
        this.load.image('player', './assets/player.png');
        this.load.image('oceanfield', './assets/oceanfield.png');
        this.load.atlas('seahorse', './assets/seahorse.png', './assets/seahorse.json');
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
 

        // adding a platform to the game, the arguments are platform width and x position
        this.addPlatform(game.config.width, game.config.width / 2);
 
        // adding the player;
        this.horse = new Seahorse(this,game.settings.playerStartPosition, game.config.height / 2, 'seahorse', 0 );
        
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

       
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.horse.myArcadeBody, this.platformGroup);

        this.input.on("pointerdown", this.jump, this);
 
    }
    // platforms are added from the pool or generated
    addPlatform(platformWidth, posX){
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }
        else{
            platform = this.physics.add.sprite(posX, game.config.height * 0.8, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(game.settings.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(game.settings.spawnRange[0], game.settings.spawnRange[1]);
    }

    jump(){
        if(this.horse.myArcadeBody.body.touching.down || (this.playerJumps > 0 && this.playerJumps < game.settings.jumps)){
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

        this.oceanfield.tilePositionX -= 1;

        this.horse.myArcadeBody.x = game.settings.playerStartPosition;

        //this.horse.update();

        //recyling platforms
        let minDistance = game.config.width;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth /2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < -platform.displayWidth /2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
        //adding new platforms 
        if(minDistance > this.nextPlatformDistance){
            var nextPlatformWidth = Phaser.Math.Between(game.settings.platformSizeRange[0],game.settings.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }
    }


    


}

