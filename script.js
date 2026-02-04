const pages = document.querySelectorAll('.page');
const loopTransition = document.getElementById('loopTransition');

/* Smooth page change */
function goTo(id) {
  const current = document.querySelector('.page.active');
  const next = document.getElementById(id);

  if (!next || current === next) return;

  // fade out current
  current.classList.remove('active');

  // wait for fade-out, then fade in next
  setTimeout(() => {
    next.classList.add('active');
  }, 300);
}

/* Lock */
function unlock() {
  const pass = document.getElementById("password").value.toLowerCase();
  if (pass === "deepika") {
    goTo("letter");
  } else {
    document.getElementById("error").innerText = "Wrong name 💔";
  }
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

/* Final → Home loop with clean transition */
function startLoop() {
  loopTransition.style.display = "flex";
  loopTransition.style.opacity = "1";
  loopTransition.style.pointerEvents = "auto";

  setTimeout(() => {
    loopTransition.style.opacity = "0";
    loopTransition.style.pointerEvents = "none";

    setTimeout(() => {
      loopTransition.style.display = "none";
      goTo("home");
    }, 600);

  }, 3500);
}
