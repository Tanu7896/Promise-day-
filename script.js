const pages = document.querySelectorAll('.page');
const loopTransition = document.getElementById('loopTransition');

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

/* Final loop – popup AFTER home */
function startLoop() {
  goTo("home");

  setTimeout(() => {
    loopTransition.style.display = "flex";
    loopTransition.style.opacity = "1";
    loopTransition.style.pointerEvents = "auto";
  }, 400);

  setTimeout(() => {
    loopTransition.style.opacity = "0";
    loopTransition.style.pointerEvents = "none";
    setTimeout(() => loopTransition.style.display = "none", 600);
  }, 3500);
}

/* ❤️ Heart rain */
const hearts = document.querySelector('.hearts');
const heartEmojis = ["💖","💕","💗","💓","💘"];

setInterval(() => {
  const h = document.createElement("span");
  h.innerText = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 16 + Math.random()*20 + "px";
  h.style.animationDuration = 5 + Math.random()*4 + "s";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 9000);
}, 700);

/* ❤️ Heart Maze logic */
const player = document.getElementById("player");
const goal = document.getElementById("goal");
const walls = document.querySelectorAll(".wall");
const maze = document.getElementById("mazeContainer");
const knob = document.getElementById("joystickKnob");
const base = document.getElementById("joystickBase");
const msg = document.getElementById("mazeMsg");
const mazeBtn = document.getElementById("mazeBtn");

let dragging = false;
let px = 10, py = 10;
const speed = 1.7;

function resetPlayer() {
  px = 10;
  py = 10;
  player.style.left = px + "px";
  player.style.top = py + "px";
}
resetPlayer();

function createTrail(x, y) {
  const t = document.createElement("div");
  t.className = "trail";
  t.style.left = x + 9 + "px";
  t.style.top = y + 9 + "px";
  maze.appendChild(t);
  setTimeout(() => t.remove(), 800);
}

knob.addEventListener("pointerdown", () => dragging = true);
document.addEventListener("pointerup", () => {
  dragging = false;
  knob.style.transform = "translate(0,0)";
});

document.addEventListener("pointermove", e => {
  if (!dragging) return;

  const rect = base.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);

  const dist = Math.min(30, Math.hypot(dx, dy));
  const angle = Math.atan2(dy, dx);

  const mx = Math.cos(angle) * dist;
  const my = Math.sin(angle) * dist;

  knob.style.transform = `translate(${mx}px, ${my}px)`;
  movePlayer(mx * speed * 0.05, my * speed * 0.05);
});

function movePlayer(dx, dy) {
  const newX = px + dx;
  const newY = py + dy;
  if (newX < 0 || newY < 0 || newX > 250 || newY > 250) return;

  player.style.left = newX + "px";
  player.style.top = newY + "px";
  createTrail(newX, newY);

  const pRect = player.getBoundingClientRect();

  for (let wall of walls) {
    const w = wall.getBoundingClientRect();
    if (pRect.right > w.left &&
        pRect.left < w.right &&
        pRect.bottom > w.top &&
        pRect.top < w.bottom) {
      msg.innerText = "Oops… wrong turn 😅";
      resetPlayer();
      return;
    }
  }

  const g = goal.getBoundingClientRect();
  if (pRect.right > g.left &&
      pRect.left < g.right &&
      pRect.bottom > g.top &&
      pRect.top < g.bottom) {
    msg.innerText = "You found your way to my heart 💖";
    mazeBtn.style.display = "inline-block";
  }

  px = newX;
  py = newY;
}
