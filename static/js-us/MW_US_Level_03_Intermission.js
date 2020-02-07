class MW_US_Level_03_Intermission extends Phaser.Scene {
    constructor() {
        super({
            key: "MW_US_Level_03_Intermission"
        })
    }

    preload() {
        this.load.image('backgroundSky', 'static/assets-us/sky_mars.jpg'); //background image

    }

    create() {

        gameState.background1 = this.add.image(0, 0, 'backgroundSky').setOrigin(0, 0); // setting Background Image to center on the screen;



        gameState.storyText = this.add.text(60, 200, "Congratulations, you survived!", {
            fontSize: '18px',
            fill: '#000000'
        }).setOrigin(0, 0);

        setTimeout(function () {
            if (gameState.endScene3 != true) {
                gameState.storyText.setText(`You made your way to the base where the\nQuintillion Tesseract is being kept...`);
            }
        }, 3000)


        setTimeout(function () {
            if (gameState.endScene3 != true) {
                gameState.storyText.setText(`In the horizon an army of A.I tanks looms large,\nyou get into a tank. `);
            }
        }, 9000)

        setTimeout(function () {
            if (gameState.endScene3 != true) {
                gameState.storyText.setText(`You must protect the Quintillion Tesseract!`);
                gameState.endScene3 = true;
            }
        }, 12000)

        this.input.on("pointerup", () => {

            if (gameState.endScene3 === false) {
                console.log('restarted_scene');
                gameState.endScene3 = true;
            }
        })


    }


    update() {

        if (gameState.endScene3 === true) {
            gameState.storyText.destroy();
            this.scene.stop('MW_US_Level_03_Intermission');
            this.scene.start('MW_US_Level_04_Base_Defense');
        }

    }

}