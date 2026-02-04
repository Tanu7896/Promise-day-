const pages = document.querySelectorAll('.page');
const music = document.getElementById('bgMusic');
const intro = document.getElementById('intro');
const transition = document.getElementById('transition');

/* Start experience */
function startExperience() {
  intro.style.display = "none";
  music.play();
}

/* Navigation */
function goTo(id) {
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* Typing promises */
const promises = [
  "I promise to respect you, always.",
  "I promise to choose you every day.",
  "I promise to never give up on us.",
  "I promise honesty, even when it’s hard.",
  "I promise my heart belongs to you."
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

/* Unlock */
function unlock() {
  const pass = document.getElementById("password").value.toLowerCase();
  if (pass === "deepika") goTo("letter");
  else document.getElementById("error").innerText = "Wrong name 💔";
}

/* Forever loop */
function startLoop() {
  transition.style.display = "flex";
  setTimeout(() => {
    transition.style.display = "none";
    goTo("home");
  }, 5000);
}

/* Floating hearts */
const hearts = document.querySelector('.hearts');
setInterval(() => {
  const heart = document.createElement('span');
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}, 700);
