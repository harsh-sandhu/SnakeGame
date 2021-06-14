//MAIN GAME FRAME
let NO_OF_FRAME_PER_SEC = 4;
let gameOverSound = new sound("./sounds/gameover.mp3");
function increseSpeed() {
  let incre = Math.floor(snake.length / 3);
  return NO_OF_FRAME_PER_SEC + incre;
}
let lastTimeStamp = 0,
  gameOver = false;
const grid = document.getElementById("game-board");
const playpausebutton = document.getElementById("playPause");
const mutebutton = document.getElementById("muteButton");
let mute = true;
function muteFunction() {
  mute = !mute;
  if (mute) {
    mutebutton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    mutebutton.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
}
function init(){
    if(!localStorage.getItem("harsh-sandhu-snake-game")){
        localStorage.setItem("harsh-sandhu-snake-game", "0");
    }
}
init();
muteFunction();
let play = true;
function playPause() {
  play = !play;
}
function main(currentTime) {
  document.getElementById("highscore").innerHTML = localStorage.getItem(
    "harsh-sandhu-snake-game"
  );
  if (gameOver) {
    if (!mute) {
      gameOverSound.play();
    }
    GameOver();
    return;
  }
  window.requestAnimationFrame(main);
  const previousRender = currentTime - lastTimeStamp;
  if (previousRender < 1000 / increseSpeed()) {
    return;
  }
  if (play) {
    playpausebutton.innerHTML = "Pause";
    update();
    playpausebutton.classList.remove("blink");
    grid.style.opacity = "100%";
  } else {
    grid.style.opacity = "25%";
    playpausebutton.innerHTML = "Play";
    playpausebutton.classList.add("blink");
  }
  draw();
  lastTimeStamp = currentTime;
}
window.requestAnimationFrame(main);

function GameOver() {
  const over = document.createElement("div");
  const heading = document.createElement("h1");
  heading.innerHTML = "GAME<br>OVER";
  const restart = document.createElement("button");
  restart.innerHTML = "Restart";
  restart.classList.add("restartButton");
  restart.setAttribute("onclick", "restart()");
  over.appendChild(heading);
  over.classList.add("gameOver");
  let prevChilds = Array.from(grid.childNodes);
  prevChilds.map((ele) => {
    ele.style.display = "none";
  });
  let score = document.getElementById("score").innerHTML;
  if (
    parseInt(localStorage.getItem("harsh-sandhu-snake-game")) < parseInt(score)
  ) {
    localStorage.setItem("harsh-sandhu-snake-game", score);
    const newHighScore = document.createElement("h3");
    newHighScore.classList.add("newHightScore");
    newHighScore.innerHTML = "New HighScore!!";
    over.appendChild(newHighScore);
  }
  over.appendChild(restart);
  grid.appendChild(over);
  document.getElementById("highscore").innerHTML = localStorage.getItem(
    "harsh-sandhu-snake-game"
  );
  playpausebutton.style.display = "none";
  mutebutton.style.display = "none";
}
function draw() {
  drawSnake(grid);
  drawFood(grid);
}
function update() {
  grid.innerHTML = "";
  updateSnake();
  updateFood();
  checkGameOver();
}
function checkGameOver() {
  gameOver = smackWalls(snakeHead()) || selfBite();
}
function smackWalls(position) {
  if (position.x > 25 || position.y > 25 || position.x < 1 || position.y < 1) {
    return true;
  }
}
function restart() {
  location.reload();
}
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
