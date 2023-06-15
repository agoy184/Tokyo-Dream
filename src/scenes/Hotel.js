class Hotel extends Phaser.Scene {
    constructor() {
        super("hotelScene")
    }

    create() {
        // background
        const map = this.add.tilemap('s2HotelJSON');
        const wallset = map.addTilesetImage('monoJPWallset', 'wallset');

        const walls = map.createLayer('background', wallset, 0, 0);

        // disable user input until scene is fully faded in
        this.input.keyboard.enabled = false;

        // music
        let musicConfig = {
            volume: 0,
            loop: true,
        }

        this.music = this.sound.add('scene_2_background_music');
        this.music.play(musicConfig);
        this.tween = this.tweens.add({
            targets: this.music,
            volume: {from: 0, to: 0.5},
            duration: 3000,
        });

        this.grandpa = new Player(this, game.config.width / 2.25, game.config.height / 1.75, 'Shukichi', 0);
        this.grandma = new Player(this, game.config.width / 3.5, game.config.height / 2.25, 'Tomi', 0);

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
        ];

        this.hotelDialog = new Dialog(this, this.hotelScript, true, true, false);

        // to advance next dialog
        this.cursors = this.input.keyboard.createCursorKeys();

        // fade scene in from black at start of scene
        this.cam = this.cameras.main.fadeIn(3000, 0, 0, 0);

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
    
        this.cam = this.cameras.main.fadeOut(1500, 0, 0, 0);

        this.cam.on('camerafadeoutcomplete', () => {
            this.scene.start('departureScene', {music: this.music});
        });
    
    }
}