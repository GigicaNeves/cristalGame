// Cena inicial (classe) herança de Phaser.Scene

export class WelcomeScene extends Phaser.Scene {
  // Variávies de tamanho da cena
  alturaJogo = 600;
  larguraJogo = 1000;

  // Inicializa a cena
  constructor() {
    super("WelcomeScene");
  }

  // Carrega as imagens
  preload() {
    this.load.image("paisagem", "./assets/menu_bg.png");
    this.load.image("cristal", "./assets/cristal.png");
    this.load.image("descricao", "./assets/descricao.png");
    this.load.image("titulo", "./assets/cristal_cast.png");
    this.load.image("play", "./assets/botao_start.png");
    this.load.image("credit", "./assets/botao_credit.png");
  }

  // Cria as imagens no jogo
  create() {
    this.add
      .image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagem") // Posiciona as imagens com base nas proporções do jogo
      .setScale(2) // Define uma escala para a imagem
      .setAlpha(0.4); // Define uma opacidade para a imagem
    this.add.image(this.larguraJogo / 2, 100, "titulo").setScale(0.25);
    this.add.image(this.larguraJogo / 2, 240, "cristal").setScale(2.4);
    this.add.image(this.larguraJogo / 2, 460, "descricao").setScale(0.25);

    // Botão: Jogar
    this.botaoJogar = this.add // Adiciona a imagem em uma variável
      .image(this.larguraJogo / 2, 350, "play")
      .setScale(0.19)
      .setInteractive(); // Define que é uma imagem interativa

    // Verifica se o cursor está em cima do elemento interativo
    this.botaoJogar.on("pointerover", () => {
      this.input.setDefaultCursor("pointer"); // Muda o cursor para poiter
      this.botaoJogar.setScale(0.23); // Altera a escala do botão
    });

    // Verifica se o cursor não está mais em cima do elemento interativo
    this.botaoJogar.on("pointerout", () => {
      this.input.setDefaultCursor("default"); // Muda o cursor para default
      this.botaoJogar.setScale(0.19); // Retorna a escala original do botão
    });

    // Verifica se o botão foi clicado
    this.botaoJogar.on("pointerdown", () => {
      this.scene.start("GameScene"); // Muda a cena do jogo para GameScene
    });

    // Botão: Créditos (mesma lógica do botão jogar)
    this.botaoCreditos = this.add
      .image(this.larguraJogo / 2, 550, "credit")
      .setScale(0.15)
      .setInteractive();

    this.botaoCreditos.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
      this.botaoCreditos.setScale(0.17);
    });

    this.botaoCreditos.on("pointerout", () => {
      this.input.setDefaultCursor("default");
      this.botaoCreditos.setScale(0.15);
    });

    this.botaoCreditos.on("pointerdown", () => {
      this.scene.start("CreditScene"); // Muda para a cena dos créditos
    });
  }

  // Função que atualiza o jogo contantemente: não usada no momento
  update() {}
}
