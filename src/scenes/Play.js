class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('Person', './assets/EmptyChibi.png')
        this.load.image('background', './assets/arrival_and_neglect_background.png')
    }

    create() {
        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'background').setOrigin(0.5, 0.5);

        this.grandpa = new Player(this, 200, 200, 'Person', 0)
        this.grandma = new Player(this, 240, 240, 'Person', 0)

        // Define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        this.grandpa.update();
        this.clock = this.time.delayedCall(3000, () => {
            this.grandma.update();
        }, null, this);


    }

}   
