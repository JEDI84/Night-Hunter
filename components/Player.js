const landscape = document.querySelector("#landscape");
landscape.style.left = "0px";
const road = document.querySelector("#road");
road.style.left = "0px";
const laser = document.querySelector('#laser')
var laserSound = new Audio("./assets/laserSound.wav")
function Player(x, y) {
  let self = this;
  this.x = x;
  this.y = y;
  this.sprite;
  this.width = 100;
  this.height = 200;
  this.isJumping = false;
  this.isGoingUp = true;
  this.isDead = false;
  this.isWalking = false;
  this.isShooting;
  this.landscapeIntervalID;

  this.landscapeInterval = function () {
    if (!this.isWalking) {
      this.isWalking = true;
      this.landscapeIntervalID = setInterval(function () {
        landscape.style.left = parseInt(landscape.style.left) - 5 + "px";
        road.style.left = parseInt(road.style.left) - 20 + "px";
        if (parseInt(landscape.style.left) <= -1800) {
          landscape.style.left = "0px";
        }
        if (parseInt(road.style.left) <= -1800) {
          road.style.left = "0px";
        }
      }, 50);
    }
  };

  this.createPlayer = function () {
    let newPlayer = document.createElement("div");
    newPlayer.setAttribute("id", "player");
    newPlayer.style.top = this.y + "px";
    newPlayer.style.left = this.x + "px";
    this.x = parseInt(newPlayer.style.left);
    this.y = parseInt(newPlayer.style.top);
    this.sprite = newPlayer;
    document.querySelector("#board").appendChild(newPlayer);
  };
  this.interaction = function (e) {
    if(e.key === 'e' && self.isShooting === false){
      laserSound.play()
      self.isShooting = true
      laser.style.display = 'inline-block'
      laser.style.animation = 'laserPium .2s linear'
      
    }
    if (e.key === " " && self.isJumping === false) {
      self.landscapeInterval();
      self.sprite.style.backgroundImage = "url(./assets/jump.png)";

      let timerUp = setInterval(function () {
        self.isJumping = true;

        if (self.isGoingUp && self.y >= 330) {
          if (self.isGoingUp && self.y > 450) {
            
            self.sprite.style.top = parseInt(self.sprite.style.top) - 10 + "px";
          } else {
           
            self.sprite.style.top = parseInt(self.sprite.style.top) - 6 + "px";
          }

          self.y = parseInt(self.sprite.style.top);
        } else {
          self.isGoingUp = false;
        }
        if (!self.isGoingUp) {
          if (self.y < 400) {
            
            self.sprite.style.top = parseInt(self.sprite.style.top) + 6 + "px";
          } else {
            
            self.sprite.style.top = parseInt(self.sprite.style.top) + 10 + "px";
          }
          self.y = parseInt(self.sprite.style.top);
          if (self.y >= 530) {
            self.sprite.style.top = "530px";
            self.sprite.style.backgroundImage = "";
            self.isGoingUp = true;
            clearInterval(timerUp);
            self.isJumping = false;
            self.stop();
          }
        }
      }, 25);
    }
    if (e.key === "d" && !self.isJumping) {
      self.sprite.classList.add("player-movement");
      self.landscapeInterval();
    }
  };
  this.stop = function (e) {
    laser.style.animation = ''
    laser.style.display = ''
    self.isShooting = false
    if (!self.isJumping) {
      clearInterval(self.landscapeIntervalID);
      self.isWalking = false;
    }

    self.sprite.classList.remove("player-movement");
  };
}

export { Player };
