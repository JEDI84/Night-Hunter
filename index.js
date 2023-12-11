import { Player } from "./components/Player.js";
import { Obstacle } from "./components/Obstacle.js";
import { ObstacleBat } from "./components/ObstacleBat.js";
const board = document.querySelector("#board");
const points = document.querySelector("#points");
const start = document.querySelector('#startButton')
const over = board.querySelector("#gameover");
const restart = document.querySelector("#yes");
let obstacles = [];

restart.onclick = startGame;
start.onclick = function(){
  music.play()
  startGame()
  board.querySelector('#start').style.display = 'none'
}
no.onclick = function(){
  board.querySelector('#start').style.display = 'inline-block'
  over.style.display = "";
}
function startGame() {
  music.play()
  const player = new Player(150, 530);
  player.createPlayer();
  
  over.style.display = "";
  

  points.innerText = 0;
  
  function obstacleLoop() {
    player.isShooting = false;
    let bat = new ObstacleBat(1100, 500, player);
    bat.createObstacleBat();
    bat.movement();
    let collisionBat = setInterval(bat.checkCollision, 100);
    let newObstacle = new Obstacle(1100, 710, player);
    obstacles.push(newObstacle);
    obstacles.push(bat);
    newObstacle.createObstacle();
    newObstacle.movement();
    let collisionTimer = setInterval(newObstacle.checkCollision, 100);

    let timer = setInterval(function () {
      if (player.isShooting) {
        
        player.isShooting = false;
        let deadBats = obstacles.filter((obs) => {
          return obs.y < 530;
        });
        obstacles = [
          ...obstacles.filter((obs) => {
            return obs.y > 530;
          }),
        ];

        clearInterval(collisionBat);

        deadBats.forEach((obs) => {
          obs.removeObstacle();
        });
        points.innerText = parseInt(points.innerText) + deadBats.length * 2
        deadBats = [];
      }
      if (player.isDead) {
        clearInterval(collisionBat);
        clearInterval(collisionTimer);
      }
      if (newObstacle.x + player.width + newObstacle.width <= 0) {
        newObstacle.removeObstacle();
        points.innerText = parseInt(points.innerText) + 5
        clearInterval(timer);
        obstacles.shift();
      }
    }, 10);
  }
  let obstacleGenerator = setInterval(obstacleLoop, 5000);
  function gameOver() {
    if (player.isDead) {
      music.pause()
      music.currentTime = 0;
      board.removeChild(player.sprite)
      player.isDead = false;
      clearInterval(checkDeath);
      clearInterval(obstacleGenerator);
      window.onkeydown = "";
      window.onkeyup = "";
      over.style.display = "flex";
      over.querySelector('#score').innerText = `Score: ${points.innerText}`
      obstacles.forEach((obs) => {
        obs.removeObstacle();
      });
      obstacles = [];
    }
  }
  let checkDeath = setInterval(gameOver, 40);
  window.onkeydown = player.interaction;
  window.onkeyup = player.stop;
}


var music = new Audio("./assets/musica.mp3");
music.volume = 1;


