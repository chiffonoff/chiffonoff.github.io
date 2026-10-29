/* ---- 作品カードを生成 ---- */
const esc = t => String(t).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

WORKS.forEach((w, i) => {
  const grid = document.getElementById('grid-' + w.section);
  if (!grid) return;
  const item = document.createElement('div');
  item.className = 'work-item';
  item.dataset.stage = w.badge || '';
  item.tabIndex = 0;
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', w.title + ' の詳細を開く');
  item.innerHTML = `
    <img src="${thumbOf(w)}" alt="${esc(w.title)}" loading="lazy" draggable="false">
    ${w.youtube ? '<span class="play-mark">▶</span>' : ''}
    <div class="overlay"><p>${esc(w.title)}</p></div>`;
  item.addEventListener('click', () => { if (!dragMoved) openModal(i); });
  item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(i); } });
  grid.appendChild(item);
});

/* 枚数が少ない列は矢印を隠す */
document.querySelectorAll('.works-scroll-wrap').forEach(wrap => {
  const n = wrap.querySelectorAll('.work-item').length;
  if (n <= 3) wrap.classList.add('few');
});

/* ---- モーダル ---- */
const modal      = document.getElementById("modal");
const modalImg   = document.getElementById("modal-img");
const modalThumbs= document.getElementById("modal-thumbs");
const modalMedia = document.querySelector(".modal-media");
const closeBtn   = document.getElementById("close");
let dragMoved = false;

function showMedia(w, idx) {
  const old = modalMedia.querySelector('.modal-video');
  if (old) old.remove();
  if (idx === 'video') {
    modalImg.hidden = true;
    const box = document.createElement('div');
    box.className = 'modal-video';
    box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${w.youtube}?autoplay=1" title="${esc(w.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    modalMedia.insertBefore(box, modalThumbs);
  } else {
    modalImg.hidden = false;
    modalImg.src = imgUrl(w.imgs[idx]);
    modalImg.alt = w.title;
  }
  modalThumbs.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.idx === String(idx)));
}

function openModal(i) {
  const w = WORKS[i];
  document.getElementById('modal-badge').textContent = w.badge || '';
  document.getElementById('modal-title').textContent = w.title;
  document.getElementById('modal-text').textContent = w.text || '';
  document.getElementById('modal-tags').innerHTML = (w.tags || []).map(t => `<span>${esc(t)}</span>`).join('');

  const links = [];
  if (w.youtube) links.push(`<a href="https://youtu.be/${w.youtube}" target="_blank" rel="noopener" class="modal-link">▶ YouTubeで見る</a>`);
  if (w.link)    links.push(`<a href="${w.link}" target="_blank" rel="noopener" class="modal-link">ViViViTで詳しく見る</a>`);
  document.getElementById('modal-links').innerHTML = links.join('');

  const thumbs = [];
  if (w.youtube) thumbs.push(`<button data-idx="video" aria-label="動画"><img src="https://img.youtube.com/vi/${w.youtube}/default.jpg" alt=""><span>▶</span></button>`);
  (w.imgs || []).forEach((p, k) => thumbs.push(`<button data-idx="${k}" aria-label="画像${k + 1}"><img src="${imgUrl(p, 200)}" alt=""></button>`));
  modalThumbs.innerHTML = thumbs.length > 1 ? thumbs.join('') : '';
  modalThumbs.querySelectorAll('button').forEach(b => b.addEventListener('click', () => showMedia(w, b.dataset.idx === 'video' ? 'video' : +b.dataset.idx)));

  showMedia(w, (w.imgs && w.imgs.length) ? 0 : 'video');
  modal.classList.add("active");
  document.body.classList.add('modal-open');
  closeBtn.focus();
}

function closeModal() {
  modal.classList.remove("active");
  document.body.classList.remove('modal-open');
  const v = modalMedia.querySelector('.modal-video');
  if (v) v.remove();
}

closeBtn.onclick = closeModal;
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
window.onclick = function(e) { if (e.target === modal) closeModal(); };

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
    dragMoved = false;
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
    if (Math.abs(walk) > 5) dragMoved = true;
    grid.scrollLeft = scrollLeft - walk;
  });
});

// ---- 横スクロール：矢印ボタン ----
function scrollWorks(btn, dir) {
  const grid = btn.parentElement.querySelector('.works-grid');
  const cardWidth = grid.querySelector('.work-item').offsetWidth + 16;
  grid.scrollBy({ left: cardWidth * dir, behavior: 'smooth' });
}