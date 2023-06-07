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
        this.add.text(game.config.width/2, game.config.height/6, 'Tokyo Dream', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.5, 'Controls\nWASD to move\nClick on sprites for dialog\nENTER for next scene', menuConfig).setAlign('center').setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.5, 'Press SPACE to start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.25, 'Press D for credits', menuConfig).setOrigin(0.5);

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
