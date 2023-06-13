class Arrival_and_Neglect extends Phaser.Scene {
    constructor() {
        super('arrivalAndNeglectScene');
    }

    create() {
        // disable user input until scene is fully faded in
        this.input.keyboard.enabled = false;

        // adding background image
        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'arrival_and_neglect_background').setOrigin(0.5, 0.5);

        // music
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

        this.grandpa = new Player(this, 150, 180, 'Shukichi', 0)
        this.grandma = new Player(this, 240, 240, 'Tomi', 0)

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

        // dialog for Shige
        this.shigeScript = [
            ["Shige_Dialog", "You guys made it on time! Sorry we had to ask a taxi to come by the train."],
            ["Shukichi_Dialog", "That’s all right, I just hope we didn’t cost you all too much money. But at least the driver gave us a tour of all of Tokyo to Koichi’s house."],
            ["Shige_Dialog", "That’s impossible, his house is only 10 kilometers away from the station."],
            ["Tomi_Dialog", "Even though, it was very nice of him to explain the city to us visitors"],
            ["Shukichi_Dialog", "Oh, where’s Koichi?"],
            ["Shige_Dialog", "Right, he had an emergency call for one of his patients. I don’t know what time he’ll be back."],
            ["Tomi_Dialog", "It’s good to hear he’s busy, a good doctor is a busy doctor."],
            ["Shige_Dialog", "Oh my, I need to go to work. I’ll be back later."],
            ["Shukichi_Dialog", "Have a good day at work."],
            ["Tomi_Dialog", "We’ll see you later."],
            
        ];

        // dialog for Noriko
        this.norikoScript = [
            ["Noriko_Dialog", "Welcome to Tokyo mom and dad, it’s good to see you two again."],
            ["Tomi_Dialog", "It’s been quite a long time."],
            ["Shukichi_Dialog", "It’s good to see you again too. Have you been keeping busy at work?"],
            ["Noriko_Dialog", "Yes. We were quite busy a few months ago, but we’re not so busy now."],
            ["Tomi_Dialog", "Glad to hear you’re able to keep yourself stable, you must have been lonely these past few years."],
            ["Shukichi_Dialog", "It must be lonesome without Shouji around."],
            ["Noriko_Dialog", "It’s alright, I like the solitude."],
            ["Tomi_Dialog", "You may think that now, but when you get older, you really appreciate the company."],
            ["Tomi_Dialog", 'We just want you to be happy Noriko, you’re still very young. You don’t need to stay with us.'],
            ["Noriko_Dialog", "Well…"],
            ["Noriko_Dialog", "Oh right, I got the day off tomorrow if you two would like to go sightseeing tomorrow."],
            ["Shukichi_Dialog", "We would love to, I can’t wait for you to show us around Tokyo."],
        ];

        // dialog for Koichi
        this.koichiScript = [
            ["Koichi_Dialog", "Welcome home, it must have been a long journey here."],
            ["Tomi_Dialog", "It was nice to see all the cities on the way here."],
            ["Shukichi_Dialog", "Your mom was able to fall asleep, I was only able to close my eyes for a second."],
            ["Koichi_Dialog", "Haha, well I’m glad it wasn’t too bad of a ride. I had an emergency call to check on a patient, I’m sorry I couldn’t be here earlier."],
            ["Shukichi_Dialog", "Don’t worry about it, we’re happy to hear that you are able to help many people."],
            ["Tomi_Dialog", "That’s true, we’re glad to know you’re doing great things in your community."],
            ["Koichi_Dialog", "I have some crackers for us to snack on before dinner, I got these from Yokohama."],
            ["sound", "open_container"],
            ["pause", 3000],
            ["Tomi_Dialog", "Oh wow, these look delicious."],
            ["Shukichi_Dialog", "I can’t wait to eat them."],
            ["sound", 'tele_ring'],
            ["pause", 3500],
            ["Koichi_Dialog", "Hello?...Yes that’s me…How’s their temperature?...I see, I’ll be right over."],
            ["Koichi_Dialog", "Sorry, I have to visit another patient, it will take a while. You two might sleep before I get home."],
            ["Shukichi_Dialog", "Ah, that’s okay."],
            ["Tomi_Dialog", "That’s okay, we’ll see you soon."],
        ];

        // temp to figure out pressing on sprite to show dialog
        this.shige = this.add.image(game.config.width / 2, game.config.height / 2, 'Shige').setOrigin(0.5, 0.5).setInteractive();
        this.koichi = this.add.image(game.config.width / 2, game.config.height / 5, 'Koichi').setOrigin(0.5, 0.5).setInteractive().setVisible(false);
        this.noriko = this.add.image(game.config.width / 1.5, game.config.height / 1.5, 'Noriko').setOrigin(0.5, 0.5).setInteractive();
      
        // dialog once player collides with one of the characters
        this.shigeDialog = new Dialog(this, this.shigeScript, false, false, false);
        this.norikoDialog = new Dialog(this, this.norikoScript, false, false, false);
        this.koichiDialog = new Dialog(this, this.koichiScript, false, false, false);

        // to advance next dialog
        this.cursors = this.input.keyboard.createCursorKeys();

        // to display Koichi sprite later
        this.showedKoichi = false;

        // to indicate end of the scene
        this.end = false;
     }

    update() {
        // don't continue in update once the scene is over
        if (this.end) {
            return;
        }

        // Grandpa moves
        this.grandpa.update();

        // Grandma follows move update if not colliding with Grandpa
        if (!this.checkCollision(this.grandpa, this.grandma)) {
            this.grandma.update();
        }

        // display koichi character once talked to both shige and noriko
        if (!this.showedKoichi && this.shigeDialog.getFinishedDialog() && this.norikoDialog.getFinishedDialog()) {
            this.showedKoichi = true;
            this.koichi.setVisible(true);
        }

        // check collision with Shige
        if((this.checkCollision(this.grandpa, this.shige) && this.shige.visible) || (this.checkCollision(this.grandma, this.shige) && this.shige.visible)) {
            if (!this.shigeDialog.getIsShowing() && !this.shigeDialog.getIsTalkingToSomeoneElse()) {
                this.shigeDialog.setIsShowing(true);
                this.shigeDialog.setIsTalkingToMe(true);

                this.norikoDialog.setIsTalkingToSomeoneElse(true);
                this.koichiDialog.setIsTalkingToSomeoneElse(true);
            }
                
            this.movePlayer(this.grandpa, this.grandma);

        // check collision with Koichi
        } else if ((this.checkCollision(this.grandpa, this.koichi) && this.koichi.visible) ||
                   (this.checkCollision(this.grandma, this.koichi) && (this.koichi.visible))) {

            if (!this.koichiDialog.getIsShowing() && !this.koichiDialog.getIsTalkingToSomeoneElse()) {
                this.koichiDialog.setIsShowing(true);
                this.koichiDialog.setIsTalkingToMe(true);

                this.norikoDialog.setIsTalkingToSomeoneElse(true);
                this.shigeDialog.setIsTalkingToSomeoneElse(true);
             }

            this.movePlayer(this.grandpa, this.grandma);

        // check collision with Noriko
        } else if (((this.checkCollision(this.grandpa, this.noriko))) || ((this.checkCollision(this.grandma, this.noriko)))) {
            if (!this.norikoDialog.getIsShowing() && !this.norikoDialog.getIsTalkingToSomeoneElse()) {
                this.norikoDialog.setIsShowing(true);
                this.norikoDialog.setIsTalkingToMe(true);

                this.shigeDialog.setIsTalkingToSomeoneElse(true);
                this.koichiDialog.setIsTalkingToSomeoneElse(true);
             }

             this.movePlayer(this.grandpa, this.grandma);
        }


        // talk with Shige when in collision
        if (this.shigeDialog.getIsTalkingToMe()) {
            this.shigeDialog.update();

            if (this.shigeDialog.getFinishedDialog()) {
                this.shigeDialog.setIsShowing(false);
                this.shigeDialog.setIsTalkingToMe(false);

                this.norikoDialog.setIsTalkingToSomeoneElse(false);    
                this.koichiDialog.setIsTalkingToSomeoneElse(false);    
            }
        }
        // remove Shige from scene
        if (!this.shigeDialog.getIsTalkingToMe() && this.shigeDialog.getFinishedDialog()) {
            this.shige.setVisible(false);
        }

        // talk with Koichi when in collision
        if (this.koichiDialog.getIsTalkingToMe()) {
            this.koichiDialog.update();

            if (this.koichiDialog.getFinishedDialog()) {
                this.koichiDialog.setIsShowing(false);
                this.koichiDialog.setIsTalkingToMe(false);

                this.shigeDialog.setIsTalkingToSomeoneElse(false);    
                this.norikoDialog.setIsTalkingToSomeoneElse(false);    
            }
        }
        // remove Koichi from scene
        if (!this.koichiDialog.getIsTalkingToMe() && this.koichiDialog.getFinishedDialog()) {
            this.koichi.setVisible(false);
        }

        if (this.norikoDialog.getIsTalkingToMe()) {
            this.norikoDialog.update();

            if (this.norikoDialog.getFinishedDialog()) {
                this.norikoDialog.setIsShowing(false);
                this.norikoDialog.setIsTalkingToMe(false);

                this.shigeDialog.setIsTalkingToSomeoneElse(false);    
                this.koichiDialog.setIsTalkingToSomeoneElse(false);    
            }
        }

        // go to next scene once talked to all other characters
        if (!this.end && this.shigeDialog.getFinishedDialog() && this.norikoDialog.getFinishedDialog() && this.koichiDialog.getFinishedDialog()) {
            this.end = true;
            this.endScene();
        }

    }

    movePlayer(grandpa, grandma) {
        if (keyW.isDown) {
            grandpa.y += grandpa.moveSpeed;
            grandma.y += grandpa.moveSpeed;
        }
        if (keyS.isDown) {
            grandpa.y -= grandpa.moveSpeed;
            grandma.y -= grandpa.moveSpeed;
        }
        if (keyA.isDown) {
            grandpa.x += grandpa.moveSpeed;
            grandma.x += grandpa.moveSpeed;
        }
        if (keyD.isDown) {
            grandpa.x -= grandpa.moveSpeed;
            grandma.x -= grandpa.moveSpeed;
        }
    }

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

    // End scene transitions
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