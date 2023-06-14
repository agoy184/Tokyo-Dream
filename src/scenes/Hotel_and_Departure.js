class Hotel_and_Departure extends Phaser.Scene {
    constructor() {
        super("hotelAndDepartureScene")
    }

    create() {
        // disable user input until scene is fully faded in
        this.input.keyboard.enabled = false;

        let musicConfig = {
            volume: 0,
            loop: true,
        }

        this.music = this.sound.add('scene_2_background_music');
        this.music.play(musicConfig);
        this.tween = this.tweens.add({
            targets: this.music,
            volume: {from: 0, to: 0.5},
            duration: 5000,
        });

        this.grandpa = this.physics.add.sprite(150, 270, 'Shukichi', 0);
        this.grandma = this.physics.add.sprite(240, 270, 'Tomi', 0);

        // script for the scene
        this.hotelScript = [
            ["Tomi_Dialog", "It was so nice of our kids to invite us to Atami, I haven’t been able to experience a spa."],
            ["Shukichi_Dialog", "Very true, however we ended up being another financial burden to them."],
            ["Tomi_Dialog", "The maids told me the ocean looks peaceful here, I can’t wait to see it tomorrow."],
            ["Shukichi_Dialog", "Neither can I, we should get some rest so we can enjoy the day tomorrow."],
            ["pause", 3000],
            ["Shukichi_Dialog", "However it seems like this hotel is more for the younger generation."],
            ["Tomi_Dialog", "That’s true, not only is there music playing, but the heat and mosquitoes makes it uncomfortable to sleep as well."],
            ["Shukichi_Dialog", "Luckily we have fans to cool us down as much as we can. Let’s get some sleep in, otherwise we will be too tired to see the ocean."],
            ["pause", 5000],
            ["Tomi_Dialog", "I wonder how Kyoko is doing at home."],
            ["Shukichi_Dialog", "I wonder..."],
            ["Shukichi_Dialog", "Shall we go home?"],
            ["Tomi_Dialog", "Homesick already?"],
            ["Shukichi_Dialog", "Nah, we’ve seen everything, we’ve seen our children, we’ve visited Tokyo, we’ve visited Atami, it’s probably time to go home."],
            ["Tomi_Dialog", "That sounds good."],
            ["Tomi_Dialog", "Ah..."],
            ["pause", 3000],
            ["Shukichi_Dialog", "What’s wrong?"],
            ["Tomi_Dialog", "I got a bit dizzy, but I’m okay now."],
            ["Shukichi_Dialog", "That’s because you didn’t sleep."],
            ["Tomi_Dialog", "You’re probably right."],
        ];

        this.hotelDialog = new Dialog(this, this.hotelScript, true, true, false);

        // to advance next dialog
        this.cursors = this.input.keyboard.createCursorKeys();

        // to give a "night feel"
        this.cameras.main.setAlpha(0.5);
        // fade scene in from black at start of scene
        this.cam = this.cameras.main.fadeIn(5000, 0, 0, 0);

        // to start the dialog update
        this.dialogReady = false;

        // enable player input after camera finished fading in
        this.cam.on('camerafadeincomplete', function() {
            this.scene.input.keyboard.enabled = true;
            this.scene.hotelDialog.update();
            this.scene.dialogReady = true;
            }
        );

        this.end = false;
    }

    update() {
        // have reached the end of the scene, return
        if (this.end) {
            return
        }

        // update the dialog when camera finished fading in
        if (this.dialogReady && this.hotelDialog.getIsTalkingToMe()) {
            this.hotelDialog.update();
        }

        // once reached the "end of the night" in the dialog
        if (this.hotelDialog.getCurrDialogIndex() == 8) {
            this.tweens.add({
                targets: this.cameras.main,
                alpha: {from: this.cameras.main.alpha, to: 1},
                duration: 500,
            });

        }

        // start end of scene once finished dialog
        if (this.hotelDialog.getFinishedDialog()) {
            this.end = true;
            this.endScene();
        }
    }

    // End scene transitions
    endScene() {
        this.input.keyboard.enabled = false;
    
        this.cam = this.cameras.main.fadeOut(5000, 0, 0, 0);
    
        this.tween = this.tweens.add({
            targets: this.music,
            volume: {from: this.music.volume, to: 0},
            duration: 5000,
            onComplete: () => {
                this.music.stop();
                this.scene.start('funeralScene')
            }
        });
    }
}