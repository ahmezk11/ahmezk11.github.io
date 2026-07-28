(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // opt in to scroll animations only when JS + IO are actually available
  var canAnimate = !reduced && 'IntersectionObserver' in window;
  // 'js' marks that scripts really run, so CSS can show JS-only controls.
  document.documentElement.classList.add('js');
  if (canAnimate) document.documentElement.classList.add('js-anim');

  /* ---------- boot ----------
     Shown only once JS is confirmed running, so a blocked script can never
     leave the page stuck behind the overlay. Dismissed by the timer or by any
     interaction — keydown alone is not enough, since an unfocused iframe
     never receives key events. */
  var boot = document.getElementById('boot');
  function killBoot() {
    if (boot) boot.classList.add('done');
    document.documentElement.classList.remove('boot-on');
  }
  if (boot && !reduced) {
    document.documentElement.classList.add('boot-on');
    var bootTimer = setTimeout(killBoot, 2200);
    function dismiss() { clearTimeout(bootTimer); killBoot(); }
    ['pointerdown', 'click', 'touchstart', 'keydown', 'wheel', 'scroll'].forEach(function (ev) {
      window.addEventListener(ev, dismiss, { once: true, passive: true });
    });
    boot.addEventListener('click', dismiss, { once: true });
  }

  /* ---------- typewriter ---------- */
  var typed = document.getElementById('typed');
  var LINES = [
    'CS STUDENT · CLASS OF 2027',
    'SECURITY OPERATIONS ANALYST',
    'DATA + AUTOMATION BUILDER',
    'FRAUD HUNTER @ FRESHA'
  ];
  if (typed) {
    if (reduced) { typed.textContent = LINES[0]; }
    else {
      var li = 0, ci = 0, del = false;
      (function tick() {
        var full = LINES[li];
        typed.textContent = full.slice(0, ci);
        if (!del && ci < full.length) { ci++; setTimeout(tick, 55); }
        else if (!del) { del = true; setTimeout(tick, 1700); }
        else if (ci > 0) { ci--; setTimeout(tick, 26); }
        else { del = false; li = (li + 1) % LINES.length; setTimeout(tick, 260); }
      })();
    }
  }

  /* ---------- reveal + stat bars ---------- */
  var io = canAnimate ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      en.target.querySelectorAll('.bar').forEach(function (bar) {
        var fill = bar.querySelector('i');
        if (fill) setTimeout(function () { fill.style.width = bar.dataset.fill + '%'; }, 180);
      });
      io.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' }) : null;
  if (io) {
    // collapse the bars first so they can animate up on reveal
    document.querySelectorAll('.bar i').forEach(function (f) { f.style.width = '0%'; });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }

  /* ---------- project filters ---------- */
  var filts = document.querySelectorAll('.filt');
  var items = document.querySelectorAll('.item');
  filts.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filts.forEach(function (b) { b.classList.remove('is-on'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-on');
      btn.setAttribute('aria-selected', 'true');
      var f = btn.dataset.f;
      items.forEach(function (it) {
        it.classList.toggle('hide', f !== 'all' && it.dataset.c !== f);
      });
    });
  });

  /* ---------- nav ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var links = document.querySelector('.nav-links');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ---------- score counter ---------- */
  var scoreEl = document.getElementById('score');
  function onScroll() {
    if (nav) nav.classList.toggle('stuck', window.scrollY > 20);
    if (scoreEl) {
      var max = document.body.scrollHeight - window.innerHeight;
      var pct = max > 0 ? window.scrollY / max : 0;
      var v = Math.round(pct * 133700);
      scoreEl.textContent = String(v).padStart(6, '0');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- konami ---------- */
  var CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var pos = 0;
  window.addEventListener('keydown', function (e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = (k === CODE[pos]) ? pos + 1 : (k === CODE[0] ? 1 : 0);
    if (pos === CODE.length) {
      pos = 0;
      document.body.classList.toggle('rainbow');
      var t = document.createElement('div');
      t.textContent = '★ CHEAT ACTIVATED ★';
      t.style.cssText = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:200;' +
        'font-family:var(--font);font-size:14px;color:#ffc75a;background:#0a0a18;border:3px solid #ffc75a;' +
        'padding:22px 26px;box-shadow:8px 8px 0 rgba(0,0,0,.6);text-align:center';
      document.body.appendChild(t);
      setTimeout(function () { t.remove(); }, 1600);
    }
  });
})();
