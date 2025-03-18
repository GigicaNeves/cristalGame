// Importações das cenas
import { Loading } from "./scenes/loading.js";
import { WelcomeScene } from "./scenes/welcome.js";
import { CreditScene } from "./scenes/credit.js";
import { GameScene } from "./scenes/game.js";
import { EndScene } from "./scenes/end.js";

//  Configurações do jogo
const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  backgroundColor: "#040f1c",
  pixelArt: true,
  roundPixel: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  // Declarando a física do jogo
  physics: {
    default: "arcade",
    arcade: {
      // Define o valor da gravidade e a visibilidade do colisor
      gravity: { y: 200 },
      debug: false,
    },
  },
  // Organizando as cenas do jogo
  scene: [Loading, WelcomeScene, CreditScene, GameScene, EndScene],
};

const game = new Phaser.Game(config);
