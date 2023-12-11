function ObstacleBat(x, y, player) {
  let self = this;
  this.x = x;
  this.y = y;
  this.width = 112;
  this.height = 135;
  this.speed = 1;
  this.sprite;
  this.moveTimer;

  this.createObstacleBat = function () {
    let newObstacleBat = document.createElement("div");
    newObstacleBat.setAttribute("class", "obstacleBat");
    newObstacleBat.style.top = self.y + "px";
    newObstacleBat.style.left = self.x + "px";
    self.sprite = newObstacleBat;
    self.x = parseInt(self.sprite.style.top);
    document.querySelector("#board").appendChild(self.sprite);
  };

  this.movement = function () {
    let timer = setInterval(function () {
      self.sprite.style.left =
        parseInt(self.sprite.style.left) - self.speed + "px";
      self.x = parseInt(self.sprite.style.left);
    }, 1);
    this.moveTimer = timer;
  };

  this.removeObstacle = function () {
    document.querySelector("#board").removeChild(self.sprite);
    clearInterval(self.moveTimer);
  };
  
  this.checkCollision = function () {
    if (
    self.x <= player.x + player.width
    ) {
      player.isDead = true
    }
  };
}

export { ObstacleBat };
