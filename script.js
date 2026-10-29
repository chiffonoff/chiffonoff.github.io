const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalText = document.getElementById("modal-text");
const closeBtn = document.getElementById("close");

function openModal(src, text) {
  modalImg.src = src;
  modal.classList.add("active");
  modalText.textContent = text;
}

closeBtn.onclick = function() {
  modal.classList.remove("active");
};
document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.classList.remove("active");
});

window.onclick = function(e) {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
};

document.querySelectorAll(".work-item").forEach(item => {
  item.addEventListener("mousemove", e => {
    const rect = item.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    item.style.transform =
      `rotateY(${x * 40}deg) rotateX(${y * -40}deg) scale(1.05)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "rotate(0) scale(1)";
  });
});


const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

// マウス取得
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// なめらか追従（ここだけ）
function animate() {
  posX += (mouseX - posX) * 0.35;
  posY += (mouseY - posY) * 0.35;

  cursor.style.left = posX + "px";
  cursor.style.top = posY + "px";

  requestAnimationFrame(animate);
}
animate();

// ホバーだけ
document.querySelectorAll("a, .work-item").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });
});

// ウィンドウ外
window.addEventListener("blur", () => {
  cursor.style.opacity = "0";
});

window.addEventListener("focus", () => {
  cursor.style.opacity = "1";
});

// ローディング
const loadingEl = document.getElementById("loading");
const loadingNum = document.getElementById("loading-num");
const segs = document.querySelectorAll(".loading-seg");

let count = 0;
const interval = setInterval(() => {
  count += Math.floor(Math.random() * 10) + 1;
  if (count >= 100) count = 100;

  loadingNum.textContent = count;

  // 点灯するセグメント数を計算
  const litCount = Math.round((count / 100) * segs.length);
  segs.forEach((seg, i) => {
    if (i < litCount) {
      seg.classList.add("lit");
    }
  });

  if (count >= 100) {
    clearInterval(interval);
    setTimeout(() => {
      loadingEl.style.opacity = "0";
      setTimeout(() => loadingEl.style.display = "none", 800);
    }, 300);
  }
}, 80);

// グリッド歪み
const canvas = document.getElementById('grid-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let mx = canvas.width / 2;
let my = canvas.height / 2;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const step = 85;
  const t = Date.now() / 2000;
  ctx.strokeStyle = 'rgba(13, 13, 26, 0.12)';
  ctx.lineWidth = 0.5;

  // 縦線
  for (let x = 0; x <= canvas.width; x += step) {
    ctx.beginPath();
    for (let y = 0; y <= canvas.height; y += 4) {
      const wave = Math.sin(y / 80 + t + x / 200) * 8;
      const dx = x - mx, dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 100 - dist) / 100;
      const mx_offset = (dx / (dist || 1)) * force * 15;
      y === 0
        ? ctx.moveTo(x + wave + mx_offset, y)
        : ctx.lineTo(x + wave + mx_offset, y);
    }
    ctx.stroke();
  }

  // 横線
  for (let y = 0; y <= canvas.height; y += step) {
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 4) {
      const wave = Math.sin(x / 80 + t + y / 200) * 8;
      const dx = x - mx, dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 100 - dist) / 100;
      const my_offset = (dy / (dist || 1)) * force * 15;
      x === 0
        ? ctx.moveTo(x, y + wave + my_offset)
        : ctx.lineTo(x, y + wave + my_offset);
    }
    ctx.stroke();
  }

  requestAnimationFrame(drawGrid);
}

// Enter ボタン
function enterSite() {
  const top = document.getElementById('top-screen');
  const btn = document.getElementById('enter-btn');

  // ボタンをフラッシュ
  btn.textContent = '▶ LOADING...';
  btn.disabled = true;

  // グリッドをピクセル分解するように白フラッシュを重ねる
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed; inset: 0; z-index: 9998;
    background: var(--bg);
    opacity: 0;
    transition: opacity 0.15s ease;
    pointer-events: none;
  `;
  document.body.appendChild(flash);

  // Step1: 少し待ってフラッシュ
  setTimeout(() => { flash.style.opacity = '1'; }, 100);

  // Step2: トップ画面をスケールアップしながらフェード
  setTimeout(() => {
    top.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    top.style.transform  = 'scale(1.04)';
    top.style.opacity    = '0';
    top.style.pointerEvents = 'none';
  }, 250);

  // Step3: フラッシュを抜いてコンテンツ表示
  setTimeout(() => {
    top.style.display = 'none';
    document.body.classList.add('entered');
    flash.style.transition = 'opacity 0.6s ease';
    flash.style.opacity = '0';
  }, 750);

  // Step4: フラッシュ要素を削除
  setTimeout(() => { flash.remove(); }, 1400);
}

// リサイズ対応
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

drawGrid();

// スクロールでフェードイン
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});
// ---- Contact フォーム送信 ----
function setStatus(msg) {
  const el = document.getElementById('form-status');
  if (el) el.textContent = msg;
}
async function handleContact(e) {
  e.preventDefault();

  const form = e.target;
  const btn  = form.querySelector('.contact-btn');
  const inputs = form.querySelectorAll('input, textarea');

  // ボタンをローディング状態に
  btn.textContent = '▶ SENDING...';
  btn.disabled = true;

  const body = new FormData();
  body.append('name',    inputs[0].value);
  body.append('email',   inputs[1].value);
  body.append('message', inputs[2].value);

  try {
    const res  = await fetch('contact.php', { method: 'POST', body });
    const data = await res.json();

    if (data.success) {
      setStatus('送信しました。ありがとうございます！');
      btn.textContent = '▶ SENT ✓';
      btn.style.borderColor = '#00c2ff';
      btn.style.color       = '#00c2ff';
      form.reset();
    } else {
      setStatus(data.message || '送信に失敗しました。時間をおいて再度お試しください。');
      btn.textContent = '▶ SEND MESSAGE';
      btn.disabled = false;
    }
  } catch {
    setStatus('現在フォーム送信は準備中です。下のSNSからご連絡ください。');
    btn.textContent = '▶ SEND MESSAGE';
    btn.disabled = false;
  }
}

// ---- 横スクロール：ドラッグ ----
document.querySelectorAll('.works-grid').forEach(grid => {
  let isDown = false;
  let startX, scrollLeft;

  grid.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - grid.offsetLeft;
    scrollLeft = grid.scrollLeft;
  });

  grid.addEventListener('mouseleave', () => { isDown = false; });
  grid.addEventListener('mouseup',    () => { isDown = false; });

  grid.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - grid.offsetLeft;
    const walk = (x - startX) * 1.2;
    grid.scrollLeft = scrollLeft - walk;
  });
});

// ---- 横スクロール：矢印ボタン ----
function scrollWorks(btn, dir) {
  const grid = btn.parentElement.querySelector('.works-grid');
  const cardWidth = grid.querySelector('.work-item').offsetWidth + 16;
  grid.scrollBy({ left: cardWidth * dir, behavior: 'smooth' });
}