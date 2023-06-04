class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {

        // this.player = new Player(this, 200, 200, '', 0)
        
        this.dialog = new Dialog(this, 'hello', 'shuukichi');

        // temp to figure out pressing on sprite to show dialog
        this.ship = this.add.image(game.config.width / 2, game.config.height / 2, 'ship').setOrigin(0.5, 0.5).setInteractive();
        
        this.input.on('pointerup', dialog);
    }

    update() {

    }

}   

function dialog(pointer, gameObject) {
    console.log('clicked on sprite');
   
    if (gameObject == 0) {
        return;
    }

    console.log(gameObject[0].x, gameObject[0].y);

}

