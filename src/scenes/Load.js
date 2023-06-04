class Load extends Phaser.Scene {
    constructor() {
        super('preLoad');
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

        this.load.path = './assets/';

        // audio
        this.load.audio('sfx_select', './pop.wav');

        // images
        this.load.image('Person', './EmptyChibi.png')
        this.load.image('ship', './smallship.png');
        this.load.image('shuukichi', './shuukichi_medium.png');
    }

    create() {
        this.scene.start('menuScene');
    }
}
