class Funeral extends Phaser.Scene {
    constructor() {
        super("funeralScene")
    }

    create() {
        const map = this.add.tilemap('s3JSON');
        const tileset = map.addTilesetImage('monoJPWallset', 'wallset');

        const bgLayer = map.createLayer('background', tileset, 0, 0);
        const walls = map.createLayer('walls', tileset, 0, 0);

        // disable user input until scene is fully faded in
        this.input.keyboard.enabled = false;

        // music
        let musicConfig = {
            volume: 0,
            loop: true,
        }
        this.music = this.sound.add('scene_3_background_music');
        this.music.play(musicConfig);

        // fade music in at start of scene
        this.tween = this.tweens.add({
            targets: this.music,
            volume: {from: 0, to: 1},
            duration: 5000,
        });

        // Define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.grandpa = this.physics.add.sprite(150, 270, 'ShukichiSad', 0);

        // dialog for Shige
        this.shigeScript = [
            ["Shige_Dialog_Sad", 0.5, "How could this have happened?"],
            ["Shige_Dialog_Sad", "She looked so healthy in Tokyo."],
            ["Shukichi_Dialog_Sad", "I don’t know…"],
            ["Shukichi_Dialog_Sad", "Actually I remember she felt dizzy once when we were at Atami, but I didn’t think it was serious."],
            ["Shige_Dialog_Sad", "Why didn’t you tell us?! Koichi could’ve checked on her!"],
            ["Shige_Dialog_Sad", "I should’ve asked my workers to take over when she visited, I didn’t get to spend much much time with her."],
            
        ];

        // dialog for Koichi
        this.koichiScript = [
            ["Koichi_Dialog_Sad", 0.5, "It’s quite unfortunate this had to happen."],
            ["Shukichi_Dialog_Sad", "Yes, no one was expecting this."],
            ["Koichi_Dialog_Sad", "Shige told me mother was dizzy at Atami, but I don’t think that was the cause of her death."],
            ["Shukichi_Dialog_Sad", "Ah really? Well that puts me a little bit more at ease."],
            ["Koichi_Dialog_Sad", "There’s other factors that could have affected it, but we don’t know. However, I’m glad she came to Tokyo. It’s unfortunate my schedule was so busy."],
            
        ];

        // dialog for Kyoko
        this.kyokoScript = [
            ["Kyoko_Dialog_Sad", 0.5, "The trip might have been too much for her."],
            ["Shukichi_Dialog_Sad", "Possibly, unfortunately we don’t know the cause."],
            ["Kyoko_Dialog_Sad", "I should’ve convinced Mother to stay at home. Koichi, Shige, and Keizo should’ve taken time off to visit."],
            ["Shukichi_Dialog_Sad", "But Kyoko, they’re busy with their own lives…"],
            ["Kyoko_Dialog_Sad", "What’s the point of family if they’re like that?"],
            
        ];

        // dialog for Keizo
        this.keizoScript = [
            ["Keizo_Dialog_Sad", 0.5, "Sorry Father, I came too late."],
            ["Shukichi_Dialog_Sad", "That’s alright, you’re here now, that’s all that matters. I’m sure your mother appreciates it."],
            ["Keizo_Dialog_Sad", "I wasn’t a very good son. I can’t lose her now."],
            
        ];

        // dialoog for Noriko
        this.norikoScript = [
            ["Shukichi_Dialog_Sad", 0.5, "Thank you for coming back to our hometown to mourn her."],
            ["Noriko_Dialog_Sad", "It’s nothing, it’s the least I can do."],
            ["Shukichi_Dialog_Sad", "Mother told me that she’s very happy to have spent time with you. It was her most favorite time visiting Tokyo."],
            ["pause", 2000],
            ["Shukichi_Dialog_Sad", "Forget about Shouji, he’s dead. It’s time for you to find happiness. It hurt the both of us to see you like this. I want to see you happily married."],
            ["Noriko_Dialog_Sad", "No, it’s not like that."],
            ["Shukichi_Dialog_Sad", "Mother said she’s never met a nicer woman than you."],
            ["Noriko_Dialog_Sad", "She’s wrong, I’m not the nice woman she thinks I am. I’m quite selfish actually. I’ve gone days without thinking of Shouji."],
            ["Noriko_Dialog_Sad", "Sometimes I feel like I can’t go on like this forever. Days and nights go by where I feel a great sense of loneliness."],
            ["Noriko_Dialog_Sad", "My heart seems to be waiting for something. I couldn't have said this to her."],
            ["Shukichi_Dialog_Sad", "You are truly a good woman. An honest woman."],
            ["Noriko_Dialog_Sad", "Not at all."],
            ["pause", 3000],
            ["Shukichi_Dialog_Sad", "Here’s a watch of hers, it’s old fashioned. But please take it for her sake. And please believe me, I want you to be happy."],
            ["pause", 3000],
            ["Shukichi_Dialog_Sad", "It’s strange. We have children of our own, yet you’ve done the most for us, and you’re not even a blood relative. Thank you."],
        ];

        // characters
        this.shige = this.add.image(game.config.width / 10, game.config.height / 5, 'ShigeSad').setOrigin(0.5, 0.5).setInteractive();
        this.koichi = this.add.image(game.config.width / 2, game.config.height / 5, 'KoichiSad').setOrigin(0.5, 0.5).setInteractive();
        this.noriko = this.add.image(game.config.width / 1.25, game.config.height / 1.75, 'NorikoSad').setOrigin(0.5, 0.5).setInteractive();
        this.keizo = this.add.image(game.config.width / 3, game.config.height / 2, 'Keizo').setOrigin(0.5, 0.5).setInteractive();
        this.kyoko = this.add.image(game.config.width / 4, game.config.height / 7, 'Kyoko').setOrigin(0.5, 0.5).setInteractive();
     
        // dialog once player collides with one of the characters
        this.shigeDialog = new Dialog(this, this.shigeScript, false, false, false);
        this.norikoDialog = new Dialog(this, this.norikoScript, false, false, false);
        this.koichiDialog = new Dialog(this, this.koichiScript, false, false, false);
        this.keizoDialog = new Dialog(this, this.keizoScript, false, false, false);
        this.kyokoDialog = new Dialog(this, this.kyokoScript, false, false, false);

        // to advance next dialog
        this.cursors = this.input.keyboard.createCursorKeys();

        // fade scene in from black at start of scene
        this.cam = this.cameras.main.fadeIn(5000, 0, 0, 0);

        // enable player input after camera finished fading in
        this.cam.on('camerafadeincomplete', function() {
            this.scene.input.keyboard.enabled = true;
            }
        );

        this.end = false;
    }

