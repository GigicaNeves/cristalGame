export class WelcomeScene extends Phaser.Scene {
  alturaJogo = 600;
  larguraJogo = 1000;

  constructor() {
    super("WelcomeScene");
  }

  preload() {
    this.load.image("paisagem", "./assets/menu_bg.png");
    this.load.image("cristal", "./assets/cristal.png");
    this.load.image("descricao", "./assets/descricao.png");
    this.load.image("titulo", "./assets/cristal_cast.png");
    this.load.image("play", "./assets/botao_start.png");
    this.load.image("credit", "./assets/botao_credit.png");
  }

  create() {
    this.add
      .image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagem")
      .setScale(2)
      .setAlpha(0.4);
    this.add.image(this.larguraJogo / 2, 100, "titulo").setScale(0.25);
    this.add.image(this.larguraJogo / 2, 240, "cristal").setScale(2.4);
    this.add.image(this.larguraJogo / 2, 460, "descricao").setScale(0.25);
    this.botaoJogar = this.add
      .image(this.larguraJogo / 2, 350, "play")
      .setScale(0.19)
      .setInteractive();
    this.botaoCreditos = this.add
      .image(this.larguraJogo / 2, 550, "credit")
      .setScale(0.15)
      .setInteractive();

    this.botaoJogar.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
      this.botaoJogar.setScale(0.23);
    });

    this.botaoJogar.on("pointerout", () => {
      this.input.setDefaultCursor("default");
      this.botaoJogar.setScale(0.19);
    });

    this.botaoJogar.on("pointerdown", () => {
      this.scene.start("GameScene");
    });

    this.botaoCreditos.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
      this.botaoCreditos.setScale(0.17);
    });

    this.botaoCreditos.on("pointerout", () => {
      this.input.setDefaultCursor("default");
      this.botaoCreditos.setScale(0.15);
    });

    this.botaoCreditos.on("pointerdown", () => {
      this.scene.start("CreditScene");
    });
  }

  update() {}
}
