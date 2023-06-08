/**
 * requirement
 * sprite image
 * text
 *  both inside a 2d array
 */

class Dialog {
    constructor(scene, dialog, show = false, isTalkingToSomeoneElse = false) {

        // set location of character icon
        this.charX = game.config.width / 8;
        this.charY = game.config.height - 75;

        // set text location
        // need setOrigin(0, 0).setWordWrapWidth(game.config.width / 1.5)
        //this.textX = game.config.width / 4;
        this.textX = game.config.width / 3.5;
        this.textY = game.config.height - 100;

        // dialog box location
        // need setOrigin(0, 0).setVisible(false)
        this.dialog_boxX = game.config.width / 1.65;
        this.dialog_boxY = game.config.height - 75;

        this.scene = scene;

        // 2D array, inner array has characer icon info and the text for that character
        this.dialog = dialog;

        // whether to show the dialog sprite
        this.show = show;

        // to not advance if clicked on another sprite
        this.isTalkingToSomeoneElse = isTalkingToSomeoneElse;

        this.finishedDialog = false;
    }

    create() {
        console.log("*", this.dialog, "*");
//        this.add.text(game.config.width / 3, game.config.height / 3, this.dialog);
    }

    update() {
        if (!getFinishedDialog()) {

        }

        // advance to next dialog when space is pressed
//        if (Phaser.Input.Keyboard.JustDown(this.scene.cursors.space)) {
//            console.log('pressed space');
//        }
    }

    // advances to the next dialog text
    changeText() {
    }

    // advances to the next dialog character
    changeCharacter() {
    }

    removeBackground() {
    }

    // gets the current information if the dialog is finished
    getFinishedDialog() {
        this.finishedDialog;
    }

    // sets the dialog to finished
    setFinishedDialog(isFinished) {
        this.finishedDialog = isFinished;
    }

    setIsShowing(willShow) {
        this.show = willShow;
    }
}
