const pages = document.querySelectorAll('.page');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

function goTo(id) {
  pages.forEach(page => page.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* Music */
musicBtn.onclick = () => {
  if (music.paused) {
    music.play();
    musicBtn.innerText = "⏸ Music";
  } else {
    music.pause();
    musicBtn.innerText = "▶ Music";
  }
};

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
  if (pass === "deepika") {
    goTo("letter");
  } else {
    document.getElementById("error").innerText = "Wrong name 💔";
  }
}

/* Forever Loop */
function loopForever() {
  const msg = document.getElementById("loopMessage");

  msg.innerText =
    "Oh...? Back to home page again..... Maybe it symbolises how we always come back to each other 😁";

  msg.style.opacity = 1;

  setTimeout(() => {
    msg.style.opacity = 0;
  }, 3500);

  setTimeout(() => {
    goTo("home");
  }, 5000);
}