    update() {
        // don't continue in update once the scene is over
        if (this.end) {
            return;
        }

        // Shukichi moves
        this.movePlayer(this.grandpa);

        // check collision with Shige
        if(this.checkCollision(this.grandpa, this.shige)) {
            if (!this.shigeDialog.getIsShowing() && !this.shigeDialog.getIsTalkingToSomeoneElse()) {
                this.shigeDialog.setIsShowing(true);
                this.shigeDialog.setIsTalkingToMe(true);

                this.norikoDialog.setIsTalkingToSomeoneElse(true);
                this.koichiDialog.setIsTalkingToSomeoneElse(true);
                this.keizoDialog.setIsTalkingToSomeoneElse(true);
                this.kyokoDialog.setIsTalkingToSomeoneElse(true);
            }
                
            this.stopPlayer(this.grandpa);

        // check collision with Koichi, talk to him after talking to Shige
        } else if (this.checkCollision(this.grandpa, this.koichi)) {
            if (this.shigeDialog.getFinishedDialog() && !this.koichiDialog.getIsShowing() && !this.koichiDialog.getIsTalkingToSomeoneElse()) {
                this.koichiDialog.setIsShowing(true);
                this.koichiDialog.setIsTalkingToMe(true);

                this.norikoDialog.setIsTalkingToSomeoneElse(true);
                this.shigeDialog.setIsTalkingToSomeoneElse(true);
                this.keizoDialog.setIsTalkingToSomeoneElse(true);
                this.kyokoDialog.setIsTalkingToSomeoneElse(true);
              }

            this.stopPlayer(this.grandpa);

        // check collision with Keizo
        } else if (this.checkCollision(this.grandpa, this.keizo)) {
            if (!this.keizoDialog.getIsShowing() && !this.keizoDialog.getIsTalkingToSomeoneElse()) {
                this.keizoDialog.setIsShowing(true);
                this.keizoDialog.setIsTalkingToMe(true);

                this.shigeDialog.setIsTalkingToSomeoneElse(true);
                this.koichiDialog.setIsTalkingToSomeoneElse(true);
                this.norikoDialog.setIsTalkingToSomeoneElse(true);
                this.kyokoDialog.setIsTalkingToSomeoneElse(true);
             }

            this.stopPlayer(this.grandpa);

        // check collision with Kyoko
        } else if (this.checkCollision(this.grandpa, this.kyoko)) {
            if (!this.kyokoDialog.getIsShowing() && !this.kyokoDialog.getIsTalkingToSomeoneElse()) {
                this.kyokoDialog.setIsShowing(true);
                this.kyokoDialog.setIsTalkingToMe(true);

                this.shigeDialog.setIsTalkingToSomeoneElse(true);
                this.koichiDialog.setIsTalkingToSomeoneElse(true);
                this.keizoDialog.setIsTalkingToSomeoneElse(true);
                this.norikoDialog.setIsTalkingToSomeoneElse(true);
             }

            this.stopPlayer(this.grandpa);

        // check collision with Noriko, talk to her once talked to all other characters
        } else if (this.checkCollision(this.grandpa, this.noriko)) {
            if (this.shigeDialog.getFinishedDialog() &&
                this.koichiDialog.getFinishedDialog() &&
                this.keizoDialog.getFinishedDialog() &&
                this.kyokoDialog.getFinishedDialog() && 
                !this.norikoDialog.getIsShowing() &&
                !this.norikoDialog.getIsTalkingToSomeoneElse()) {
                    this.norikoDialog.setIsShowing(true);
                    this.norikoDialog.setIsTalkingToMe(true);

                    this.shigeDialog.setIsTalkingToSomeoneElse(true);
                    this.koichiDialog.setIsTalkingToSomeoneElse(true);
                    this.keizoDialog.setIsTalkingToSomeoneElse(true);
                    this.kyokoDialog.setIsTalkingToSomeoneElse(true);
             }

            this.stopPlayer(this.grandpa);
        }


        // talk with Shige when in collision
        if (this.shigeDialog.getIsTalkingToMe()) {
            this.shigeDialog.update();

            if (this.shigeDialog.getFinishedDialog()) {
                this.shigeDialog.setIsShowing(false);
                this.shigeDialog.setIsTalkingToMe(false);

                this.norikoDialog.setIsTalkingToSomeoneElse(false);    
                this.koichiDialog.setIsTalkingToSomeoneElse(false);    
                this.keizoDialog.setIsTalkingToSomeoneElse(false);    
                this.kyokoDialog.setIsTalkingToSomeoneElse(false);    
            }
        }

        // talk with Koichi when in collision
        if (this.koichiDialog.getIsTalkingToMe()) {
            this.koichiDialog.update();

            if (this.koichiDialog.getFinishedDialog()) {
                this.koichiDialog.setIsShowing(false);
                this.koichiDialog.setIsTalkingToMe(false);

                this.shigeDialog.setIsTalkingToSomeoneElse(false);    
                this.norikoDialog.setIsTalkingToSomeoneElse(false);    
                this.keizoDialog.setIsTalkingToSomeoneElse(false);    
                this.kyokoDialog.setIsTalkingToSomeoneElse(false);    
            }
        }

        // talk with Kyoko when in collision
        if (this.kyokoDialog.getIsTalkingToMe()) {
            this.kyokoDialog.update();

            if (this.kyokoDialog.getFinishedDialog()) {
                this.kyokoDialog.setIsShowing(false);
                this.kyokoDialog.setIsTalkingToMe(false);

                this.shigeDialog.setIsTalkingToSomeoneElse(false);    
                this.koichiDialog.setIsTalkingToSomeoneElse(false);
                this.keizoDialog.setIsTalkingToSomeoneElse(false);    
                this.norikoDialog.setIsTalkingToSomeoneElse(false);    
            }
        }

        // talk with Keizo when in collision
        if (this.keizoDialog.getIsTalkingToMe()) {
            this.keizoDialog.update();

            if (this.keizoDialog.getFinishedDialog()) {
                this.keizoDialog.setIsShowing(false);
                this.keizoDialog.setIsTalkingToMe(false);

                this.shigeDialog.setIsTalkingToSomeoneElse(false);    
                this.koichiDialog.setIsTalkingToSomeoneElse(false);
                this.norikoDialog.setIsTalkingToSomeoneElse(false);    
                this.kyokoDialog.setIsTalkingToSomeoneElse(false);    
            }
        }

        // talk with Noriko when in collision
        if (this.norikoDialog.getIsTalkingToMe()) {
            this.norikoDialog.update();

            if (this.norikoDialog.getFinishedDialog()) {
                this.norikoDialog.setIsShowing(false);
                this.norikoDialog.setIsTalkingToMe(false);

                this.shigeDialog.setIsTalkingToSomeoneElse(false);    
                this.koichiDialog.setIsTalkingToSomeoneElse(false);
                this.keizoDialog.setIsTalkingToSomeoneElse(false);    
                this.kyokoDialog.setIsTalkingToSomeoneElse(false);    
            }
        }

        // go to next scene once talked to all characters
        if (!this.end &&
            this.shigeDialog.getFinishedDialog() &&
            this.norikoDialog.getFinishedDialog() &&
            this.koichiDialog.getFinishedDialog() &&
            this.kyokoDialog.getFinishedDialog() &&
            this.keizoDialog.getFinishedDialog()) {
                this.end = true;
                this.endScene();
        }

    }

