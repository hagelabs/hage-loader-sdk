"use strict";

const DEFAULT_STAGES = [
  { at: 0.30, text: "Initializing..." },
  { at: 0.60, text: "Loading assets..." },
  { at: 0.85, text: "Compiling shaders..." },
  { at: 1.01, text: "Almost ready..." }
];

const STYLE_ID = "hage-loader-style";

const INLINE_CSS =
  "*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}" +
  ":root{--brand:#ff005a;--bg:#0a0a0a;--text-muted:rgba(255,255,255,.38);" +
  "--font-mono:ui-monospace,'SF Mono',Menlo,Monaco,Consolas,monospace;" +
  "--font-body:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;" +
  "--game-w:1080;--game-h:720}" +
  "html,body{width:100%;height:100%;background:var(--bg);overflow:hidden;font-family:var(--font-body)}" +
  "#hage-canvas-wrapper{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);" +
  "width:fit-content;height:fit-content;line-height:0}" +
  "#hage-canvas{display:block;background:#000}" +
  "#hg-loading{position:fixed;inset:0;background:var(--bg);display:flex;flex-direction:column;" +
  "align-items:center;justify-content:center;gap:36px;z-index:100;transition:opacity .55s ease}" +
  "#hg-loading.fade-out{opacity:0;pointer-events:none}" +
  ".hg-brand{display:flex;flex-direction:column;align-items:center;gap:14px;animation:hgUp .5s ease both}" +
  ".hg-logo-img{width:200px;height:auto;object-fit:contain}" +
  ".hg-sub{font-size:11px;color:var(--text-muted);letter-spacing:2.5px;text-transform:uppercase}" +
  ".hg-progress{width:240px;display:flex;flex-direction:column;gap:10px;animation:hgUp .5s .1s ease both}" +
  ".hg-bar-bg{width:100%;height:3px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden}" +
  ".hg-bar-fill{height:100%;width:0%;background:var(--brand);border-radius:99px;transition:width .2s ease}" +
  ".hg-bar-meta{display:flex;justify-content:space-between;align-items:center}" +
  ".hg-status{font-size:11px;color:var(--text-muted);letter-spacing:.4px}" +
  ".hg-pct{font-family:var(--font-mono);font-size:11px;color:var(--brand)}" +
  "@keyframes hgUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}";

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = INLINE_CSS;
  document.head.appendChild(style);
}

function ensureCanvas(canvasId) {
  let canvas = document.getElementById(canvasId);
  if (canvas) {
    const parent = canvas.parentElement;
    if (!parent || parent.id !== "hage-canvas-wrapper") {
      const wrap = document.createElement("div");
      wrap.id = "hage-canvas-wrapper";
      canvas.parentNode.insertBefore(wrap, canvas);
      wrap.appendChild(canvas);
    }
    return canvas;
  }
  const wrapper = document.createElement("div");
  wrapper.id = "hage-canvas-wrapper";
  canvas = document.createElement("canvas");
  canvas.id = canvasId;
  canvas.tabIndex = -1;
  wrapper.appendChild(canvas);
  document.body.appendChild(wrapper);
  return canvas;
}

function ensureOverlay() {
  let overlay = document.getElementById("hg-loading");
  if (overlay) return overlay;
  overlay = document.createElement("div");
  overlay.id = "hg-loading";
  overlay.innerHTML =
    '<div class="hg-brand">' +
    '<img class="hg-logo-img" alt="" />' +
    '<div class="hg-sub"></div>' +
    '</div>' +
    '<div class="hg-progress">' +
    '<div class="hg-bar-bg"><div class="hg-bar-fill" id="hg-fill"></div></div>' +
    '<div class="hg-bar-meta">' +
    '<div class="hg-status" id="hg-status">Initializing...</div>' +
    '<div class="hg-pct" id="hg-pct">0%</div>' +
    '</div></div>';
  document.body.appendChild(overlay);
  return overlay;
}

export function init(opts) {
  opts = opts || {};
  const productName = opts.productName || "Game";
  const logoUrl = opts.logoUrl || "";
  const subText = opts.subText || "Loading game";
  const gameW = opts.gameWidth || 1080;
  const gameH = opts.gameHeight || 720;
  const brand = opts.brandColor || "#ff005a";
  const stages = opts.statusStages || DEFAULT_STAGES;
  const minDisplayMs = opts.minDisplayMs || 0;
  const canvasId = opts.canvasId || "hage-canvas";
  const skipStyles = opts.skipStyles === true;
  const skipCanvas = opts.skipCanvas === true;
  const skipTitle = opts.skipTitle === true;
  const startedAt = Date.now();

  if (productName && !skipTitle) document.title = productName;
  if (!skipStyles) injectStyles();

  document.documentElement.style.setProperty("--brand", brand);
  document.documentElement.style.setProperty("--game-w", String(gameW));
  document.documentElement.style.setProperty("--game-h", String(gameH));

  let canvas = null;
  if (!skipCanvas) {
    canvas = ensureCanvas(canvasId);
    canvas.width = gameW;
    canvas.height = gameH;
  }

  const overlay = ensureOverlay();
  const fill = overlay.querySelector("#hg-fill");
  const pctEl = overlay.querySelector("#hg-pct");
  const statusEl = overlay.querySelector("#hg-status");
  const logoEl = overlay.querySelector(".hg-logo-img");
  const subEl = overlay.querySelector(".hg-sub");

  if (logoEl) {
    if (logoUrl) logoEl.src = logoUrl;
    logoEl.alt = productName;
    if (!logoUrl) logoEl.style.display = "none";
  }
  if (subEl) subEl.textContent = subText;

  function fitCanvas() {
    if (!canvas) return;
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    const scale = Math.min(vpW / gameW, vpH / gameH);
    canvas.style.width = Math.round(gameW * scale) + "px";
    canvas.style.height = Math.round(gameH * scale) + "px";
  }
  if (canvas) {
    fitCanvas();
    window.addEventListener("resize", fitCanvas);
  }

  function setProgress(p) {
    if (typeof p !== "number" || isNaN(p)) return;
    p = Math.max(0, Math.min(1, p));
    const pct = Math.round(p * 100);
    if (fill) fill.style.width = pct + "%";
    if (pctEl) pctEl.textContent = pct + "%";
    if (statusEl && stages && stages.length) {
      for (let i = 0; i < stages.length; i++) {
        if (p < stages[i].at) {
          statusEl.textContent = stages[i].text;
          break;
        }
      }
    }
  }

  function hide() {
    const elapsed = Date.now() - startedAt;
    const wait = Math.max(0, minDisplayMs - elapsed);
    setTimeout(function () {
      if (!overlay) return;
      overlay.classList.add("fade-out");
      setTimeout(function () {
        overlay.style.display = "none";
      }, 560);
    }, wait);
  }

  function error(msg) {
    if (statusEl) {
      statusEl.textContent = msg || "Failed to load. Please refresh.";
      statusEl.style.color = brand;
    }
  }

  return { setProgress, hide, error, canvas, overlay };
}

export default { init };
