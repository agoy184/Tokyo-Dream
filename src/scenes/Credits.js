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
        this.add.text(game.config.width/2, 2*game.config.height/9, 'Film game is based on: Tokyo Story (1953)', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 8*game.config.height/9, 'Press S to return to the title screen menu', menuConfig).setOrigin(0.5);

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            this.scene.start("menuScene");    
          }
    }

}