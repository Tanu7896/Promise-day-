const pages = document.querySelectorAll('.page');
const intro = document.getElementById('intro');
const music = document.getElementById('bgMusic');

/* Start music */
function startExperience() {
  intro.style.display = "none";
  music.play().catch(() => {});
}

/* Navigation */
function goTo(id) {
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* Maze */
const player = document.getElementById("player");
const goal = document.getElementById("goal");
const walls = document.querySelectorAll(".wall");
const maze = document.getElementById("mazeContainer");
const knob = document.getElementById("joystickKnob");
const base = document.getElementById("joystickBase");
const msg = document.getElementById("mazeMsg");

let dragging = false;
let px = 10, py = 10;
const speed = 1.6;

/* Trail */
function createTrail(x, y) {
  const t = document.createElement("div");
  t.className = "trail";
  t.style.left = x + 9 + "px";
  t.style.top = y + 9 + "px";
  maze.appendChild(t);
  setTimeout(() => t.remove(), 800);
}

/* Joystick */
knob.addEventListener("pointerdown", e => {
  dragging = true;
  e.preventDefault();
});

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
  tryMove(mx * speed * 0.06, my * speed * 0.06);
});

/* Collision-safe movement */
function tryMove(dx, dy) {
  let newX = px + dx;
  let newY = py + dy;

  newX = Math.max(0, Math.min(250, newX));
  newY = Math.max(0, Math.min(250, newY));

  const testRect = {
    left: newX,
    top: newY,
    right: newX + 30,
    bottom: newY + 30
  };

  for (let wall of walls) {
    const w = wall.getBoundingClientRect();
    const m = maze.getBoundingClientRect();

    const wallRect = {
      left: w.left - m.left,
      top: w.top - m.top,
      right: w.right - m.left,
      bottom: w.bottom - m.top
    };

    const near =
      Math.abs((testRect.left + 15) - (wallRect.left + wallRect.right) / 2) +
      Math.abs((testRect.top + 15) - (wallRect.top + wallRect.bottom) / 2);

    wall.classList.toggle("near", near < 90);

    if (
      testRect.right > wallRect.left &&
      testRect.left < wallRect.right &&
      testRect.bottom > wallRect.top &&
      testRect.top < wallRect.bottom
    ) {
      return; // ❌ BLOCK movement only
    }
  }

  px = newX;
  py = newY;
  player.style.left = px + "px";
  player.style.top = py + "px";
  createTrail(px, py);

  const g = goal.getBoundingClientRect();
  const m = maze.getBoundingClientRect();
  const goalRect = {
    left: g.left - m.left,
    top: g.top - m.top,
    right: g.right - m.left,
    bottom: g.bottom - m.top
  };

  if (
    testRect.right > goalRect.left &&
    testRect.left < goalRect.right &&
    testRect.bottom > goalRect.top &&
    testRect.top < goalRect.bottom
  ) {
    msg.innerText = "You found your way to my heart 💖";
  }
}
