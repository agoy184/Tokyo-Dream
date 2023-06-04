class Dialog extends Phaser.GameObjects.Sprite {
    constructor(scene, dialog, character) {

        let x = game.config.width / 2;
        let y = game.config.height / 2;

        super(scene, x, y, character);

        this.dialog = dialog;
        this.character = character;

        scene.add.existing(this);
    }

    create() {
//        scene.add.text(this.dialog);
    }

    update() {
    }

}
