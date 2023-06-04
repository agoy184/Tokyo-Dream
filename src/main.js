// Abel Goy 

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    backgroundColor: '#35A7FF',
    pixelArt: true,
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
    scene:  [ Load, Menu, Play, Credits ]
}

let game = new Phaser.Game(config);

// Reserve keyboard vars
let keySPACE;
let keyW, keyA, keyS, keyD, keyR

// Set UI Sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
