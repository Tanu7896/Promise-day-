const screens = document.querySelectorAll('.screen');
const music = document.getElementById('bgMusic');

function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* Intro */
function startExperience() {
  document.getElementById('intro').classList.remove('active');
  showScreen('home');
  music.play().catch(() => {});
}

/* Maze logic */
const player = document.getElementById("player");
const goal = document.getElementById("goal");
const maze = document.getElementById("mazeContainer");
const walls = document.querySelectorAll(".wall");
const knob = document.getElementById("joystickKnob");
const base = document.getElementById("joystickBase");
const msg = document.getElementById("mazeMsg");

let px = 10, py = 10;
let dragging = false;

knob.addEventListener("pointerdown", () => dragging = true);
document.addEventListener("pointerup", () => {
  dragging = false;
  knob.style.transform = "translate(0,0)";
});

document.addEventListener("pointermove", e => {
  if (!dragging) return;

  const rect = base.getBoundingClientRect();
  const dx = e.clientX - (rect.left + 60);
  const dy = e.clientY - (rect.top + 60);

  const dist = Math.min(30, Math.hypot(dx, dy));
  const angle = Math.atan2(dy, dx);

  const mx = Math.cos(angle) * dist;
  const my = Math.sin(angle) * dist;

  knob.style.transform = `translate(${mx}px,${my}px)`;
  tryMove(mx * 0.06, my * 0.06);
});

function tryMove(dx, dy) {
  let nx = px + dx;
  let ny = py + dy;

  nx = Math.max(0, Math.min(230, nx));
  ny = Math.max(0, Math.min(230, ny));

  const test = { left:nx, top:ny, right:nx+24, bottom:ny+24 };

  for (let wall of walls) {
    const r = wall.getBoundingClientRect();
    const m = maze.getBoundingClientRect();

    const w = {
      left: r.left - m.left,
      top: r.top - m.top,
      right: r.right - m.left,
      bottom: r.bottom - m.top
    };

    if (
      test.right > w.left &&
      test.left < w.right &&
      test.bottom > w.top &&
      test.top < w.bottom
    ) return;
  }

  px = nx; py = ny;
  player.style.left = px + "px";
  player.style.top = py + "px";

  if (py > 230) {
    msg.innerText = "You found the way out 💖";
  }
}
