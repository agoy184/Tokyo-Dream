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
        //this.grandma.update();
        console.log(this.grandpa.x)

        //if(this.checkCollision(this.grandpa, this.grandma) || this.checkCollision(this.hydrant2, this.grandma)) {
        if(this.checkCollision(this.grandpa, this.grandma)) {
            console.log("collide")
            if (keyW.isDown) {
                this.grandpa.y += this.grandpa.moveSpeed;
            }
            if (keyS.isDown) {
                this.grandpa.y -= this.grandpa.moveSpeed;
            }
            if (keyA.isDown) {
                this.grandpa.x += this.grandpa.moveSpeed;
            }
            if (keyD.isDown) {
                this.grandpa.x -= this.grandpa.moveSpeed;
            }
        }

    }

    checkCollision(grandpa, grandma) {
        if (grandpa.x < grandma.x + 51 &&
            grandpa.x + 51 > grandma.x &&
            grandpa.y < grandma.y + 128 &&
            grandpa.y + 128 > grandma.y) {
                return true;
            } else {
                return false;
            }
    }

}   
