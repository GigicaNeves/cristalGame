export class EndScene extends Phaser.Scene {
  alturaJogo = 600;
  larguraJogo = 1000;

  constructor() {
    super("EndScene");
  }

  init(data) {
    this.resultado = data;
  }

  preload() {
    this.load.image("paisagemEnd", "./assets/oficial/end_bg.png");
    this.load.spritesheet("npcIdle", "./assets/oficial/npc_idle.png", {
      frameWidth: 72,
      frameHeight: 86,
    });
    this.load.image("perdeu", "./assets/oficial/descricao_perdeu.png");
    this.load.image("ganhou", "./assets/oficial/descricao_ganhou.png");
    this.load.image("menu", "./assets/oficial/botao_menu.png");
    this.load.image("restart", "./assets/oficial/botao_restart.png");
  }

  create() {
    this.add
      .image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagemEnd")
      .setScale(2)
      .setAlpha(0.4);
    this.npc = this.add
      .sprite(this.larguraJogo / 2, 300, "npcIdle")
      .setScale(2.5);
    this.botaoMenu = this.add
      .image(this.larguraJogo / 2 - 100, 500, "menu")
      .setScale(0.2)
      .setInteractive();
    this.botaoRestart = this.add
      .image(this.larguraJogo / 2 + 100, 500, "restart")
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

    this.botaoRestart.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
      this.botaoRestart.setScale(0.23);
    });

    this.botaoRestart.on("pointerout", () => {
      this.input.setDefaultCursor("default");
      this.botaoRestart.setScale(0.2);
    });

    this.botaoRestart.on("pointerdown", () => {
      this.scene.stop("EndScene");
      this.scene.start("GameScene");
    });

    if (this.resultado === "ganhou") {
      this.add.image(this.larguraJogo / 2, 130, "ganhou").setScale(0.25);
    }
    if (this.resultado === "perdeu") {
      this.add.image(this.larguraJogo / 2, 130, "perdeu").setScale(0.25);
    }

    this.anims.create({
      key: "parado",
      frames: this.anims.generateFrameNumbers("npcIdle", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
  }

  update() {
    this.npc.anims.play("parado", true);
  }
}
