class Load extends Phaser.Scene {
    constructor(){
        super('preLoad')
    }

    preload() {
        this.add.text(game.config.width / 2, game.config.height / 2.5, 'Loading...').setOrigin(0.5, 0.5);
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

        // background audio
        this.load.audio('scene_1_background_music', 'audio/Greener_Pastures-Darren_Curtis.mp3');
        this.load.audio('scene_2_background_music', 'audio/Sakuya2-PerituneMaterial.mp3');
        this.load.audio('scene_3_background_music', 'audio/Rain_on_the_Window-Alex_Productions.mp3');

        //sfx
        this.load.audio('sfx_select', 'audio/pop.wav');
        this.load.audio('open_container', ['audio/open_container.wav', 'audio/open_container.mp3', 'audio/open_container.ogg']);
        this.load.audio('tele_ring', ['audio/uk-old-104244.mp3']);

        // load images
        // temp images
        this.load.image('Tomi', 'tomi_spr.png')
        this.load.image('Shukichi', 'shukichi_spr.png')
        this.load.image('ShukichiL', 'shukichi_spr_L.png')
        this.load.image('ShukichiR', 'shukichi_spr_R.png')
        this.load.image('ShukichiB', 'shukichi_spr_B.png')
        this.load.image('Shige', 'shige_spr.png')
        this.load.image('Koichi', 'koichi_spr.png')
        this.load.image('Noriko', 'noriko_spr.png')
        this.load.image('Person', 'old_sprites/EmptyChibi.png')
        this.load.image('ship', 'old_sprites/smallship.png');
        this.load.image('bigShip', 'old_sprites/spaceship.png');
        this.load.image('rocket', 'old_sprites/rocket.png');

        // background images
        this.load.image('arrival_and_neglect_background', 'arrival_and_neglect_background.png')

        // dialog images
        this.load.image('dialog_box', 'dialog_box.png');
        this.load.image('Shukichi_Dialog', 'shukichi_cu.png');
        this.load.image('Tomi_Dialog', 'tomi_cu.png');
        this.load.image('Shige_Dialog', 'shige_cu.png');
        this.load.image('Noriko_Dialog', 'noriko_cu.png');
        this.load.image('Koichi_Dialog', 'koichi_cu.png');
    }

    create() {
        this.scene.start('menuScene');
    }
}
