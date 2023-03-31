// Julius Graf-Koroniwskyj
// Pascal Huynh
// 502-A22-LA WEB AND FX: FROM THEORY TO PRACTICE section 00001
// Shape shift dodge ball
// https://openprocessing.org/sketch/1878334
/* Move using the arrow keys to avoid balls, gain extra points by clicking left mouse button. Get hit and you lose.*/
/* This interactive game represents the inescapable hands of death, dodge and change all you want but eventually you will get tired and fall victim to it*/

let player;
let asteroids = [];
let points = 0;

function setup() {
  createCanvas(600, 400);
  player = new Player(width / 2, height - 50);
}

function draw() {
  background(0);
  player.show();
  player.move();

  if (frameCount % 50 === 0) {
    asteroids.push(new Asteroid(random(width), -50, random(30, 60)));
  }

  for (let i = asteroids.length - 1; i >= 0; i--) {
    asteroids[i].show();
    asteroids[i].move();
//game over text
    if (asteroids[i].hits(player)) {
      console.log("Game Over!");
      noLoop();
    }

    if (asteroids[i].offscreen()) {
      asteroids.splice(i, 1);
      points += 1;
    }
  }
//points text
  textSize(20);
  fill(255);
  text("Points: " + points, 20, 30);
}
//movement
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.setDir(-1);
  } else if (keyCode === RIGHT_ARROW) {
    player.setDir(1);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player.setDir(0);
  }
}

function mousePressed() {
  player.changeShape();
  points += 10;
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.speed = 5;
    this.dir = 0;
    this.color = color(255, 255, 0);
    this.shape = "circle";
  }

  show() {
    fill(this.color);
    if (this.shape === "circle") {
      ellipse(this.x, this.y, this.w, this.h);
    } else {
      rect(this.x, this.y, this.w, this.h);
    }
  }

  setDir(dir) {
    this.dir = dir;
  }

  move() {
    this.x += this.speed * this.dir;
    this.x = constrain(this.x, this.w / 2, width - this.w / 2);
  }
//changing shape
  changeShape() {
    if (this.shape === "circle") {
      this.shape = "rect";
    } else {
      this.shape = "circle";
    }
  }
}

class Asteroid {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = random(2, 5);
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r);
  }

  move() {
    this.y += this.speed;
  }
//if astroid hits player
  hits(player) {
    if (
      this.x + this.r > player.x - player.w / 2 &&
      this.x - this.r < player.x + player.w / 2 &&
      this.y + this.r > player.y - player.h / 2 &&
      this.y - this.r < player.y + player.h / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  offscreen() {
    if (this.y > height + this.r) {
      return true;
    } else {
      return false;
    }
  }
}
