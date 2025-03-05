export class GameScene extends Phaser.Scene {
  alturaJogo = 600;
  larguraJogo = 800;
  pedras = [];

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("cenario", "../assets/oficial/game/cenario_principal.png");
    this.load.image("pedra", "../assets/oficial/game/pedra_caverna.png");
    this.load.spritesheet(
      "feliciaWalk",
      "../assets/oficial/game/felicia_walk.png",
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );
    this.load.spritesheet(
      "feliciaIdle",
      "../assets/oficial/game/felicia_idle.png",
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );
    this.load.spritesheet(
      "feliciaJump",
      "../assets/oficial/game/felicia_jump.png",
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );
    this.load.audio("musicaFundo", "../assets/musica.mp3");
    this.load.image("cristal", "../assets/oficial/cristal.png");
  }

  create() {
    this.pontuacao = 0;
    this.vida = 5;

    this.musica = this.sound.add("musicaFundo");
    this.musica.play({
      loop: true,
      volume: 0.05,
    });

    this.add
      .image(this.larguraJogo / 2, this.alturaJogo / 2, "cenario")
      .setScale(2)
      .setAlpha(0.5);

    this.player = this.physics.add
      .sprite(this.larguraJogo / 2, 100, "feliciaJump")
      .setScale(1.4);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(30, 75, true).setOffset(50, 50);

    this.pedras[0] = this.physics.add.staticImage(100, 550, "pedra");
    this.pedras[0].body.setSize(130, 40, true).setOffset(-23, 20);
    this.pedras[0].setScale(3);

    this.pedras[1] = this.physics.add.staticImage(580, 560, "pedra");
    this.pedras[1].body.setSize(44, 44, true);
    this.pedras[1].setScale(0.9);

    this.cristal = this.physics.add.sprite(this.larguraJogo / 3, 0, "cristal");
    this.cristal.setCollideWorldBounds(true);
    this.cristal.setScale(0.9);
    this.physics.add.collider(this.cristal, this.pedras[0]);
    this.physics.add.collider(this.cristal, this.pedras[1]);

    this.physics.add.overlap(this.player, this.cristal, () => {
      this.cristal.setVisible(false);

      var posicaocristal_Y = Phaser.Math.RND.between(50, 650);
      this.cristal.setPosition(posicaocristal_Y, 100);

      this.pontuacao += 1;
      this.placar.setText("Cristais coletados: " + this.pontuacao);

      this.cristal.setVisible(true);
    });

    this.placar = this.add.text(
      50,
      50,
      "Cristais coletados: " + this.pontuacao,
      {
        fontSize: "30px",
        fill: "#c9d7ea",
      }
    );

    this.mostrarVida = this.add.text(50, 80, "Vida: " + this.vida, {
      fontSize: "30px",
      fill: "#c9d7ea",
    });

    for (let i = 0; i < this.pedras.length; i++) {
      this.physics.add.collider(
        this.player,
        this.pedras[i],
        this.danoColisaoPedra.bind(this)
      );
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "direita",
      frames: this.anims.generateFrameNumbers("feliciaWalk", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
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
  }

  danoColisaoPedra(player, pedra) {
    if (this.estaInvulneravel) return; // Se estiver invulnerável, não faz nada

    this.vida -= 1;
    this.mostrarVida.setText("Vida: " + this.vida);

    // Ativa invulnerabilidade temporária para evitar múltiplas perdas de vida
    this.estaInvulneravel = true;
    this.time.delayedCall(500, () => {
      // Invulnerável por 0.5s
      this.estaInvulneravel = false;
    });

    // Calcula direção de repulsão
    let repelDirection = new Phaser.Math.Vector2(
      player.x - pedra.x,
      player.y - pedra.y
    ).normalize();

    // Aplica força para empurrar o player para longe
    player.setVelocity(repelDirection.x * 200, -350);

    if (this.vida == 0) {
      this.scene.stop("GameScene");
      this.scene.start("EndScene", "perdeu");
    }
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      if (this.player.anims.currentAnim?.key !== "esquerda") {
        this.player.anims.play("esquerda", true);
        this.player.setFlipX(true);
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
      this.player.setVelocityX(0);
      if (this.player.anims.currentAnim?.key !== "parada") {
        this.player.anims.play("parada", true);
      }
    }

    if (this.pontuacao >= 5) {
      this.scene.stop("GameScene");
      this.scene.start("EndScene", "ganhou");
    }

    if (this.cursors.down.isDown) {
      this.player.setVelocityY(400);
    }
  }
}
