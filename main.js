import { WelcomeScene } from "./scenes/welcome.js";
import { GameScene } from "./scenes/game.js";
import { EndScene } from "./scenes/end.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#040f1c",
  pixelArt: true,
  roundPixel: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: true,
    },
  },
  scene: [WelcomeScene, GameScene, EndScene],
};

const game = new Phaser.Game(config);
