const grassName = "grass",
  GRASS_COUNT = 50;
const ballName = "ball",
  ball_count = 5;
let player = document.querySelector(".player");
let start_pos = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};
let playerPos = {
  x: 0,
  y: 0,
};
let playerVel = {
  x: 0,
  y: 0,
};
let player_speed = 3;
function start() {
  generateElement(grassName, GRASS_COUNT);
  generateElement(ballName, ball_count);
  playerPos = start_pos;
}
let SOUND = new Audio("assets/coin.mp3");
function update() {
  playerPos.x += playerVel.x;
  playerPos.y += playerVel.y;
  player.style.left = playerPos.x + "px";
  player.style.top = playerPos.y + "px";
  checkCollisions();

  requestAnimationFrame(update);
}
window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    playerVel.y = -1 * player_speed;
    player.style.backgroundImage = "url('assets/player_front.png')";
  }
  if (e.key == "ArrowDown") {
    playerVel.y = 1 * player_speed;
    player.style.backgroundImage = "url('assets/player_back.png')";
  }
  if (e.key == "ArrowLeft") {
    playerVel.x = -1 * player_speed;
    player.style.backgroundImage = "url('assets/player_left.png')";
  }
  if (e.key == "ArrowRight") {
    playerVel.x = 1 * player_speed;
    player.style.backgroundImage = "url('assets/player_right.png')";
  }
  player.classList.add("walk");
});
window.addEventListener("keyup", (e) => {
  playerVel.x = 0;
  playerVel.y = 0;
  player.classList.remove("walk");
});
function generateElement(className, countName) {
  for (let index = 0; index < countName; index++) {
    let newElement = document.createElement("div");
    newElement.classList.add(className);
    newElement.style.left = Math.random() * 100 + "%";
    newElement.style.top = Math.random() * 100 + "%";
    document.body.appendChild(newElement);
  }
}
let count = 0;
let h3 = document.querySelector("h3");
function checkCollisions() {
  balls = document.querySelectorAll(".ball");
  balls.forEach((ball) => {
    if (collision(ball, player)) {
      count++;
      h3.innerHTML = `score: ${count}`;

      ball.style.left = Math.random() * 100 + "%";
      ball.style.top = Math.random() * 100 + "%";
      SOUND.play();
    }
  });
}
function collision($div1, $div2) {
  var x1 = $div1.getBoundingClientRect().left;
  var y1 = $div1.getBoundingClientRect().top;
  var h1 = $div1.clientHeight;
  var w1 = $div1.clientWidth;
  var b1 = y1 + h1;
  var r1 = x1 + w1;

  var x2 = $div2.getBoundingClientRect().left;
  var y2 = $div2.getBoundingClientRect().top;
  var h2 = $div2.clientHeight;
  var w2 = $div2.clientWidth;
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}
start();
update();
