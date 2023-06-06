class Hotel_and_Departure extends Phaser.Scene {
    constructor() {
        super("hotelAndDepartureScene")
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2, 'Scene 2').setOrigin(0.5, 0.5);;

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
            volume: {from: 0, to: 1},
            duration: 5000,
        });

        // temp to advance to next scene
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // fade scene in from black at start of scene
        this.cam = this.cameras.main.fadeIn(5000, 0, 0, 0);

        // enable player input after camera finished fading in
        this.cam.on('camerafadeincomplete', function() {
            this.scene.input.keyboard.enabled = true;
            }
        );

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.endScene();
        }
    }

    endScene() {
        this.input.keyboard.enabled = false;
    
        this.cam = this.cameras.main.fadeOut(5000, 0, 0, 0);
    
        this.tween = this.tweens.add({
            targets: this.music,
            volume: {from: 1, to: 0},
            duration: 5000,
            onComplete: () => {
                this.music.stop();
                this.scene.start('funeralScene')
            }
        });
    }
}