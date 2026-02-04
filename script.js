const pages = document.querySelectorAll('.page');
const music = document.getElementById('bgMusic');
const intro = document.getElementById('intro');
const transition = document.getElementById('transition');

function goTo(id) {
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startExperience() {
  intro.style.display = "none";
  music.play();
  goTo("home");
}

function unlock() {
  const pass = document.getElementById("password").value.toLowerCase();
  if (pass === "deepika") goTo("letter");
  else document.getElementById("error").innerText = "Wrong name 💔";
}

function startLoop() {
  transition.style.display = "flex";
  setTimeout(() => {
    transition.style.display = "none";
    goTo("home");
  }, 4500);
}

/* Typing promises */
const text = [
  "I promise to respect you.",
  "I promise to choose you.",
  "I promise to stay."
];

let i = 0;
function typePromise() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text[i] + "<br>";
    i++;
    setTimeout(typePromise, 1200);
  }
}
typePromise();
