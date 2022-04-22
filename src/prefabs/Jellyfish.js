class Jellyfish extends Phaser.GameObjects.Sprite{
    constructor(scene, platformPool, platformGroup, texture){
        super(scene, platformPool, platformGroup, texture);

        this.group = platformGroup;
        this.pool = platformPool;
        this.nextPlatformDistance;
        this.scene = scene;
        this.texture = texture;

    }
    update(){

        //recyling platforms
        let minDistance = game.config.width;
        this.group.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth /2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < -platform.displayWidth /2){
                this.group.killAndHide(platform);
                this.group.remove(platform);
            }
        }, this);


        //adding new platforms 
        if(minDistance > this.nextPlatformDistance){
            var nextPlatformWidth = Phaser.Math.Between(game.settings.platformSizeRange[0],game.settings.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }

    }

    // platforms are added from the pool or generated
    addPlatform(platformWidth, posX){
        let platform;
        if(this.pool.getLength()){
            platform = this.pool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.pool.remove(platform);
        }
        else{
            platform = this.scene.physics.add.sprite(posX, game.config.height * 0.8, this.texture);
            
            platform.setImmovable(true);
            platform.setVelocityX(game.settings.platformStartSpeed * - 1);
            this.group.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(game.settings.spawnRange[0], game.settings.spawnRange[1]);
    }


}