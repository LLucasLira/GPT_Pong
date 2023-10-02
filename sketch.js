let ball;
let leftPaddle;
let rightPaddle;

function setup() {
  createCanvas(800, 600);
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
   opponentPaddle = new OpponentPaddle();
}

function draw() {
  background(0);
  
  ball.update();
  ball.display();
  
  leftPaddle.update(mouseY);
  leftPaddle.display();
  
  rightPaddle.update(ball);
  rightPaddle.display();
  
  opponentPaddle.update(ball);
  opponentPaddle.display();
  
  ball.checkPaddleCollision(leftPaddle, rightPaddle, opponentPaddle);
  ball.checkEdges();
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
  
checkPaddleCollision(leftPaddle, rightPaddle, opponentPaddle) {
    if (this.position.x - this.radius < leftPaddle.position.x + leftPaddle.width/2 &&
        this.position.y > leftPaddle.position.y - leftPaddle.height/2 &&
        this.position.y < leftPaddle.position.y + leftPaddle.height/2) {
      this.velocity.x *= -1;
    }
    
    if (this.position.x + this.radius > rightPaddle.position.x - rightPaddle.width/2 &&
        this.position.y > rightPaddle.position.y - rightPaddle.height/2 &&
        this.position.y < rightPaddle.position.y + rightPaddle.height/2) {
      this.velocity.x *= -1;
    }
    
    if (this.position.x + this.radius > opponentPaddle.position.x - opponentPaddle.width/2 &&
        this.position.y > opponentPaddle.position.y - opponentPaddle.height/2 &&
        this.position.y < opponentPaddle.position.y + opponentPaddle.height/2) {
      this.velocity.x *= -1;
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
