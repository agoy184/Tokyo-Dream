class Arrival_and_Neglect extends Phaser.Scene {
    constructor() {
        super('arrivalAndNeglectScene');
    }

    create() {
        // disable user input until scene is fully faded in
        // DOES NOT WORK FOR MOUSE CLICKS
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

        // temp to advance to next scene
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

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


        // TODO: class that can deal with dialog
//        this.dialog = new Dialog(this, 'hello', 'shuukichi');
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
        this.norikoScript = [
            ["Noriko_Dialog", "Welcome to Tokyo mom and dad, it’s good to see you two again."],
            ["Tomi_Dialog", "It’s been quite a long time."],
            ["Shukichi_Dialog", "It’s good to see you again too. Have you been keeping busy at work?"],
            ["Noriko_Dialog", "Yes. We were quite busy a few months ago, but we’re not so busy now."],
            ["Tomi_Dialog", "Glad to hear you’re able to keep yourself stable, you must have been lonely these past few years."],
            ["Shukichi_Dialog", "Good to hear, but it must be lonesome without Shouji around."],
            ["Noriko_Dialog", "It’s alright, I like the solitude."],
            ["Tomi_Dialog", "You may think that now, but when you get older, you really appreciate the company."],
            ["Noriko_Dialog", "Well…"],
            ["Noriko_Dialog", "Oh right, I got the day off tomorrow if you two would like to go sightseeing tomorrow."],
            ["Shukichi_Dialog", "We would love to, I can’t wait for you to show us around Tokyo."],
        ];
        this.koichiScript = [
            ["Koichi_Dialog", "Welcome home, it must have been a long journey here."],
            ["Tomi_Dialog", "It was nice to see all the cities on the way here."],
            ["Shukichi_Dialog", "Your mom was able to fall asleep, I was only able to close my eyes for a second."],
            ["Koichi_Dialog", "Haha, well I’m glad it wasn’t too bad of a ride. I had an emergency call to check on a patient, I’m sorry I couldn’t be here earlier."],
            ["Shukichi_Dialog", "Don’t worry about it, we’re happy to hear that you are able to help many people."],
            ["Tomi_Dialog", "That’s true, we’re glad to know you’re doing great things in your community."],
            ["Koichi_Dialog", "I have some crackers for us to snack on before dinner, I got these from Yokohama."],
            ["sound", "open_container"],
            //["*open box*
            ["Tomi_Dialog", "Oh wow, these look delicious."],
            ["Shukichi_Dialog", "I can’t wait to eat them."],
            //["*phone rings*
            ["Koichi_Dialog", "Hello?...Yes that’s me…How’s their temperature?...I see, I’ll be right over."],
            ["Koichi_Dialog", "Sorry, I have to visit another patient, it will take a while. You two might sleep before I get home."],
            ["Shukichi_Dialog", "Ah, that’s okay."],
            ["Tomi_Dialog", "That’s okay, we’ll see you soon."],
        ];

        // temp to figure out pressing on sprite to show dialog
        this.ship = this.add.image(game.config.width / 2, game.config.height / 2, 'Shige').setOrigin(0.5, 0.5).setInteractive();
        this.bigShip = this.add.image(game.config.width / 2, game.config.height / 5, 'Koichi').setOrigin(0.5, 0.5).setInteractive().setVisible(false);
        this.rocket = this.add.image(game.config.width / 1.5, game.config.height / 1.5, 'Noriko').setOrigin(0.5, 0.5).setInteractive();
        this.dialog_box = this.add.image(game.config.width / 1.65, game.config.height - 75, 'dialog_box').setOrigin(0.5, 0.5).setVisible(false);
       
//        // index indicator where to show dialog
//        this.nextDialogIndex = -1;
//
//        // the character to show
//        this.character = null;
//        // the text to show
//        this.currText = null;
//
//        // to check which characters currently talking to
//        this.currentlyTalkingToShige = false;
//        this.currentlyTalkingToNoriko = false;
//        this.currentlyTalkingToKoichi = false;
//
        // to check which characters have already talked to
        this.talkedToShige = false;
        this.talkedToNoriko = false;
        this.talkedToKoichi = false;
//
//        this.isCurrentlyTalking = false;
//
//        this.input.on('pointerup', dialog);

        //this.test = new Dialog(this, this.shigeScript, false, false, this.isCurrentlyTalking);
        this.shigeTalk = new Dialog(this, this.shigeScript, false, false, this.isCurrentlyTalking);
        this.norikoTalk = new Dialog(this, this.norikoScript, false, false, this.isCurrentlyTalking);
        this.koichiTalk = new Dialog(this, this.koichiScript, false, false, this.isCurrentlyTalking);

        // to advance next dialog
        this.cursors = this.input.keyboard.createCursorKeys();

        // to display Koichi sprite later
        this.showedKoichi = false;
     }

    update() {
        if (this.talkedToKoichi && this.talkedToNoriko && this.talkedToShige) {
            return;
        }

        // Grandpa moves
        this.grandpa.update();

        // Grandma follows move update if not colliding with Grandpa
        if (!this.checkCollision(this.grandpa, this.grandma)) {
            this.grandma.update();
        }

        if (!this.showedKoichi && this.shigeTalk.getFinishedDialog() && this.norikoTalk.getFinishedDialog()) {
            this.showedKoichi = true;
            this.bigShip.setVisible(true);
        }

        // check collision with Shige
        if((this.checkCollision(this.grandpa, this.ship) && this.ship.visible) || (this.checkCollision(this.grandma, this.ship) && this.ship.visible)) {
            if (!this.shigeTalk.getIsShowing() && !this.shigeTalk.getIsTalkingToSomeoneElse()) {
                this.shigeTalk.setIsShowing(true);
                this.shigeTalk.setIsTalkingToMe(true);
                this.norikoTalk.setIsTalkingToSomeoneElse(true);
                this.koichiTalk.setIsTalkingToSomeoneElse(true);
            }
                

            console.log("collide iwth shige")
            this.movePlayer(this.grandpa, this.grandma);

        // check collision with Koichi
        } else if ((this.checkCollision(this.grandpa, this.bigShip) && this.bigShip.visible) ||
                   (this.checkCollision(this.grandma, this.bigShip) && (this.bigShip.visible))) {

            console.log("collide iwth koichi")
            console.log(this.koichiTalk.getIsShowing());
            console.log(this.koichiTalk.getIsTalkingToMe());
            console.log(this.koichiTalk.getIsTalkingToSomeoneElse());

            if (!this.koichiTalk.getIsShowing() && !this.koichiTalk.getIsTalkingToSomeoneElse()) {
                this.koichiTalk.setIsShowing(true);
                this.koichiTalk.setIsTalkingToMe(true);
                this.norikoTalk.setIsTalkingToSomeoneElse(true);
                this.shigeTalk.setIsTalkingToSomeoneElse(true);
             }

            this.movePlayer(this.grandpa, this.grandma);

        // check collision with Noriko
        } else if (((this.checkCollision(this.grandpa, this.rocket))) || ((this.checkCollision(this.grandma, this.rocket)))) {
            if (!this.norikoTalk.getIsShowing() && !this.norikoTalk.getIsTalkingToSomeoneElse()) {
                this.norikoTalk.setIsShowing(true);
                this.norikoTalk.setIsTalkingToMe(true);
                this.koichiTalk.setIsTalkingToSomeoneElse(true);
                this.shigeTalk.setIsTalkingToSomeoneElse(true);
             }

             
             console.log("collide iwth noriko")
             this.movePlayer(this.grandpa, this.grandma);
        }

        // temp to advance to next scene
        // FIXME: is player is pressing on WASD and enter at same time, the characters keep moving in that direction
//        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
//            this.endScene();
//        }

//        if (this.koichiTalk.getFinishedDialog() && this.shigeTalk.getFinishedDialog() && this.norikoTalk.getFinishedDialog()) {
//            this.endScene();
//        }

//        if (this.talkedToKoichi && this.talkedToNoriko && this.talkedToShige && Phaser.Input.Keyboard.JustDown(keyENTER)) {
//            this.endScene();
//        }

        console.log(this.talkedToKoichi, this.talkedToNoriko, this.talkedToShige);


//
//        // show Koichi's sprite when finished talking to Shige and Noriko
//        if (this.talkedToNoriko && this.talkedToShige && !this.talkedToKoichi) {
//            this.bigShip.setVisible(true);
//        }

        // talk with Shige when in collision
        if (this.shigeTalk.getIsTalkingToMe()) {
            // TODO: dialog stuff
            this.shigeTalk.update();

            if (this.shigeTalk.getFinishedDialog()) {
                this.shigeTalk.setIsShowing(false);
                this.shigeTalk.setIsTalkingToMe(false);
                this.talkedToShige = true;

                this.koichiTalk.setIsTalkingToSomeoneElse(false);    
                this.norikoTalk.setIsTalkingToSomeoneElse(false);    
            }
        // remove Shige from scene
        } else if (!this.shigeTalk.getIsTalkingToMe() && this.shigeTalk.getFinishedDialog()) {
            this.ship.setVisible(false);
        }

        // talk with Koichi when in collision
        if (this.koichiTalk.getIsTalkingToMe()) {
            // TODO: dialog stuff
            this.koichiTalk.update();

            if (this.koichiTalk.getFinishedDialog()) {
                this.koichiTalk.setIsShowing(false);
                this.koichiTalk.setIsTalkingToMe(false);
                this.talkedToKoichi = true;

                this.shigeTalk.setIsTalkingToSomeoneElse(false);    
                this.norikoTalk.setIsTalkingToSomeoneElse(false);    
            }
        // remove Koichi from scene
        } else if (!this.koichiTalk.getIsTalkingToMe() && this.koichiTalk.getFinishedDialog()) {
            this.bigShip.setVisible(false);
        }

        if (this.norikoTalk.getIsTalkingToMe()) {
            // TODO: dialog stuff
            this.norikoTalk.update();

            if (this.norikoTalk.getFinishedDialog()) {
                this.norikoTalk.setIsShowing(false);
                this.norikoTalk.setIsTalkingToMe(false);
                this.talkedToNoriko = true;

                this.shigeTalk.setIsTalkingToSomeoneElse(false);    
                this.koichiTalk.setIsTalkingToSomeoneElse(false);    
            }
        }

        if (this.talkedToKoichi && this.talkedToNoriko && this.talkedToShige) {
//            this.input.keyboard.enabled = false;
//    
//            this.cam = this.cameras.main.fadeOut(5000, 0, 0, 0);
//    
//            this.tween = this.tweens.add({
//                targets: this.music,
//                volume: {from: 1, to: 0},
//                duration: 5000,
//                onComplete: () => {
//                    this.music.stop();
//                    this.scene.start('hotelAndDepartureScene')
//                }
//            });
 
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
/*
function dialog(pointer, gameObject) {
    if (gameObject == 0) {
        return;
    }

    if (this.scene.talkedToShige && this.scene.talkedToNoriko && this.scene.talkedToKoichi) {
        return;
    }

    console.log('clicked on sprite');

    if (this.scene.ship != null && gameObject[0].x == this.scene.ship.x) {
        shigeDialog(this.scene);
    } else if (gameObject[0].x == this.scene.rocket.x) {
        norikoDialog(this.scene);
    } else if (this.scene.bigShip != null && gameObject[0].x == this.scene.bigShip.x && this.scene.talkedToShige && this.scene.talkedToNoriko) {
        // talk to koichi once finished falking to shige noriko
        koichiDialog(this.scene);
    }

}

function shigeDialog(scene) {
    // return if finished talking to shige
    if (scene.talkedToShige) {
        return;
    }

    // return if currently talking to the other characters
    if (scene.currentlyTalkingToNoriko) {
        return;
    }

    // if reached end of dialog, remove current character, text, sprite, and change booleans
    if (scene.nextDialogIndex >= scene.shigeScript.length - 1) {
        scene.currText.destroy();
        scene.character.destroy();
        scene.ship.destroy();
        scene.ship = null;

        // restart dialog for next character to talk to
        scene.nextDialogIndex = -1;
        scene.currentlyTalkingToShige = false;
        scene.talkedToShige = true;
        scene.dialog_box.setVisible(false);
        return;
    }

    // remove current character and text
    if (scene.character != null && scene.currText != null) {
        scene.character.destroy();
        scene.currText.destroy();
    }

    if (scene.nextDialogIndex == -1) {
        scene.dialog_box.setVisible(true);

        scene.currentlyTalkingToShige = true;
    }

    console.log('curr dialog index: ', scene.nextDialogIndex);
    ++scene.nextDialogIndex;
    console.log('next dialog index: ', scene.nextDialogIndex);

    // display current character and text
    scene.character = scene.add.image(game.config.width / 8, game.config.height - 75, scene.shigeScript[scene.nextDialogIndex][0]);
    scene.currText = scene.add.text(game.config.width / 3.5, game.config.height - 100, scene.shigeScript[scene.nextDialogIndex][1]).setOrigin(0, 0).setWordWrapWidth(game.config.width / 1.5);
}

function norikoDialog(scene) {
    if (scene.talkedToNoriko) {
        return;
    }

    // return if currently talking to the other characters
    if (scene.currentlyTalkingToShige) {
        return;
    }

    // if reached end of dialog, remove current character, text, and change booleans
    if (scene.nextDialogIndex >= scene.norikoScript.length - 1) {
        scene.currText.destroy();
        scene.character.destroy();

        // restart dialog for next character to talk to
        scene.nextDialogIndex = -1;
        scene.currentlyTalkingToNoriko = false;
        scene.talkedToNoriko = true;
        scene.dialog_box.setVisible(false);
        return;
    }

    // remove current character and text
    if (scene.character != null && scene.currText != null) {
        scene.character.destroy();
        scene.currText.destroy();
    }

    if (scene.nextDialogIndex == -1) {
        scene.dialog_box.setVisible(true);

        scene.currentlyTalkingToNoriko = true;
    }

    console.log('curr dialog index: ', scene.nextDialogIndex);
    ++scene.nextDialogIndex;
    console.log('next dialog index: ', scene.nextDialogIndex);

    // display current character and text
    scene.character = scene.add.image(game.config.width / 8, game.config.height - 75, scene.norikoScript[scene.nextDialogIndex][0]);
    scene.currText = scene.add.text(game.config.width / 3.5, game.config.height - 100, scene.norikoScript[scene.nextDialogIndex][1]).setOrigin(0, 0).setWordWrapWidth(game.config.width / 1.5);
}

function koichiDialog(scene) {
    if (scene.talkedToKoichi) {
        return;
    }

    // if reached end of dialog, remove current character, text, sprite, and change booleans
    if (scene.nextDialogIndex >= scene.koichiScript.length - 1) {
        scene.currText.destroy();
        scene.character.destroy();
        scene.bigShip.destroy();
        scene.bigShip = null;

        // restart dialog for next character to talk to
        scene.nextDialogIndex = -1;
        scene.currentlyTalkingToKoichi = false;
        scene.talkedToKoichi = true;
        scene.dialog_box.setVisible(false);
        return;
    }

    // remove current character and text
    if (scene.character != null && scene.currText != null) {
        scene.character.destroy();
        scene.currText.destroy();
    }

    if (scene.nextDialogIndex == -1) {
        scene.dialog_box.setVisible(true);

        scene.currentlyTalkingToKoichi = true;
    }

    console.log('curr dialog index: ', scene.nextDialogIndex);
    ++scene.nextDialogIndex;
    console.log('next dialog index: ', scene.nextDialogIndex);

    // display current character and text
    scene.character = scene.add.image(game.config.width / 8, game.config.height - 75, scene.koichiScript[scene.nextDialogIndex][0]);
    scene.currText = scene.add.text(game.config.width / 3.5, game.config.height - 100, scene.koichiScript[scene.nextDialogIndex][1]).setOrigin(0, 0).setWordWrapWidth(game.config.width / 1.5);
}
*/