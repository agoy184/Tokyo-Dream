class Departure extends Phaser.Scene {
    constructor() {
        super('departureScene');
    }

    init(data) {
        this.music = data.music
    }

    create() {
        // background
        const map = this.add.tilemap('s2OceanJSON');
        const mapGround = this.add.tilemap('s2GroundJSON');
        const wallset = mapGround.addTilesetImage('monoJPWallset', 'wallset');
        const oceanset = map.addTilesetImage('monoBasicBeach', 'ocean');

        const oceanLayer = map.createLayer('ocean', oceanset, 0, 0);
        const groundLayer = mapGround.createLayer('ground', wallset, 0, 0);

        // disable user input until scene is fully faded in
        this.input.keyboard.enabled = false;

        // music
        this.tween = this.tweens.add({
            targets: this.music,
            volume: {from: 0, to: 1},
            duration: 2000,
        });

        this.grandpa = new Player(this, game.config.width / 2.25, game.config.height / 1.5, 'Shukichi', 0);
        this.grandma = new Player(this, game.config.width / 1.75, game.config.height / 1.75, 'Tomi', 0);

        // script for the scene
        this.hotelScript = [
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

        // fade scene in from black at start of scene
        this.cam = this.cameras.main.fadeIn(2000, 0, 0, 0);

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