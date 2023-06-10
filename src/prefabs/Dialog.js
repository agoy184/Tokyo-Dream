/**
 * requirement
 * sprite image
 * text
 *  both inside a 2d array
 * is talking to another sprite?
 * display or not
 */

class Dialog {
    constructor(scene, dialog, show = false, isTalkingToMe = false, isTalkingToSomeoneElse = false) {

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
        this.dialogBoxX = game.config.width / 1.65;
        this.dialogBoxY = game.config.height - 75;

        this.scene = scene;

        // 2D array, inner array has characer icon info and the text for that character
        this.dialog = dialog;

        // whether to show the dialog sprite
        this.show = show;

        // to know when to advance when talking to this character
        this.isTalkingToMe = isTalkingToMe;

        // to not advance if clicked on another sprite
        this.isTalkingToSomeoneElse = isTalkingToSomeoneElse;

        this.finishedDialog = false;

        //this.currDialogIndex = -1;
        this.currDialogIndex = 0;

        this.dialogBox = this.scene.add.image(this.dialogBoxX, this.dialogBoxY, 'dialog_box').setOrigin(0.5, 0.5).setVisible(false);
        this.currCharacter = this.scene.add.image(this.charX, this.charY, this.dialog[0][0]).setVisible(false);
        this.currText = this.scene.add.text(this.textX, this.textY, this.dialog[0][1]).setOrigin(0, 0).setWordWrapWidth(game.config.width / 1.5).setVisible(false);
    }

    update() {
//        console.log("*", this.dialog, "*");

        // return back to beginning of update function since finished dialog
        if (this.getFinishedDialog()) {
            return;
        }

        // advance to next dialog when space is pressed
        if (Phaser.Input.Keyboard.JustDown(this.scene.cursors.space)) {
            console.log('scrip length: ', this.dialog.length);
            // get out if is talking to another sprite
            if (this.isTalkingToSomeoneElse) {
                return;
            }

            console.log(this.currDialogIndex);
            if (this.currDialogIndex >= this.dialog.length - 1) {
                // remove all dialog visuals
                this.currCharacter.setVisible(false);
                this.currText.setVisible(false);
                this.dialogBox.setVisible(false);

                // TODO: depending on character, remove that sprite (?)
                // change conditionals
                this.setFinishedDialog(true);
                this.isTalkingToMe = false;

                return;
            }

            //if (this.currDialogIndex == -1) {
            if (this.currDialogIndex == 0) {
                this.dialogBox.setVisible(true);
                this.currCharacter.setVisible(true);
                this.currText.setVisible(true);

                this.isTalkingToMe = true;
            }

            this.currCharacter.setTexture(this.dialog[this.currDialogIndex][0]);
            this.currText.setText(this.dialog[this.currDialogIndex][1]);

            ++this.currDialogIndex;

            // TODO: display the character and text

            //for (let i = 0; i < this.dialog.length; ++i) {
            //     console.log('character: ', this.dialog[i][0]);
            //     console.log('text: ', this.dialog[i][1]);
            //}
        }

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
        return this.finishedDialog;
    }

    // sets the dialog to finished
    setFinishedDialog(isFinished) {
        this.finishedDialog = isFinished;
    }

    setIsShowing(willShow) {
        this.show = willShow;
    }
}
