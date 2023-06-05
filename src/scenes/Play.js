class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('Person', './assets/EmptyChibi.png')
    }

    create() {
        this.grandpa = new Player(this, 200, 200, 'Person', 0).setOrigin(0, 0);
        this.grandma = new Player(this, 300, 300, 'Person', 0).setOrigin(0, 0);

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

        //if(this.checkCollision(this.grandpa, this.grandma) || this.checkCollision(this.hydrant2, this.grandma)) {
        if(this.checkCollision(this.grandpa, this.grandma)) {
            if (keyD.isDown) {
                //this.grandma.x -= this.grandpa.moveSpeed;
            }
        }

    }

    checkCollision(grandpa, grandma) {
        if (grandpa.x < grandma.x + grandma.width &&
            grandpa.x + grandpa.width > grandma.x &&
            grandpa.y < grandma.y + grandma.height &&
            grandpa.height + grandpa.y > grandma.y) {
                return true;
            } else {
                return false;
            }
    }

}   
