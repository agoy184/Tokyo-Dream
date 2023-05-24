class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    preload(){

    }

    create(){
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '17px',
            backgroundColor: '#F41D1D',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // menu text
        this.add.text(game.config.width/2, game.config.height/9, 'Credits', menuConfig).setOrigin(0.5);

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            this.scene.start("menuScene");    
          }
    }

}