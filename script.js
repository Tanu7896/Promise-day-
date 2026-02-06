const pages = document.querySelectorAll('.page');

/* Simple navigation */
function goTo(id) {
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* Maze logic */
const player = document.getElementById("player");
const goal = document.getElementById("goal");
const walls = document.querySelectorAll(".wall");
const maze = document.getElementById("mazeContainer");
const knob = document.getElementById("joystickKnob");
const base = document.getElementById("joystickBase");
const msg = document.getElementById("mazeMsg");

let dragging = false;
let px = 10, py = 10;
const speed = 1.8;

/* Reset */
function resetPlayer() {
  px = 10;
  py = 10;
  player.style.left = px + "px";
  player.style.top = py + "px";
}
resetPlayer();

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
  movePlayer(mx * speed * 0.05, my * speed * 0.05);
});

/* Movement */
function movePlayer(dx, dy) {
  let newX = px + dx;
  let newY = py + dy;

  /* Clamp to border — NO reset */
  newX = Math.max(0, Math.min(250, newX));
  newY = Math.max(0, Math.min(250, newY));

  player.style.left = newX + "px";
  player.style.top = newY + "px";
  createTrail(newX, newY);

  const pRect = player.getBoundingClientRect();

  /* Wall collision + proximity glow */
  walls.forEach(wall => {
    const w = wall.getBoundingClientRect();

    const distance =
      Math.abs((pRect.left + pRect.width / 2) - (w.left + w.width / 2)) +
      Math.abs((pRect.top + pRect.height / 2) - (w.top + w.height / 2));

    if (distance < 90) {
      wall.classList.add("near");
    } else {
      wall.classList.remove("near");
    }

    /* Actual collision */
    if (
      pRect.right > w.left &&
      pRect.left < w.right &&
      pRect.bottom > w.top &&
      pRect.top < w.bottom
    ) {
      msg.innerText = "Oops… wrong turn 😅";
      resetPlayer();
    }
  });

  /* Goal */
  const g = goal.getBoundingClientRect();
  if (
    pRect.right > g.left &&
    pRect.left < g.right &&
    pRect.bottom > g.top &&
    pRect.top < g.bottom
  ) {
    msg.innerText = "You found your way to my heart 💖";
  }

  px = newX;
  py = newY;
}
