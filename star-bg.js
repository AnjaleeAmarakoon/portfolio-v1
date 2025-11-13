// Star background animation
const starCanvas = document.createElement('canvas');
starCanvas.id = 'star-bg';
starCanvas.style.position = 'fixed';
starCanvas.style.top = '0';
starCanvas.style.left = '0';
starCanvas.style.width = '100vw';
starCanvas.style.zIndex = '-1';
starCanvas.style.pointerEvents = 'none';
starCanvas.style.display = 'block';


function insertStarCanvas() {
  if (!document.getElementById('star-bg')) {
    const footer = document.querySelector('footer');
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(starCanvas, footer);
    } else {
      document.body.appendChild(starCanvas);
    }
    resizeCanvas();
    createStars();
    animateStars();
  }
  starCanvas.style.display = 'block';
}

function removeStarCanvas() {
  if (document.getElementById('star-bg')) {
    starCanvas.style.display = 'none';
  }
}

function updateStarBgTheme() {
  if (document.body.classList.contains('dark-theme')) {
    insertStarCanvas();
  } else {
    removeStarCanvas();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  updateStarBgTheme();
});

// Listen for theme changes
const observer = new MutationObserver(updateStarBgTheme);
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

const ctx = starCanvas.getContext('2d');
let stars = [];
const STAR_COUNT = 180;
const STAR_COLOR = '#fff';
const STAR_SIZE = 1.5;
const STAR_SPEED = 0.5;

function getCanvasHeight() {
  const footer = document.querySelector('footer');
  if (!footer) return window.innerHeight;
  const rect = footer.getBoundingClientRect();
  // Height from top of viewport to top of footer, plus scroll offset
  return rect.top + window.scrollY;
}

function resizeCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = getCanvasHeight();
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: Math.random() * STAR_SIZE + 0.5,
      speed: Math.random() * STAR_SPEED + 0.05
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  ctx.save();
  ctx.globalAlpha = 0.4;
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = STAR_COLOR;
    ctx.shadowColor = STAR_COLOR;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.closePath();
  }
  ctx.restore();
}

function animateStars() {
  for (let star of stars) {
    star.y += star.speed;
    if (star.y > starCanvas.height) {
      star.x = Math.random() * starCanvas.width;
      star.y = 0;
    }
  }
  drawStars();
  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createStars();
});

window.addEventListener('scroll', () => {
  resizeCanvas();
});
