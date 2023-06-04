class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
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
        this.add.text(game.config.width/2, game.config.height/2, 'Press SPACE to start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 3*game.config.height/4, 'Press D for credits', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // Play mode
            this.sound.play('sfx_select');
            this.scene.start("arrivalAndNeglectScene");    
          }
          if (Phaser.Input.Keyboard.JustDown(keyD)) {
            // Credits mode
            this.sound.play('sfx_select');
            this.scene.start("creditsScene");    
          }
    }
}