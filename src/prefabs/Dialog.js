class Dialog {
    constructor(scene, dialog, character) {

        let x = game.config.width / 2;
        let y = game.config.height / 2;

//        super(scene, x, y, character);

        this.dialog = dialog;
        this.character = character;

        //scene.add.existing(this);
    }

    create() {
        console.log("*", this.dialog, "*");
//        this.add.text(game.config.width / 3, game.config.height / 3, this.dialog);
    }

    update() {
    }

}
