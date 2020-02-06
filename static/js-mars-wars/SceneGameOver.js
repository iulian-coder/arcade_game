class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: "SceneGameOver" });
    };

    preload() {
        this.load.image("sky", "static/assets-mars-wars/sky_mars.jpg");
        this.load.image("sprBg0", "static/assets-mars-wars/sprBg0.png");
        this.load.image("sprBg1", "static/assets-mars-wars/sprBg1.png");
        this.load.image("sprBtnPlay", "static/assets-mars-wars/sprBtnPlay.png");
        this.load.image("sprBtnPlayHover", "static/assets-mars-wars/sprBtnPlayHover.png");
        this.load.image("sprBtnRestart", "static/assets-mars-wars/sprBtnRestart.png");
        this.load.image("sprBtnRestartHover", "static/assets-mars-wars/sprBtnRestartHover.png");
        
    
    };

    create() {
        
        this.add.image(400, 300, 'sky');
        

        this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#270040',
            align: 'center'
          });
        this.title.setOrigin(0.5);

        
        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnRestart"
        );
        this.btnRestart.setInteractive();
        this.btnRestart.on("pointerover", function() {
            this.btnRestart.setTexture("sprBtnRestartHover");
        }, this);
        this.btnRestart.on("pointerout", function() {
            this.setTexture("sprBtnRestart");
        });
        this.btnRestart.on("pointerdown", function() {
            this.btnRestart.setTexture("sprBtnRestartHover");
        }, this);
        this.btnRestart.on("pointerup", function() {
            this.btnRestart.setTexture("sprBtnRestart");
            timeAirRaid = 0;
            this.scene.start("SceneAirRaid");
        }, this);
    }


    update() {

    };


}
