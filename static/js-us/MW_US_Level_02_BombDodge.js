class MW_US_Level_02_BombDodge extends Phaser.Scene {
    constructor() {
        super({
            key: "MW_US_Level_02_BombDodge"
        })
    }


    preload() {
        this.load.image("background", "static/assets-us/BackgroundSky.jpg");
        this.load.spritesheet("dude", "static/assets-us/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.image("bomb", "static/assets-us/towerDefense_tile251.png");
        this.load.image("ground", "static/assets-us/ground.png");

    }


    create() {

        gameState.backGround = this.add.image(0, 0, "background").setOrigin(0, 0);
        gameState.storyText = this.add.text(60, 200, "You hear a whistling noise. You look up to the sky and see \nwhat appears to be a ...BOMB!\nJust survive!", {
            fontSize: '18px',
            fill: '#000000'
        }).setOrigin(0, 0);



        gameState.player = this.physics.add.sprite(200, 570, 'dude').setScale(.2)
        gameState.bombs = this.physics.add.group();

        const placeBombs = () => {
            let x = Math.random() * 800;

            let bomb = gameState.bombs.create(x, 10, 'bomb').setScale(.5)
            bomb.flipY = true;
        }

        const decreaseTime = () => {
            gameState.timerLevel2 -= 1;
        }

        gameState.genBombs = this.time.addEvent({
            delay: 5000,
            callback: placeBombs,
            callbackScope: this,
            loop: true,
            paused: true,
        })

        gameState.elaspseTime = this.time.addEvent({
            delay: 1000,
            callback: decreaseTime,
            callbackScope: this,
            loop: true,
            paused: true,
        })

        setTimeout(function () {
            if (gameState.playerCreated === false) {
                gameState.storyText.setText(``);
                gameState.player.setScale(1.2)
                gameState.player.setCollideWorldBounds(true);
                gameState.player.flipX = true;
                gameState.playerCreated = true;
                gameState.startBombs = true;
                gameState.genBombs.delay = 200;
                gameState.genBombs.paused = false;
                gameState.elaspseTime.paused = false;

            }
        }, 3000);




        gameState.keys = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 1,
                end: 3
            }),
            frameRate: 3,
            repeat: -1

        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 4,
                end: 4
            }),
            frameRate: 3,
            repeat: -1

        })


        this.physics.add.collider(gameState.player, gameState.bombs, () => {

            gameState.genBombs.paused = true
            this.physics.pause();
            gameState.elaspseTime.destroy();
            gameState.timerLevel2 = 30;
            this.anims.pauseAll();
            gameState.playerCreated = false;
            this.add.text(60, 200, 'Game Over', {
                fontSize: '15px',
                fill: '#ffd700'
            });
            this.add.text(60, 220, 'Click to Restart', {
                fontSize: '15px',
                fill: '#ffd700'
            });

            this.input.on('pointerup', () => {

                this.scene.restart();
            });
        })


        gameState.timerText = this.add.text(20, 20, "Survive: 30s")
    }


    update() {
        if (gameState.playerCreated === true) {
            if (gameState.keys.right.isDown) {
                gameState.player.flipX = true
                gameState.player.anims.play('move', true);
                gameState.player.setVelocityX(500);
            } else if (gameState.keys.left.isDown) {
                gameState.player.flipX = false
                gameState.player.anims.play('move', true);
                gameState.player.setVelocityX(-500);
            } else {
                gameState.player.setVelocityX(0);
                gameState.player.anims.play('idle', true);

            }
            console.log(gameState.timerLevel2)
        }

        if (gameState.timerLevel2 <= 0) {

            gameState.timerText.setText(``);
            gameState.genBombs.paused = true;
            gameState.genBombs.destroy();
            for (let child of gameState.bombs.getChildren()) {
                child.body.setSize(0, 0);
                child.setScale(0.000001);
            }
            setTimeout(() => {
                this.scene.stop('MW_US_Level_02_BombDodge');
                this.scene.start('MW_US_Level_03_Intermission');
            }, 2000)

        } else {
            gameState.timerText.setText(`Survive: ${gameState.timerLevel2}`);
        }

    }
}