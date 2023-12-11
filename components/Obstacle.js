function Obstacle(x, y, player) {
  let self = this;
  this.x = x;
  this.y = y;
  this.width = 100;
  this.height = 20;
  this.speed = 1;
  this.sprite;
  this.moveTimer;

  this.createObstacle = function () {
    let newObstacle = document.createElement("div");
    newObstacle.setAttribute("class", "obstacle");
    newObstacle.style.top = self.y + "px";
    newObstacle.style.left = self.x + "px";
    self.sprite = newObstacle;
    self.x = parseInt(self.sprite.style.top);
    document.querySelector("#board").appendChild(self.sprite);
  };

  this.movement = function () {
    let timer = setInterval(function () {
      self.sprite.style.left =
        parseInt(self.sprite.style.left) - self.speed + "px";
      self.x = parseInt(self.sprite.style.left);
    }, 5);
    this.moveTimer = timer;
  };

  this.removeObstacle = function () {
    document.querySelector("#board").removeChild(self.sprite);
    clearInterval(self.moveTimer);
  };

  this.checkCollision = function () {
    if (
      self.x <= player.x + player.width &&
      self.x >= 50 &&
      player.y + player.height >= self.y
    ) {
      player.isDead = true
    }
  };
}

export { Obstacle };
