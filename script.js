const pages = document.querySelectorAll('.page');
const loopTransition = document.getElementById('loopTransition');
const intro = document.getElementById('intro');
const music = document.getElementById('bgMusic');

/* Start experience */
function startExperience() {
  intro.style.display = "none";
  music.play().catch(() => {});
}

/* Page navigation */
function goTo(id) {
  const current = document.querySelector('.page.active');
  const next = document.getElementById(id);
  if (!next || current === next) return;
  current.classList.remove('active');
  setTimeout(() => next.classList.add('active'), 300);
}

/* Lock */
function unlock() {
  const pass = document.getElementById("password").value.toLowerCase();
  if (pass === "deepika") goTo("letter");
  else document.getElementById("error").innerText = "Wrong name 💔";
}

/* Typing promises */
const promises = [
  "I promise to respect you.",
  "I promise to choose you.",
  "I promise to stay."
];

let i = 0;
function typePromise() {
  if (i < promises.length) {
    document.getElementById("typing").innerHTML += promises[i] + "<br>";
    i++;
    setTimeout(typePromise, 1200);
  }
}
typePromise();

/* Loop */
function startLoop() {
  loopTransition.style.display = "flex";
  loopTransition.style.opacity = "1";
  setTimeout(() => {
    loopTransition.style.opacity = "0";
    setTimeout(() => {
      loopTransition.style.display = "none";
      goTo("home");
    }, 600);
  }, 3500);
}

/* Heart rain */
const heartEmojis = ["💖","💕","💗","💓","💘"];
const heartContainer = document.querySelector(".hearts");

setInterval(() => {
  const heart = document.createElement("span");
  heart.innerText = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 16 + Math.random()*20 + "px";
  heart.style.animationDuration = 5 + Math.random()*4 + "s";
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 9000);
}, 600);

/* 💘 MINI GAME */
let score = 0;
const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const scoreText = document.getElementById("score");
const gameBtn = document.getElementById("gameBtn");

gameArea.addEventListener("mousemove", e => {
  const rect = gameArea.getBoundingClientRect();
  basket.style.left = Math.min(Math.max(e.clientX - rect.left, 20), rect.width - 20) + "px";
});

gameArea.addEventListener("touchmove", e => {
  const rect = gameArea.getBoundingClientRect();
  basket.style.left = Math.min(Math.max(e.touches[0].clientX - rect.left, 20), rect.width - 20) + "px";
});

function dropHeart() {
  if (!document.getElementById("game").classList.contains("active")) return;

  const heart = document.createElement("div");
  heart.className = "falling-heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * 90 + "%";
  gameArea.appendChild(heart);

  const check = setInterval(() => {
    const h = heart.getBoundingClientRect();
    const b = basket.getBoundingClientRect();
    if (h.bottom >= b.top && h.left < b.right && h.right > b.left) {
      score++;
      scoreText.innerText = score;
      heart.remove();
      clearInterval(check);
      if (score >= 10) gameBtn.style.display = "inline-block";
    }
  }, 50);

  setTimeout(() => {
    heart.remove();
    clearInterval(check);
  }, 3000);
}

setInterval(dropHeart, 800);
