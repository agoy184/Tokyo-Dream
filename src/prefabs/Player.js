class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene,x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = game.settings.obstacleSpeed;
    }

    update(){
        if (keyW.isDown && this.y >= 0) {
            this.y -= this.moveSpeed;
        } else if (keyS.isDown && this.y <= game.config.height - 55) {
            this.y += this.moveSpeed;
        }
        if (keyA.isDown && this.x >= 0) {
            this.x -= this.moveSpeed;
        } else if (keyD.isDown && this.x <= game.config.width - 55) {
            this.x += this.moveSpeed;
        }

    }
}