class MW_US_Level_04_Base_Defense extends Phaser.Scene {
    constructor() {
        super({
            key: "MW_US_Level_04_Base_Defense"
        })
    }

    preload() {

        this.load.image('player_tank', 'static/assets-us/towerDefense_tile249.png');
        this.load.image('background', 'static/assets-us/BackgroundSky.jpg');
        this.load.image('base', 'static/assets-us/scifiStructure_01.png');
        this.load.image('enemy_tank', 'static/assets-us/towerDefense_tile250.png');
        this.load.image('player_laser', 'static/assets-us/PlayerLaser.png');
        this.load.image('enemy_laser', 'static/assets-us/EnemyLaser.png');


    }

    create() {



        gameState.background2 = this.add.image(0, 0, "background").setOrigin(0, 0);
        gameState.player2 = this.physics.add.sprite(200, 570, 'player_tank');

        const baseGroup = this.physics.add.staticGroup();
        gameState.base = this.physics.add.sprite(100, 570, 'base');
        gameState.base.setScale(2.3);
        gameState.base.body.setAllowGravity(false);

        gameState.player2.setCollideWorldBounds(true);
        gameState.base.setCollideWorldBounds(true);

        gameState.bullet = this.physics.add.group();
        gameState.keys = this.input.keyboard.createCursorKeys()

        // setTimeout(function () {
        //     if (gameState.endScene4 != true) {
        //         gameState.endScene4 = true;
        //     }
        // }, 5000)

        gameState.enemies = this.physics.add.staticGroup();

        const placeEnemies = () => {
            let x = (Math.random()) * 750
            let y = [20, 30, 40];

            let enemy = gameState.enemies.create(x, y[Math.floor(Math.random() * y.length)], 'enemy_tank')
            enemy.flipY = true;
        }
        gameState.enemyBullet = this.physics.add.group();
        const generateEnenmyBullets = () => {
            if (gameState.enemies.getChildren().length > 0) {
                let random_enemy = Phaser.Utils.Array.GetRandom(gameState.enemies.getChildren());
                let angleDeg = (Math.atan2(random_enemy.y - gameState.base.y, random_enemy.x - gameState.base.x) * 180 / Math.PI);
                let bullet = gameState.enemyBullet.create(random_enemy.x, random_enemy.y, 'enemy_laser').setAngle(angleDeg);
                bullet.body.setAllowGravity(false)
                this.physics.moveToObject(bullet, gameState.base, 5000, 1000);
            }
        }

        gameState.genEnemyBullets = this.time.addEvent({
            delay: 4000,
            callback: generateEnenmyBullets,
            callbackScope: this,
            loop: true,
        })

        gameState.genEnemy = this.time.addEvent({
            delay: 4000,
            callback: placeEnemies,
            callbackScope: this,
            loop: true,
        })
        // const placeBase = () => {
        //     gameState.base = this.physics.add.sprite(100, 570, 'base');
        //     gameState.base.setScale(2.3);
        //     gameState.base.body.setAllowGravity(false);
        // }
        // gameState.addBase = this.time.addEvent({
        //     delay: 100,
        //     callback: placeBase,
        //     callbackScope: this,
        //     loop: true,
        //     paused: true,
        // })
        this.physics.add.collider(gameState.bullet, gameState.enemies, function (bull, enem) {
            bull.destroy();
            enem.destroy();
            gameState.enemiesLeft -= 1
        })

        this.physics.add.collider(gameState.bullet, gameState.enemyBullet, function (bull, bullenem) {
            bull.destroy();
            bullenem.destroy();
        })

        this.physics.add.collider(gameState.enemyBullet, gameState.base, (bull) => {

            bull.setVisible(false);
            gameState.baseLife -= 100;

        })

        this.physics.add.collider(gameState.player, gameState.enemyBullet, () => {

            gameState.enemyBullet.paused = true
            this.physics.pause();
            this.anims.pauseAll();
            this.add.text(60, 200, 'Game Over', {
                fontSize: '15px',
                fill: '#ffd700'
            });
            this.add.text(60, 220, 'Click to Restart', {
                fontSize: '15px',
                fill: '#ffd700'
            });
            gameState.baseLife = 100;
            gameState.enemiesLeft = 15;
            this.input.on('pointerup', () => {

                this.scene.restart();
            });
        })

        gameState.timerText = this.add.text(20, 20, "Enemies Left: 15");
        gameState.timerText2 = this.add.text(20, 40, "Base Life: 100")
    }


    update() {
        gameState.timerText.setText(`Enemies Left: ${gameState.enemiesLeft}`);
        gameState.timerText2.setText(`Base Life: ${gameState.baseLife}`)
        if (gameState.keys.right.isDown) {
            gameState.player2.setVelocityX(500);
        } else if (gameState.keys.left.isDown) {
            gameState.player2.setVelocityX(-500);
        } else {
            gameState.player2.setVelocityX(0);

        }
        if (Phaser.Input.Keyboard.JustDown(gameState.keys.up)) {
            gameState.bullet.create(gameState.player2.x, gameState.player2.y, 'player_laser').setGravityY(-3000);
        }

        if (gameState.enemiesLeft <= 0) {
            gameState.endScene4 = true;
        }
        if (gameState.baseLife <= 0) {
            this.physics.pause();
            this.add.text(60, 200, 'Game Over', {
                fontSize: '15px',
                fill: '#ffd700'
            });
            this.add.text(60, 220, 'Click to Restart', {
                fontSize: '15px',
                fill: '#ffd700'
            });
            gameState.baseLife = 100;
            gameState.enemiesLeft = 15;
            gameState.genEnemyBullets.paused = true;
            gameState.genEnemyBullets.destroy();
            gameState.genEnemy.paused = true;
            gameState.genEnemy.destroy();
            for (let child of gameState.enemyBullet.getChildren()) {
                child.body.setSize(0, 0);
                child.setScale(0.000001);
            }
            for (let child of gameState.enemies.getChildren()) {
                child.body.setSize(0, 0);
                child.setScale(0.000001);
            }
            this.input.on('pointerup', () => {

                this.scene.restart();
            });
        }
        if (gameState.endScene4 === true) {
            console.log('Has Stoped!')

            gameState.timerText.setText(``);
            gameState.timerText2.setText(``);
            gameState.genEnemyBullets.paused = true;
            gameState.genEnemyBullets.destroy();
            gameState.genEnemy.paused = true;
            gameState.genEnemy.destroy();
            for (let child of gameState.enemyBullet.getChildren()) {
                child.body.setSize(0, 0);
                child.setScale(0.000001);
            }
            for (let child of gameState.enemies.getChildren()) {
                child.body.setSize(0, 0);
                child.setScale(0.000001);
            }
            this.scene.stop('MW_US_Level_04_Base_Defense');
            this.scene.start('MW_US_Level_05_Ending');

        }

    }
}