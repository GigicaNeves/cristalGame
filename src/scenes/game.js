// Cena jogável (classe) herança de Phaser.Scene

export class GameScene extends Phaser.Scene {
  // Variávies de tamanho da cena
  alturaJogo = 600;
  larguraJogo = 1000;

  // Array que armazena os obstáculos (pedras)
  pedras = [];

  // Inicializa a cena
  constructor() {
    super("GameScene");
  }

  // Carrega as imagens, sprites e audio
  preload() {
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
  }

  // Cria os elementos no jogo
  create() {
    // Variáveis para contagem de pontuação e vida
    this.pontuacao = 0;
    this.vida = 5;

    // Inicializa a música
    this.musica = this.sound.add("musicaFundo");
    this.musica.play({
      // Configurações de loop e volume
      loop: true,
      volume: 0.05,
    });

    // Adiciona cenário
    this.bg = this.add // Armazenando a imagem a uma variável
      .image(this.larguraJogo / 2, this.alturaJogo / 2, "cenario")
      .setScale(2) // Dimensionando escala
      .setAlpha(0.1); // Modificando a opacidade

    // Adiciona instruções
    this.instruction = this.add
      .image(this.larguraJogo / 2, 310, "instrucoes")
      .setScale(0.3);

    // Adiciona alerta
    this.alert = this.add
      .image(this.larguraJogo / 2, 130, "aviso")
      .setScale(0.19);

    // Adiciona player
    this.player = this.physics.add // Criando o sprite com física
      .sprite(this.larguraJogo / 2, 100, "feliciaJump")
      .setScale(1.4);
    this.player.setCollideWorldBounds(true); // Cria colisão com as bordas do mundo
    this.player.body.setSize(30, 75, true).setOffset(50, 50); // Configura a dimensão do colisor (tamanho e posição)

    // Cria o primeiro obstáculo dentro do array
    this.pedras[0] = this.physics.add.staticImage(200, 550, "pedra");
    this.pedras[0].body.setSize(140, 80, true).setOffset(-40, 0); // Configura a dimensão do colisor
    this.pedras[0].setScale(3);

    // Cria o segundo obstáculo dentro do array
    this.pedras[1] = this.physics.add.staticImage(720, 580, "pedra");
    this.pedras[1].body.setSize(44, 44, true);
    this.pedras[1].setScale(0.9);

    // Cria a sprite de dano
    this.danoVida = this.add
      .sprite(this.larguraJogo / 2, 100, "dano")
      .setScale(2);
    this.danoVida.setVisible(false); // Coloca a visibilidade do elemento como false (esconde)

    // Cria a lógica dos cristais
    this.cristal = this.physics.add.sprite(this.larguraJogo / 3, 0, "cristal");
    this.cristal.setCollideWorldBounds(true);
    this.cristal.setScale(0.9);
    this.physics.add.collider(this.cristal, this.pedras[0]); // Adiciona colisão entre os cristais e as pedras
    this.physics.add.collider(this.cristal, this.pedras[1]);

    // Cria uma função anônima para quando o player colidir com o cristal
    this.physics.add.overlap(this.player, this.cristal, () => {
      // Muda a visibilidade do cristal
      this.cristal.setVisible(false);

      // Usa a função Math para gerar um número aleatório no intervalo
      var posicaocristal_Y = Phaser.Math.RND.between(50, 800); // Armazena na variável
      this.cristal.setPosition(posicaocristal_Y, 100); // "muda" a posição do cristal com base na função

      // Soma 1 a pontuação
      this.pontuacao += 1;
      this.placar.setText("Cristais coletados: " + this.pontuacao + "/15"); // Mostra a pontuação atualizada

      // Muda a visibilidade do cristal para true (visível)
      this.cristal.setVisible(true);
    });

    // Cria a varável que armazena as informações do placar
    this.placar = this.add.text(
      50,
      50,
      "Cristais coletados: " + this.pontuacao + "/15",
      {
        // Estilo do texto
        fontSize: "30px",
        fill: "#c9d7ea",
        fontFamily: "Fantasy",
      }
    );

    // Cria a variável que armazena as informações da vida
    this.mostrarVida = this.add.text(50, 80, "Vida: " + this.vida, {
      fontSize: "30px",
      fill: "#c9d7ea",
      fontFamily: "Fantasy",
    });

    // Estrutura de lista que cria a colisão entre o player e os obstáculos
    for (let i = 0; i < this.pedras.length; i++) {
      this.physics.add.collider(
        this.player,
        this.pedras[i],
        this.danoColisaoPedra.bind(this) // adiciona uma função para a colisão
      );
    }

    // Acessa o sistema de entradas do teclado
    this.cursors = this.input.keyboard.createCursorKeys();

    // Cria as animações do jogo: direita, esquerda, pulando, parada e tomando dano
    this.anims.create({
      key: "direita",
      frames: this.anims.generateFrameNumbers("feliciaWalk", {
        // Define qual spritesheet é chamado
        start: 0, // Define o frame de início da animação
        end: 5, // Define o frame de finalização da animação
      }),
      frameRate: 10, // Define quantos quadros são mostrador por segundo
      repeat: -1, // Define quantas vezes a animação se repete
    });

    this.anims.create({
      key: "esquerda",
      frames: this.anims.generateFrameNumbers("feliciaWalk", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "pulando",
      frames: this.anims.generateFrameNumbers("feliciaJump", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "parada",
      frames: this.anims.generateFrameNumbers("feliciaIdle", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tomandoDano",
      frames: this.anims.generateFrameNumbers("dano", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  // Função que gere o dano
  danoColisaoPedra(player, pedra) {
    // Tem dois parâmetros
    if (this.estaInvulneravel) return; // Condição: se estiver invulnerável, não faz nada

    // Subtrai 1 de vida
    this.vida -= 1;
    this.mostrarVida.setText("Vida: " + this.vida); // Mostra a vida atual

    // Atualiza a posição da animação de dano e a torna visível
    this.danoVida.setPosition(player.x, player.y);
    this.danoVida.setVisible(true);
    this.danoVida.anims.play("tomandoDano", true);

    // Oculta a animação após um tempo com uma função anônima
    this.time.delayedCall(500, () => {
      this.danoVida.setVisible(false);
    });

    // Ativa invulnerabilidade temporária para evitar múltiplas perdas de vida
    this.estaInvulneravel = true;
    this.time.delayedCall(500, () => {
      // Invulnerável por 0.5s
      this.estaInvulneravel = false;
    });

    // Calcula direção de repulsão com uma função matemática (vetor)
    let repelDirection = new Phaser.Math.Vector2(
      player.x - pedra.x,
      player.y - pedra.y
    ).normalize();

    // Aplica força para empurrar o player para longe
    player.setVelocity(repelDirection.x * 200, -350);

    // Verifica se as vidas acabaram
    if (this.vida == 0) {
      this.scene.stop("GameScene"); // Para a exibição desta cena
      this.scene.start("EndScene", "perdeu"); // Muda a cena do jogo
    }
  }

  // Função que atualiza o jogo contantemente
  update() {
    // Altera a posição do dano para mesmo posição do player
    this.danoVida.setPosition(this.player.x, this.player.y);

    // Verifica se alguma tecla está sendo apertada
    if (
      this.cursors.left.isDown ||
      this.cursors.right.isDown ||
      this.cursors.up.isDown ||
      this.cursors.down.isDown
    ) {
      this.bg.setAlpha(0.5); // Altera a opacidade do plano de fundo
      this.instruction.setVisible(false); // Esconde as instruções
      this.alert.setVisible(false); // Esconde o alerta
    }

    // Verifica qual cursor está pressionado
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160); // Altera a velocidade do player no eixo x
      if (this.player.anims.currentAnim?.key !== "esquerda") {
        // Verifica se há outro animação sendo execultada
        this.player.anims.play("esquerda", true); // Ativa a animação para a esquerda
        this.player.setFlipX(true); // Espelha a animação
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      if (this.player.anims.currentAnim?.key !== "direita") {
        this.player.anims.play("direita", true);
        this.player.setFlipX(false);
      }
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-200);
      this.player.anims.play("pulando", true);
    } else {
      // Caso nenhum botão esteja pressionado, ele execulta o bloco:
      this.player.setVelocityX(0);
      if (this.player.anims.currentAnim?.key !== "parada") {
        this.player.anims.play("parada", true);
      }
    }

    // Verifica se a pontuação chegou a 15
    if (this.pontuacao >= 15) {
      this.scene.stop("GameScene"); // Para a cena atual
      this.scene.start("EndScene", "ganhou"); // Inicia a cena final
    }

    // Verifica se o cursor down está pressionado e acelera a queda
    if (this.cursors.down.isDown) {
      this.player.setVelocityY(400);
    }
  }
}
