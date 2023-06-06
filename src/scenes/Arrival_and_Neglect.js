class Arrival_and_Neglect extends Phaser.Scene {
    constructor() {
        super('arrivalAndNeglectScene');
    }

    create() {
        // disable user input until scene is fully faded in
        this.input.keyboard.enabled = false;

        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'arrival_and_neglect_background').setOrigin(0.5, 0.5);

        let musicConfig = {
            volume: 0,
            loop: true,
        }

        this.music = this.sound.add('scene_1_background_music');
        this.music.play(musicConfig);

        // fade music in at start of scene
        this.tween = this.tweens.add({
            targets: this.music,
            volume: {from: 0, to: 1},
            duration: 5000,
        });

       // temp to advance to next scene
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.grandpa = new Player(this, 200, 200, 'Person', 0)
        this.grandma = new Player(this, 240, 240, 'Person', 0)

        // Define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // fade scene in from black at start of scene
        this.cam = this.cameras.main.fadeIn(5000, 0, 0, 0);

        // enable player input after camera finished fading in
        this.cam.on('camerafadeincomplete', function() {
            this.scene.input.keyboard.enabled = true;
            }
        );
     }

    update() {
        this.grandpa.update();
        this.clock = this.time.delayedCall(3000, () => {
            this.grandma.update();
        }, null, this);

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
                this.scene.start('hotelAndDepartureScene')
            }
        });
    }
}   
