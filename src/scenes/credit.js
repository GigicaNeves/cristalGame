// Cena de créditos (classe) herança de Phaser.Scene

export class CreditScene extends Phaser.Scene {
  // Variávies de tamanho da cena
  alturaJogo = 600;
  larguraJogo = 1000;

  // Inicializa a cena
  constructor() {
    super("CreditScene");
  }

  // Carrega as imagens
  preload() {
    this.load.image("paisagemCredit", "./assets/credit_bg.png");
    this.load.image("menu", "./assets/botao_menu.png");
    this.load.image("descricaoCredit", "./assets/descricao_credit1.png");
    this.load.image("referencia", "./assets/descricao_credit2.png");
  }

  // Cria as imagens no jogo
  create() {
    this.add
      .image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagemCredit") // Posiciona as imagens com base nas proporções do jogo
      .setScale(2) // Define uma escala para a imagem
      .setAlpha(0.2); // Define uma opacidade para a imagem

    // Cria a descrição e a referência
    this.add.image(this.larguraJogo / 2, 180, "descricaoCredit").setScale(0.3);

    this.add.image(this.larguraJogo / 2, 360, "referencia").setScale(0.3);

    // Botão: Menu
    this.botaoMenu = this.add // Adiciona a imagem em uma variável
      .image(this.larguraJogo / 2, 500, "menu")
      .setScale(0.2)
      .setInteractive(); // Define que é uma imagem interativa

    // Verifica se o cursor está em cima do elemento interativo
    this.botaoMenu.on("pointerover", () => {
      this.input.setDefaultCursor("pointer"); // Muda o cursor para poiter
      this.botaoMenu.setScale(0.23); // Altera a escala do botão
    });

    // Verifica se o cursor não está mais em cima do elemento interativo
    this.botaoMenu.on("pointerout", () => {
      this.input.setDefaultCursor("default"); // Muda o cursor para default
      this.botaoMenu.setScale(0.2); // Retorna a escala original do botão
    });

    // Verifica se o botão foi clicado
    this.botaoMenu.on("pointerdown", () => {
      this.scene.start("WelcomeScene"); // Muda a cena do jogo para WelcomeScene
    });
  }

  // Função que atualiza o jogo contantemente: não usada no momento
  update() {}
}
