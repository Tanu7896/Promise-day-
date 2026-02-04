const pages = document.querySelectorAll('.page');
const loopTransition = document.getElementById('loopTransition');
const intro = document.getElementById('intro');
const music = document.getElementById('bgMusic');

/* Start experience (browser-safe music) */
function startExperience() {
  intro.style.display = "none";
  music.play().catch(() => {});
}

/* Smooth page change */
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

/* Loop back */
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

/* 💕 Emoji heart rain */
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
