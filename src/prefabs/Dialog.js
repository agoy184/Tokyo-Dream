/**
 * requirement
 * sprite image
 * text
 *  both inside a 2d array
 */

class Dialog {
    constructor(scene, dialog, spriteX, spriteY, show) {

        this.x = spriteX;
        this.y = spriteY;

        this.scene = scene;
        this.dialog = dialog;

        this.show = show;
    }

    create() {
        console.log("*", this.dialog, "*");
//        this.add.text(game.config.width / 3, game.config.height / 3, this.dialog);
    }

    update() {
        // advance to next dialog when space is pressed
//        if (Phaser.Input.Keyboard.JustDown(this.scene.cursors.space)) {
//            console.log('pressed space');
//        }
    }

}
