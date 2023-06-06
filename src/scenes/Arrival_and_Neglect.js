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


        // TODO: class that can deal with dialog
//        this.dialog = new Dialog(this, 'hello', 'shuukichi');
        this.shigeScript = [
            ["shige", "You guys made it on time! Sorry we had to ask a taxi to come by the train."],
            ["shuukichi", "That’s all right, I just hope we didn’t cost you all too much money. But at least the driver gave us a tour of all of Tokyo to Koichi’s house."],
            ["shige", "That’s impossible, his house is only 10 kilometers away from the station."],
            ["tomi", "Even though, it was very nice of him to explain the city to us visitors"],
            ["shuukichi", "Oh, where’s Koichi?"],
            ["shige", "Right, he had an emergency call for one of his patients. I don’t know what time he’ll be back."],
            ["tomi", "It’s good to hear he’s busy, a good doctor is a busy doctor."],
            ["shige", "Oh my, I need to go to work. I’ll be back later."],
            ["shuukichi", "Have a good day at work."],
            ["tomi", "We’ll see you later."],
            
        ];
        this.norikoScript = [
            ["noriko", "Welcome to Tokyo mom and dad, it’s good to see you two again."],
            ["tomi", "It’s been quite a long time."],
            ["shuukichi", "It’s good to see you again too. Have you been keeping busy at work?"],
            ["noriko", "Yes. We were quite busy a few months ago, but we’re not so busy now."],
            ["tomi", "Glad to hear you’re able to keep yourself stable, you must have been lonely these past few years."],
            ["shuukichi", "Good to hear, but it must be lonesome without Shouji around."],
            ["noriko", "It’s alright, I like the solitude."],
            ["tomi", "You may think that now, but when you get older, you really appreciate the company."],
            ["noriko", "Well…"],
            ["noriko", "Oh right, I got the day off tomorrow if you two would like to go sightseeing tomorrow."],
            ["shuukichi", "We would love to, I can’t wait for you to show us around Tokyo."],
        ];
        this.koichiScript = [
            ["koichi", "Welcome home, it must have been a long journey here."],
            ["tomi", "It was nice to see all the cities on the way here."],
            ["shuukichi", "Your mom was able to fall asleep, I was only able to close my eyes for a second."],
            ["koichi", "Haha, well I’m glad it wasn’t too bad of a ride. I had an emergency call to check on a patient, I’m sorry I couldn’t be here earlier."],
            ["shuukichi", "Don’t worry about it, we’re happy to hear that you are able to help many people."],
            ["tomi", "That’s true, we’re glad to know you’re doing great things in your community."],
            ["koichi", "I have some crackers for us to snack on before dinner, I got these from Yokohama."],
            //["*open box*
            ["tomi", "Oh wow, these look delicious."],
            ["shuukichi", "I can’t wait to eat them."],
            //["*phone rings*
            ["koichi", "Hello?...Yes that’s me…How’s their temperature?...I see, I’ll be right over."],
            ["koichi", "Sorry, I have to visit another patient, it will take a while. You two might sleep before I get home."],
            ["shuukichi", "Ah, that’s okay."],
            ["tomi", "That’s okay, we’ll see you soon."],
        ];
        // temp to figure out pressing on sprite to show dialog
        this.ship = this.add.image(game.config.width / 2, game.config.height / 2, 'ship').setOrigin(0.5, 0.5).setInteractive();
        this.bigShip = this.add.image(game.config.width / 3, game.config.height / 3, 'bigShip').setOrigin(0.5, 0.5).setInteractive();
        this.rocket = this.add.image(game.config.width / 1.5, game.config.height / 1.5, 'rocket').setOrigin(0.5, 0.5).setInteractive();
       
        // index indicator where to show dialog
        this.nextDialogIndex = -1;

        // the character to show
        this.character = null;
        // the text to show
        this.currText = null;

        // to check which characters currently talking to
        this.currentlyTalkingToShige = false;
        this.currentlyTalkingToNoriko = false;
        this.currentlyTalkingToKoichi = false;

        // to check which characters have already talked to
        this.talkedToShige = false;
        this.talkedToNoriko = false;
        this.talkedToKoichi = false;

        this.input.on('pointerup', dialog);
 
     }

    update() {
        // Grandpa moves, Grandma follows move update
        this.grandpa.update();
        this.clock = this.time.delayedCall(3000, () => {
            this.grandma.update();
        }, null, this);

        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.endScene();
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
        return;
    }

    // remove current character and text
    if (scene.character != null && scene.currText != null) {
        scene.character.destroy();
        scene.currText.destroy();
    }

    scene.currentlyTalkingToShige = true;

    console.log('curr dialog index: ', scene.nextDialogIndex);
    ++scene.nextDialogIndex;
    console.log('next dialog index: ', scene.nextDialogIndex);

    // display current character and text
    scene.character = scene.add.image(game.config.width / 8, game.config.height - 75, scene.shigeScript[scene.nextDialogIndex][0]);
    scene.currText = scene.add.text(game.config.width / 4, game.config.height - 100, scene.shigeScript[scene.nextDialogIndex][1]).setOrigin(0, 0).setWordWrapWidth(game.config.width / 1.5);
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
        return;
    }

    // remove current character and text
    if (scene.character != null && scene.currText != null) {
        scene.character.destroy();
        scene.currText.destroy();
    }

    scene.currentlyTalkingToNoriko = true;

    console.log('curr dialog index: ', scene.nextDialogIndex);
    ++scene.nextDialogIndex;
    console.log('next dialog index: ', scene.nextDialogIndex);

    // display current character and text
    scene.character = scene.add.image(game.config.width / 8, game.config.height - 75, scene.norikoScript[scene.nextDialogIndex][0]);
    scene.currText = scene.add.text(game.config.width / 4, game.config.height - 100, scene.norikoScript[scene.nextDialogIndex][1]).setOrigin(0, 0).setWordWrapWidth(game.config.width / 1.5);
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
        return;
    }

    // remove current character and text
    if (scene.character != null && scene.currText != null) {
        scene.character.destroy();
        scene.currText.destroy();
    }

    scene.currentlyTalkingToKoichi = true;

    console.log('curr dialog index: ', scene.nextDialogIndex);
    ++scene.nextDialogIndex;
    console.log('next dialog index: ', scene.nextDialogIndex);

    // display current character and text
    scene.character = scene.add.image(game.config.width / 8, game.config.height - 75, scene.koichiScript[scene.nextDialogIndex][0]);
    scene.currText = scene.add.text(game.config.width / 4, game.config.height - 100, scene.koichiScript[scene.nextDialogIndex][1]).setOrigin(0, 0).setWordWrapWidth(game.config.width / 1.5);
}