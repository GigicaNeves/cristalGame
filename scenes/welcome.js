export class WelcomeScene extends Phaser.Scene {
  alturaJogo = 600;
  larguraJogo = 800;

  constructor() {
    super("WelcomeScene");
  }

  preload() {
    this.load.image("paisagem", "../assets/oficial/menu_bg.png");
    this.load.image("cristal", "../assets/oficial/cristal.png");
    this.load.image("descricao", "../assets/oficial/descricao.png");
    this.load.image("titulo", "../assets/oficial/cristal_cast.png");
    this.load.image("play", "../assets/oficial/botao_start.png");
  }

  create() {
    this.add
      .image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagem")
      .setScale(2)
      .setAlpha(0.4);
    this.add.image(this.larguraJogo / 2, 100, "titulo").setScale(0.25);
    this.add.image(this.larguraJogo / 2, 250, "cristal").setScale(2.5);
    this.add.image(this.larguraJogo / 2, 490, "descricao").setScale(0.25);
    this.botaoJogar = this.add
      .image(this.larguraJogo / 2, 360, "play")
      .setScale(0.2)
      .setInteractive();

    this.botaoJogar.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });

    this.botaoJogar.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });

    this.botaoJogar.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }

  update() {}
}