    // player movement
    movePlayer(character) {
        if (keyW.isDown && character.y >= 0) {
            character.y -= 5;
        } else if (keyS.isDown && character.y <= game.config.height - 55) {
            character.y += 5;
        }

        if (keyA.isDown && character.x >= 0) {
            character.x -= 5;
        } else if (keyD.isDown && character.x <= game.config.width - 55) {
            character.x += 5;
        }
    }

    // prevent player from going through other characters
    stopPlayer(grandpa) {
        if (keyW.isDown) {
                grandpa.y += 5;
        }
        if (keyS.isDown) {
                grandpa.y -= 5;
        }
        if (keyA.isDown) {
                grandpa.x += 5;
        }
        if (keyD.isDown) {
                grandpa.x -= 5;
        }
    }

    // checking if colliding
    checkCollision(char1, char2) {
        // ignore if either sprites are gone from the scene
        if (char1 == null || char2 == null) {
            return false;
        }

        if (char1.x < char2.x + 63 &&
            char1.x + 63 > char2.x &&
            char1.y < char2.y + 128 &&
            char1.y + 128 > char2.y) {
                return true;
            } else {
                return false;
            }
    }

    // End scene transition
    endScene() {
        this.input.keyboard.enabled = false;
    
        this.cam = this.cameras.main.fadeOut(5000, 0, 0, 0);
    
        this.tween = this.tweens.add({
            targets: this.music,
            volume: {from: 1, to: 0},
            duration: 5000,
            onComplete: () => {
                this.music.stop();
                this.scene.start('endingScene')
            }
        });
    }
}
