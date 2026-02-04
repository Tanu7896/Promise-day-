const pages = document.querySelectorAll('.page');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

function goTo(id) {
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

musicBtn.onclick = () => {
  if (music.paused) {
    music.play();
    musicBtn.innerText = "⏸ Music";
  } else {
    music.pause();
    musicBtn.innerText = "▶ Music";
  }
};

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
    document.getElementById('typing').innerHTML += promises[i] + "<br>";
    i++;
    setTimeout(typePromise, 1200);
  }
}
typePromise();

function unlock() {
  const pass = document.getElementById('password').value;
  if (pass.toLowerCase() === "deepika") {
    goTo('forever');
  } else {
    document.getElementById('error').innerText = "Wrong name 💔";
  }
}
