const gameState = {
    destroyed: false,
    baseLife: 100,
    endScene1: false,
    endScene2: false,
    endScene3: false,
    ensScene4: false,
    endScene5: false,
    playerCreated: false,
    startBombs: false,
    timerLevel2: 30,
    enemiesLeft: 15,

};
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            },
            //debug: true,
            enableBody: true,
        }
    },
    scene: [MW_US_Level_01_Story, MW_US_Level_02_BombDodge, MW_US_Level_03_Intermission, MW_US_Level_04_Base_Defense, MW_US_Level_05_Ending],
    backgroundColor: '#8B0000'
};

const game = new Phaser.Game(config);