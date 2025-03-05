// Cena final (classe) herança de Phaser.Scene

export class EndScene extends Phaser.Scene {
  // Variávies de tamanho da cena
  alturaJogo = 600;
  larguraJogo = 1000;

  // Inicializa a cena
  constructor() {
    super("EndScene");
  }

  // Puxa o dado enviadopela útima cena (GameScene)
  init(data) {
    this.resultado = data; // Armazena na variável resultado
  }

  // Carrega as imagens
  preload() {
    this.load.image("paisagemEnd", "./assets/end_bg.png");
    this.load.spritesheet("npcIdle", "./assets/npc_idle.png", {
      // Define o tamanho dos frames com base na proporção da imagem
      frameWidth: 72,
      frameHeight: 86,
    });
    this.load.image("perdeu", "./assets/descricao_perdeu.png");
    this.load.image("ganhou", "./assets/descricao_ganhou.png");
    this.load.image("menu", "./assets/botao_menu.png");
    this.load.image("restart", "./assets/botao_restart.png");
  }

  // Cria as imagens no jogo
  create() {
    this.add
      .image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagemEnd") // Posiciona as imagens com base nas proporções do jogo
      .setScale(2) // Redimensiona a imagem
      .setAlpha(0.4); // Altera a opacidade

    // Adiciona e cria variáveis para o npc, o botão de menu e o botão de restart
    this.npc = this.add
      .sprite(this.larguraJogo / 2, 300, "npcIdle")
      .setScale(2.5);

    // Botão: Menu
    this.botaoMenu = this.add
      .image(this.larguraJogo / 2 - 100, 500, "menu")
      .setScale(0.2)
      .setInteractive(); // Torna o elemento interativo

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

    // Botão: Restart (mesma lógica do botão menu)
    this.botaoRestart = this.add
      .image(this.larguraJogo / 2 + 100, 500, "restart")
      .setScale(0.2)
      .setInteractive();

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

    // Verifica a mensagem enviada por GameScene
    if (this.resultado === "ganhou") {
      this.add.image(this.larguraJogo / 2, 130, "ganhou").setScale(0.25); // Adiciona a imagem de chave "ganhou"
    }
    if (this.resultado === "perdeu") {
      this.add.image(this.larguraJogo / 2, 130, "perdeu").setScale(0.25); // Adiciona a imagem de chave "perdeu"
    }

    // Cria a animação do npc
    this.anims.create({
      key: "andando",
      frames: this.anims.generateFrameNumbers("npcIdle", {
        start: 0, // Indica em que frame a animação começa
        end: 3, // Indica em que frame a animação termina
      }),
      frameRate: 5, // Indica quantos quadros por segundo são mostrados
      repeat: -1, // Indica quantas vezes a animação se repete
    });
  }

  // Função que atualiza o jogo contantemente
  update() {
    // Aciona a animação do npc
    this.npc.anims.play("andando", true);
  }
}
