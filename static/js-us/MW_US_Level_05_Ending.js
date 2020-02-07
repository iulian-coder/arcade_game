class MW_US_Level_05_Ending extends Phaser.Scene {
    constructor() {
        super({
            key: "MW_US_Level_05_Ending"
        })
    }

    preload() {
        this.load.image('backgroundSky', 'static/assets-us/sky_mars.jpg');
        this.load.audio('bgm5', 'static/assets-us/Fantascape_Looping.mp3');
        this.load.spritesheet("dude", "static/assets-us/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });




    }

    create() {

        gameState.backgroundImage = this.add.image(0, 0, 'backgroundSky').setOrigin(0, 0);
        gameState.player = this.physics.add.sprite(200, 200, 'dude').setScale(6.2);

        gameState.player.setCollideWorldBounds(true);
        gameState.player.body.setAllowGravity(false)

        gameState.storyText = this.add.text(300, 200, "Congratulations!\n You protected the Tesseract!", {
            fontSize: '24px',
            fill: '#000000'
        }).setOrigin(0, 0);


        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 4,
                end: 4
            }),
            frameRate: 3,
            repeat: -1

        })


        setTimeout(() => {
            if (gameState.endScene5 != true) {
                gameState.endScene5 === true;
            }

        }, 5000)

    }


    update() {

        gameState.player.anims.play('idle', true);

        if (gameState.endScene5 === true) {
            this.scene.stop('MW_US_Level_05_Ending');
        }
    }
}