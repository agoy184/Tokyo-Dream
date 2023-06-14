class Ending extends Phaser.Scene {
    constructor() {
        super("endingScene")
    }

    create() {
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 1)');
        this.add.text(game.config.width / 2, game.config.height / 2, "“No one can serve his parents beyond the grave”").setOrigin(0.5, 0.5);;

        this.cam = this.cameras.main.fadeIn(2000, 0, 0, 0);

        this.time.delayedCall(5000, () => {
            this.cam = this.cameras.main.fadeOut(10000, 0, 0, 0);
            this.cam.on('camerafadeoutcomplete', () => {
                this.scene.start('menuScene');
            });
         });

    }

       
}