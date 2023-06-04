class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {

        this.grandpa = new Player(this, 200, 200, 'Person', 0)
        this.grandma = new Player(this, 240, 240, 'Person', 0)

        // Define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        this.dialog = new Dialog(this, 'hello', 'shuukichi');

        // temp to figure out pressing on sprite to show dialog
        this.ship = this.add.image(game.config.width / 2, game.config.height / 2, 'ship').setOrigin(0.5, 0.5).setInteractive();
        
        this.input.on('pointerup', dialog);
    }

    update() {
        this.grandpa.update();
        this.clock = this.time.delayedCall(3000, () => {
            this.grandma.update();
        }, null, this);


    }

}   

function dialog(pointer, gameObject) {
    console.log('clicked on sprite');
   
    if (gameObject == 0) {
        return;
    }

    console.log(gameObject[0].x, gameObject[0].y);

}

