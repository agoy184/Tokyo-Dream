class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
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

        // music credits
        this.add.text(game.config.width/4, game.config.height/2.5, 'First Scene Music\nGreener Pastures by Darren Curtis | https://www.darrencurtismusic.com/\nMusic promoted by https://www.chosic.com/free-music/all/\nCreative Commons CC BY 3.0\nhttps://creativecommons.org/licenses/by/3.0/', menuConfig).setWordWrapWidth(game.config.width / 2).setAlign('center').setFontSize(10).setOrigin(0.5);
        this.add.text(game.config.width/1.35, game.config.height/2.5, 'Second Scene Music\nSakuya2 by PeriTune | http://peritune.com\nCreative Commons Attribution 3.0 Unported License\nhttps://creativecommons.org/licenses/by/3.0/deed.en_US\nMusic promoted by https://www.chosic.com/free-music/all/', menuConfig).setWordWrapWidth(game.config.width / 2.5).setAlign('center').setFontSize(10).setOrigin(0.5);
        this.add.text(game.config.width/4, game.config.height/1.5, 'Third Scene Music\nRain On The Window by Alex-Productions | https://onsound.eu/\nMusic promoted by https://www.free-stock-music.com\nCreative Commons / Attribution 3.0 Unported License (CC BY 3.0)\nhttps://creativecommons.org/licenses/by/3.0/deed.en_US', menuConfig).setWordWrapWidth(game.config.width / 2.5).setAlign('center').setFontSize(10).setOrigin(0.5);

        this.add.text(game.config.width/2, 8*game.config.height/9, 'Press S to return to the title screen menu', menuConfig).setOrigin(0.5);

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            this.scene.start("menuScene");    
          }
    }

}