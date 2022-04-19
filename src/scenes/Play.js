class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('platform', './assets/platform.png');
        this.load.image('player', './assets/player.png');
    }

    create(){
 
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
 
        // number of consecutive jumps made by the player
        this.playerJumps = 0;
 
        // adding a platform to the game, the arguments are platform width and x position
        this.addPlatform(game.config.width, game.config.width / 2);
 
        // adding the player;
        this.player = this.physics.add.sprite(game.settings.playerStartPosition, game.config.height / 2, "player");
        this.player.setGravityY(game.settings.playerGravity);
 
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);
 
        // checking for input
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
    //the player jumps when on the ground, or in the air if any jumps are left
    jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < game.settings.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(game.settings.jumpForce * -1);
            this.playerJumps++;
        }
    }
    update(){
        //game over
        if(this.player.y > game.config.height){
            this.scene.restart();
        }
        this.player.x = game.settings.playerStartPosition;

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

