class Load extends Phaser.Scene {
    constructor(){
        super('preLoad')
    }

    preload() {
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, game.config.height/2, game.config.width * value, 10);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = 'assets/';

        // load audio
        this.load.audio('scene_1_background_music', 'audio/Greener_Pastures-Darren_Curtis.mp3');
        this.load.audio('scene_2_background_music', 'audio/Sakuya2-PerituneMaterial.mp3');
        this.load.audio('scene_3_background_music', 'audio/Rain_on_the_Window-Alex_Productions.mp3');
        this.load.audio('sfx_select', 'audio/pop.wav');

        // load images
        // temp images
        this.load.image('Person', 'EmptyChibi.png')
        this.load.image('ship', 'smallship.png');
        this.load.image('bigShip', 'spaceship.png');
        this.load.image('rocket', 'rocket.png');

        // dialog images
        this.load.image('Person', 'EmptyChibi.png')
        this.load.image('shuukichi', 'shuukichi_medium.png');
        this.load.image('tomi', 'tomi_medium.png');
        this.load.image('shige', 'shige_medium.png');
        this.load.image('noriko', 'noriko_medium.png');
        this.load.image('koichi', 'koichi_medium.png');
 
    }

    create() {
        this.scene.start('menuScene');
    }
}