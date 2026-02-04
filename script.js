const pages = document.querySelectorAll('.page');
const loopTransition = document.getElementById('loopTransition');

/* Page navigation with smooth transition */
function goTo(id) {
  const current = document.querySelector('.page.active');
  const next = document.getElementById(id);

  if (current === next) return;

  current.classList.remove('active');

  setTimeout(() => {
    next.classList.add('active');
  }, 200);
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

/* Forever loop */
function startLoop() {
  loopTransition.style.display = "flex";

  setTimeout(() => {
    loopTransition.style.display = "none";
    goTo("home");
  }, 4000);
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
}, 800);
