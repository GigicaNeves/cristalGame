export class CreditScene extends Phaser.Scene {
  alturaJogo = 600;
  larguraJogo = 1000;

  constructor() {
    super("CreditScene");
  }

  preload() {
    this.load.image("paisagemCredit", "../assets/oficial/credit_bg.png");
    this.load.image("menu", "../assets/oficial/botao_menu.png");
    this.load.image(
      "descricaoCredit",
      "../assets/oficial/descricao_credit1.png"
    );
    this.load.image("referencia", "../assets/oficial/descricao_credit2.png");
  }

  create() {
    this.add
      .image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagemCredit")
      .setScale(2)
      .setAlpha(0.2);

    this.add.image(this.larguraJogo / 2, 180, "descricaoCredit").setScale(0.3);

    this.add.image(this.larguraJogo / 2, 360, "referencia").setScale(0.3);

    this.botaoMenu = this.add
      .image(this.larguraJogo / 2, 500, "menu")
      .setScale(0.2)
      .setInteractive();

    this.botaoMenu.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
      this.botaoMenu.setScale(0.23);
    });

    this.botaoMenu.on("pointerout", () => {
      this.input.setDefaultCursor("default");
      this.botaoMenu.setScale(0.2);
    });

    this.botaoMenu.on("pointerdown", () => {
      this.scene.start("WelcomeScene");
    });
  }

  update() {}
}
