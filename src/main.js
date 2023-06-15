// Abel Goy 
// Marlene Inoue

/**
 * Phaser Components Used
 * physics: player sprite
 * cameras: fading in and out between sceens
 * text objects: menu text, dialog text
 * tween manager: tweening the music
 * tilemaps: the background
 */

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    backgroundColor: '#35A7FF',
    render: {
      pixelArt: true,
    },
    autoCenter: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: {
          x:0,
          y:0
        }
      }
    },
    scene:  [ Load, Menu, Arrival_and_Neglect, Hotel, Departure, Funeral, Ending, CreditsMusic, CreditsBackground, Controls ]
}

let game = new Phaser.Game(config);

// Reserve keyboard vars
let keySPACE;
let keyW, keyA, keyS, keyD, keyR

// Set UI Sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
