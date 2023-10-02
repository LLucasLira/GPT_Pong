let ball;
let leftPaddle;
let rightPaddle;
let opponentPaddle;
let playerScore = 0;
let opponentScore = 0;

function setup() {
  createCanvas(800, 600);
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
   opponentPaddle = new OpponentPaddle();
}

function draw() {
  background(0, 120, 0); // Cor de fundo como um campo de futebol
  
   // Desenha as marcações do campo
  stroke(255);
  strokeWeight(5);
  noFill();

  // Linhas laterais
  line(width/2, 0, width/2, height);
  line(0, 0, 0, height);
  line(width, 0, width, height);

  // Linhas de fundo
  line(0, height, width, height);
  line(0, 0, width, 0);

  // Círculo central
  ellipse(width/2, height/2, 100, 100);

  // Ponto central
  point(width/2, height/2);

  // Retângulos das áreas
  rect(0, height/2, 100, height/2);
  rect(width-10, height/2, 60, height/2);
  
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(playerScore + " - " + opponentScore, width / 2, 50);
  
  ball.update();
  ball.display();
  
  leftPaddle.update(mouseY);
  leftPaddle.display();
  
  rightPaddle.update(ball);
  rightPaddle.display();
  
  opponentPaddle.update(ball);
  opponentPaddle.display();
  
  // Verifica se a bola saiu pela esquerda (ponto para o adversário)
  if (ball.position.x - ball.radius < 0) {
    opponentScore++;
    resetGame();
  }

  // Verifica se a bola saiu pela direita (ponto para o jogador)
  if (ball.position.x + ball.radius > width) {
    playerScore++;
    resetGame();
  }
  
  ball.checkPaddleCollision(leftPaddle, rightPaddle, opponentPaddle);
  ball.checkEdges();
}

function resetGame() {
  ball.position = createVector(width/2, height/2);
  ball.velocity = createVector(random(2, 4), random(-2, 2));
}

class Ball {
  constructor() {
    this.position = createVector(width/2, height/2);
    this.velocity = createVector(random(2, 4), random(-2, 2));
    this.radius = 10;
  }
  
  update() {
    this.position.add(this.velocity);
  }
  
  display() {
    fill(255);
    ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
  }
  
   increaseSpeed() {
    this.velocity.mult(1.1); // Aumenta a velocidade em 10%
  }
 checkPaddleCollision(leftPaddle, rightPaddle, opponentPaddle) {
    if (this.position.x - this.radius < leftPaddle.position.x + leftPaddle.width/2 &&
        this.position.y > leftPaddle.position.y - leftPaddle.height/2 &&
        this.position.y < leftPaddle.position.y + leftPaddle.height/2) {
      this.velocity.x *= -1;
      this.increaseSpeed(); // Aumenta a velocidade
    }
    
    if (this.position.x + this.radius > rightPaddle.position.x - rightPaddle.width/2 &&
        this.position.y > rightPaddle.position.y - rightPaddle.height/2 &&
        this.position.y < rightPaddle.position.y + rightPaddle.height/2) {
      this.velocity.x *= -1;
      this.increaseSpeed(); // Aumenta a velocidade
    }
    
    if (this.position.x + this.radius > opponentPaddle.position.x - opponentPaddle.width/2 &&
        this.position.y > opponentPaddle.position.y - opponentPaddle.height/2 &&
        this.position.y < opponentPaddle.position.y + opponentPaddle.height/2) {
      this.velocity.x *= -1;
      this.increaseSpeed(); // Aumenta a velocidade
    }
  }

  
  checkEdges() {
    if (this.position.y - this.radius < 0 || this.position.y + this.radius > height) {
      this.velocity.y *= -1;
    }
    
    if (this.position.x - this.radius < 0 || this.position.x + this.radius > width) {
      this.position = createVector(width/2, height/2);
      this.velocity = createVector(random(2, 4), random(-2, 2));
    }
  }
}

class Paddle {
  constructor(isLeft) {
    this.position = createVector(isLeft ? 30 : width - 30, height/2);
    this.width = 10;
    this.height = 80;
  }
  
  update(mouseY) {
    this.position.y = mouseY;
  }
  
  display() {
    fill(255);
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}

class OpponentPaddle {
  constructor() {
    this.position = createVector(width - 30, height/2);
    this.width = 10;
    this.height = 80;
  }
  
  update(ball) {
    let targetY = ball.position.y;
    this.position.y = lerp(this.position.y, targetY, 0.1);
  }
  
  display() {
    fill(255);
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}
