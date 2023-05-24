class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }

    preload() {
        this.load.audio('sfx_select', './assets/pop.wav');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '28px',
            backgroundColor: '#F41D1D',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // menu text
        this.add.text(game.config.width/2, game.config.height/4, 'Tokyo Dream', menuConfig).setOrigin(0.5);

    }

    update(){
      
    }
}