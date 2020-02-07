class MW_US_Level_01_Story extends Phaser.Scene {
    constructor() {
        super({
            key: "MW_US_Level_01_Story",
        })
    }

    preload() {
        this.load.image('backgroundSky', 'static/assets-us/sky_mars.jpg'); //background image

    }

    create() {

        gameState.background1 = this.add.image(0, 0, 'backgroundSky').setOrigin(0, 0); // setting Background Image to center on the screen;



        gameState.skipText = this.add.text(300, 520, 'Click Anywhere To Skip', {
            fontSize: '15px',
            fill: '#000000'
        });

        gameState.storyText = this.add.text(60, 200, "Following the A.I uprising on Mars, The Red Planet lays in ruins.\nDespite Humanity's best efforts to contain this crisis the conflict\nescalated into a full scale war.", {
            fontSize: '18px',
            fill: '#000000'
        }).setOrigin(0, 0);



        setTimeout(function () {
            if (gameState.endScene1 != true) {
                gameState.storyText.setText(`The conflagration leaves in it's wake not only an ever increasing\nbody count and burned out circuit boards, but also a badly damaged\necosystem.\n\nLocal fauna and flora is slowly approaching its demise as many\nspecies have already perished.\n\nHowever, some have chosen to take a stand.`);
            }
        }, 8000)


        setTimeout(function () {
            if (gameState.endScene1 != true) {
                gameState.storyText.setText(`The semi sapient species of Xeramphi are wise enough to know that\nin the chaos the device which drives our galaxy could be destroyed,\n\nThe Quintillion Tesseract\n\nIn order to protect it they send their best scout to retrieve it.`);
            }
        }, 16000)

        setTimeout(function () {
            if (gameState.endScene1 != true) {
                gameState.storyText.setText(`Press Left Arrow to move left\n\nPress Right Arrow to move right \n\nPress Up arrow to shoot.`);
            }
        }, 24000)

        setTimeout(function () {
            if (gameState.endScene1 != true) {
                gameState.endScene1 = true;
            }
        }, 32000)

        this.input.on("pointerup", () => {


            console.log('restarted_scene');
            gameState.endScene1 = true;
        })


    }

    update() {

        if (gameState.endScene1 === true) {
            this.scene.stop('MW_US_Level_01_Story');
            this.scene.start('MW_US_Level_02_BombDodge');
        }

    }
}