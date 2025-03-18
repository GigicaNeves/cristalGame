// Cena de créditos (classe) herança de Phaser.Scene

export class Loading extends Phaser.Scene {
  // Variávies de tamanho da cena
  alturaJogo = 600;
  larguraJogo = 1000;

  // Inicializa a cena
  constructor() {
    super("Loading");
  }

  // Carrega as imagens
  preload() {
    this.load.image("paisagemCredit", "./assets/credit_bg.png");
    this.load.image("menu", "./assets/botao_menu.png");
    this.load.image("descricaoCredit", "./assets/descricao_credit1.png");
    this.load.image("referencia", "./assets/descricao_credit2.png");
    this.load.image("cenario", "./assets/cenario_principal.png");
    this.load.image("pedra", "./assets/pedra_caverna.png");
    this.load.image("instrucoes", "./assets/instrucoes.png");
    this.load.image("aviso", "./assets/aviso.png");
    this.load.spritesheet("feliciaWalk", "./assets/felicia_walk.png", {
      // Define o tamanho dos frames com base nas dimensões da imagem
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("feliciaIdle", "./assets/felicia_idle.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("feliciaJump", "./assets/felicia_jump.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("dano", "./assets/dano.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.audio("musicaFundo", "./assets/trilha_sonora.mp3");
    this.load.image("cristal", "./assets/oficial/cristal.png");
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
    this.load.image("paisagem", "./assets/menu_bg.png");
    this.load.image("cristal", "./assets/cristal.png");
    this.load.image("descricao", "./assets/descricao.png");
    this.load.image("titulo", "./assets/cristal_cast.png");
    this.load.image("play", "./assets/botao_start.png");
    this.load.image("credit", "./assets/botao_credit.png");
    this.load.on("progress", (value) => {
      this.loadingProgress = Math.floor(value * 100);
    });
  }

  // Cria as imagens no jogo
  create() {
    this.loadiss = this.add.text(
      50,
      50,
      "Progresso: " + this.loadingProgress + "%",
      {
        // Estilo do texto
        fontSize: "30px",
        fill: "#c9d7ea",
        fontFamily: "Fantasy",
      }
    );
  }

  // Função que atualiza o jogo contantemente: não usada no momento
  update() {
    if (this.loadingProgress == 100) {
      this.scene.start("WelcomeScene");
    }
  }
}
