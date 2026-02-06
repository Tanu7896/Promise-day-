const pages = document.querySelectorAll('.page');
const loopTransition = document.getElementById('loopTransition');

function goTo(id) {
  const current = document.querySelector('.page.active');
  const next = document.getElementById(id);
  if (!next || current === next) return;

  current.classList.remove('active');
  setTimeout(() => next.classList.add('active'), 300);

  if (id === "game") startGame();
}

/* Loop popup */
function startLoop() {
  goTo("home");

  setTimeout(() => {
    loopTransition.style.display = "flex";
    loopTransition.style.opacity = "1";
  }, 400);

  setTimeout(() => {
    loopTransition.style.opacity = "0";
    setTimeout(() => loopTransition.style.display = "none", 600);
  }, 3000);
}

/* 💗 HEART GAME */
let score = 0;
let time = 10;
let gameInterval, timerInterval;

const gameArea = document.getElementById("gameArea");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const gameBtn = document.getElementById("gameBtn");
const gameMsg = document.getElementById("gameMsg");

function startGame() {
  score = 0;
  time = 10;
  scoreEl.innerText = "Score: 0";
  timerEl.innerText = "Time: 10";
  gameMsg.innerText = "";
  gameBtn.style.display = "none";
  gameArea.innerHTML = "";

  gameInterval = setInterval(spawnHeart, 600);
  timerInterval = setInterval(() => {
    time--;
    timerEl.innerText = "Time: " + time;
    if (time <= 0) endGame();
  }, 1000);
}

function spawnHeart() {
  const heart = document.createElement("div");
  const rand = Math.random();

  if (rand < 0.7) {
    heart.innerText = "💖";
    heart.dataset.value = 1;
  } else if (rand < 0.9) {
    heart.innerText = "💗";
    heart.dataset.value = 2;
    heart.classList.add("bonus");
  } else {
    heart.innerText = "💎";
    heart.dataset.value = 5;
    heart.classList.add("rare");
  }

  heart.classList.add("heart");
  heart.style.left = Math.random() * 90 + "%";
  heart.style.animationDuration = 3 + Math.random() * 2 + "s";

  heart.onclick = () => {
    score += Number(heart.dataset.value);
    scoreEl.innerText = "Score: " + score;
    heart.remove();
  };

  gameArea.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  gameArea.innerHTML = "";

  if (score >= 10) {
    gameMsg.innerText = "You caught enough love 💖";
    gameBtn.style.display = "inline-block";
    gameBtn.onclick = () => goTo("promises");
    launchConfetti();
  } else {
    gameMsg.innerText = "Not enough hearts 😅 Try again!";
    gameBtn.style.display = "inline-block";
    gameBtn.innerText = "Retry 💗";
    gameBtn.onclick = () => startGame();
  }
}

/* 🎉 CONFETTI */
function launchConfetti() {
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = ["#ff6fae","#ffd1dc","#fff"][Math.floor(Math.random()*3)];
    c.style.animationDuration = 3 + Math.random() * 2 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}
