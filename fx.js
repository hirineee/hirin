/* ============================================================
   fx.js — 모든 페이지 공통 "잔잔한 연출" (가벼운 버전 / 트래픽 0)
   · 천천히 떠다니는 입자   · 클릭하면 모양이 톡 터짐   · 카드 살짝 기울기
   · 프사 클릭 이스터에그(프사 톡)   · 생일 D-Day 계산 도우미(fxDday)
   · 페이지 전환 로딩화면 + 레이아웃 "커지는 등장"(이미지·색은 그 사람에 맞춰 자동)

   ★★ 사람마다 바꿀 곳은 아래 "설정" 4줄뿐입니다 ★★
   우히 = 하트(♡). 다른 사람은 별(★) · 토끼(🐻) · 음표(♪) · 물방울(💧) 등으로 교체.
   - 글자 모양(♡ ★ ♪ ✦ ☆)은 그 사람 메인색(--main)으로 칠해집니다.
   - 이모지(🐻 ⭐ 💧)는 색칠 대신 이모지 그대로 보입니다. (둘 다 OK)

   사용법: 각 페이지 </body> 바로 위에 한 줄
     · 메인(루트 index.html):  <script src="fx.js"></script>
     · 서브폴더 페이지:         <script src="../fx.js"></script>
   색은 페이지의 --main 변수를 그대로 써서 다크모드까지 자동 적용됩니다.
   ============================================================ */

/* ─────────── 설정 (이 사람에 맞게 바꾸세요) ─────────── */
var BEAR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAANYElEQVR42s1ZW49kR1L+IiLznFNVXd3V1ff2eG7GxuML9mJY27IFu14JBGhhEfCEBBLwxh/YR/8LXnlAYiUWVgJxFTZjwLCydiUjy+tde8aenZ5LX2b6VpdzycwIHk71TI896132iSPlw6msyvwyMuKLL6LIzL6O/8eP+5w5SikRAIiIfWrOfsr97q356We2h/1YgCklEhEASCKSTn4/+7EB4Nk7UkqYffdHPimlEwAAoCISf8QBZTbo9Lx7yEkUQFKgH+p6MUZl72XCzADARDQWkQkAPtl0tiA9xMokInzqvdM0cW0yGXVIhBgAs4CIo8/9OHPu4NNruYctGmMcHI1Gj9dVfcnMuOgUW7n3ocUkN7IMWyLiACDG6E5Z+N7CswOl2QAzh7oOZ/bu3Hnu6PBw2WcZM7MyiRRFPi56xYdzvc73heR4dt30MICpaZql29u7v9w09Rozc5blEmM8z8w3vXCVYtwoU1xxTqyclphOqs0mhHkii8RCqslEHJw4gdmxz92tLMuQ55neuHFr4+DwYK3f77NzDmYQduxYiEytCHV4Ah5XAOzPLG8nAAlAmE6nGzs7uy/VTTjDLDIeTfx4vNNTpWWzuLy4uLg/3+8HVRUzNTNmYvSI2BMJCByY+TaRNCAWhoXQoKsaqCrjGiBL3U5PzEyPjg+tKkOfiWhxuLC3sbGeiKiTkj7GzB7AHgBypwJDy7KcH4/HZ8V5xKhhOq3m6rrpNk0w7x2apkllXQchcmYcnXd3s8wdiQiEhYg4MvNdGEUwCGqUTNnMyMzKuc78nV63H6qm9FVZr0zG415MiWIKG6oqZzY3r4uTfgih55y7CSD/9BXHGLUGWxZDQ8yoi6JT9npzTX+ue+yz3JyTOpOidt4HEb7NIgEAmwIkABkYhKz1cDFWAthgRnctAcKkmcsyVhaAeqPxaKGuwsruzt7CoD8oe/3uLgi5qg7MrHQPUoJSSmCOBmEx712ZZVJ3Oz04FuR5kTKf3WXmuwATAaYp+ZZ5ABgZneZJ1VnUUAvcATEFIZD2enO3im4H+wd7tLe3NwdYPJ5O1qNp3e3mWUqJvPc/cLN1IAIQAWoNAEEIgcQJet1eyn0O5wpz4raZeZ+gBmqjlsAtGG6h6KkDMwMghoDuhyOxmSk0maLB7cFgCSJu9WD/joWmthK6IYyjXrd7AwCftiCZGaVopE6pyArN81zyojN27PdEnBHR1KCqALd3yqfIzwB7kArpZBDAQu2XDIAyIhI5RwGU3Z7vLTRkvBKtptFomnuX7+V5fj2l1EZxS1mgXq9XLi0t3Q0hLHXygvO8ALMEYXeoZsakYiAh0Gczgc5A8unPaJYfCGCAwJIRsZoZEqWEJCFoTcRlp9OVaaWWZcpZ5sYAjgDkfDrX9nq9cmNj5U6304vsPDELGEJm5tqtCKfBaUqfm5RP5swMICZimjLLNjPvOydgERYhcUKRmY4du7Q4WBj3+70agBORB4jaVJVTsMI5YSiBISBiGMwAmCmIZi4HEnOeoCmR0X2z0SknVDEQAOecisDBaJfZrpKhD+LHPTAgMw6EiTd/W7N0lg1jInc8uxM5fSFW16FfTqsNgL14ryBCMiWDEdq9YApYMlJNTGAhEsDSbEJhp0fUE4sLrL18ZRAJVQz6kMgOXSacOaciZOIEZV2vlJNyOFM+YACUkAzARorpYhNCQUQgA5maAdYz2KaaeVVATc37LB8fHl946803ntvd2R705udjTHraeEhJyeW5ltOy8/blt5764L3vPVlX1ZwXMUDIeymzzF9h5j3xkot3QZhvE7gOKZxtYnPmXngIROu66ZVlPU8gbfUJg8iUiTwTz4FbH+gWXTs42O/+25tvnP37b/315sdXr2yIcE9TMrP7YZySotstbDwaub/6i79cf+vNNx69e3fvIoCVGIOmlMSMx977a0S0K0Ip89lx5tw0hrgxOhqfk5niAQBUVfRVVRcs7gHlZAptg5PmkgXXnSvi7s6O+8/L/1689513dX9nb3Mymq4RkZoaVA1JDUkTMgfUVWXv/ve78d1vf5f3tnfXAJwjs0VVNQDODMcA3SYWiIjz3nMMaa4smy6AeAJQQ1MPTW0FRCTMRgSYEbVBaB5mmzBaTIpMmLOOL2i+WGRmx8kSzXjSmMmciDGxhQQjdlgerrJHB3UZIoA5TXicjBZEkgEJzMw8I3p2rjFDSCE5AF2+F3xJWVX5hEROHP0eBxtYWFbL8fTx5dW11Rdfedk2z53V4XD5w+FyfyvG4JhYABaAWuUQwd55bJ4/k55+4XmsbzyCqkwwTYWqPREjLaqqQpUIICKYiGyz8C4RlsaT8hk3E6iPQm0d4NSa7v4tz7il5WBh3zRN1u127dXXvrT/5NPPyMrGcj4eVevJYuf2ta2FqpzyeDrG2XPnR4vLC2Wn4+mP/vRPfrAwXF7vLyzGalqaOCaodTTpeTJaA1AYjMAAEzWeXZMo5dNymrcAm7hgZnOnk8ID/AMFgQGFGakSSBeWhtXG2c2jqpqm8eh4/cMP3l9/+/KbLoQAgmLrwsXVspzevfDYY9e++OqL26PJtKzLkEJISRUAElFKC0wyIIYaaYICZiZggiYrQtUsz8SCxqRtuUV2csd0P1bsfilDxFBVriaTFJtyp9vtlP3+PO9u7y5c/uc3+poMjhn1y7F55vlfuFMUxe5oNNayKg9hUhhoGYZoZhPnqDZRgjEBIFWDajIAyVQ7KWLjJJMwDAy7j0VnL4wW6Ik/EghmQCaeBwuDDjM06/LWzzxxKVw8f+nZneu3O+QEz/7ci5+89MoXP2pKlW6RzTnJ62lVLqQYNxNSqTHdVOPGmVOiFGdCwtTgNalvY1NNXn/99V+KSRfrstmISTssYq2/3jfeSdkGAkITyZTMi5fRweFcXnQbZm7W1tbrJy5dGl2/em341d/97eo3fuc3b+XOHcXa5n/40SfPOid1VuQ6nZQDIqKUrA/CUNVMTUtT5ZiUk9pGCGFopnBezAGw3OdbxLxpwNDU7seI3RNisNYL0dQNik7PJtMy+9dv/s1wMr6z/MqvfOXqL375lU+efuFn/Xh/J1mcdvrDwk1G5fw/ffNbz3z7jf8Yfu0P/vCTl77yku7v7hszkRlyawwwXRamHsSoFaSpqyl4MB0XRXHgABg7HEkmY1TgFDUxU5taTxE2QVsvSIYU1CbHUzvYOyw+eP8d113MLyxvrHUu/90/dm9/cjN/+1/+wW9eXDsTk66++bffWNq6soNq8nsDi6g1qmk0AFAzGGCZMYq2ODXAUmyaQHkn218YDN498UGX51mqfV3VZRQyBxihza4EGLVQqZXe4/EkC1Hzl157bXrt2tXuO5e/u/jRu1cWP/7eVaxuXMD1K9fxjT/785W8U2D7xq6+9tWvVZvnz83f3RvVRmKaWgGuBiKCYpatzBKSqYIoy7yrs8xt3WOTubnOdrfXuUFmlJKSWuuxpgozg1qbxojEQoiZEXqXXvj56qmnX62qQx9vb91tHjn3ZHjlV38tXHruy2HvVhV2bh7H51/89fq3fv+Pj4Yrq9XB4QFI2E7Ws3ZNUlVSa0cIQbIsK3u93gSAIzP7OhIIAi2n9eO724dfik2TmYm2qa7lQNMTdiTE0FBdVQWR73ez/oQMVRMCOxH4PEdKCU1Tw7HA5958LrHRKVKKJ20dgE/WmxVWxDBEiyHwwtLce5uPrL6TUmrcrG1jALTTza8tDLr/tXurelmTdpy4BsSkCXw/ngFmVmEXq7pxWRb6g4WVNPRuqgFoGoUrGLwAMgFimNB4eoykkZjZWgKzmS5XEJMxQ2OMNJlMaLjSP1haXbgFYCQiD9TFDkA1GPY/iE1yB3fGX5iMm00Cgs/dsROGEZHNiNx5F3PgcDw+GoxH46Gw65IKRDwIRiArIVqSqDlHBiIzMyOiWeo0AtApJ6ETQ1Cf02Qw7N9ZXl18P/f5dkop/4zkTwleBLq8PvifpGDVkTRlHJaTamBKECcqjo2IwAxzTpSpE2MKLqZaSByYFSZGwkSOWY2ETK0DGEVVUgNMFbFOopoGwhzJ083OXP7DRy+s3XTeXZlZz7eV9kM6rKd6hKu7Nw+/sHV17+nQxK5zIiwsADExM2MWhkRjITo2EBn0XsnZ1jnwqmmRCS4mNTNLMSazaI1qisvr8x9feGr9O3meXz/phJ2uuehzWsAGQFQ1b+o40GBP7O+PLk4Op92qjPlkXC/GKrQoRZRarz9pJMBMzdpQ5RiTkBDlXT/q94tRp1uEwdLcVqfrv58VftdlrgYQTpXTP1kLGEBi5lHRyUboYOQKutIMOy40Jk3VZDEaxyaeKafNY5psvkVrICJTU4bZ2Gd+r9vLEgtfF097WeEtz3zq9PIxgIMZMPeQBuiPBXgC0qeQAMZxlmUHWZbZKVVGAG5Mx9VWCKlH4FaaMZupMguVnW5x4BwrgB0Ak1N7ckoQIOUA7CF98J8IIACYeAEASSm50w0YBeC9HHXnioPPOSCllEwVwozeidgUEWvdXPSn7fJ/FujJKeV+1xsJDHlA334q4NoGusisCS//t78F/hfzwNMcYjglwAAAAABJRU5ErkJggg==';  // 히린 하얀곰 파티클 이미지
var FX_FLOAT = [BEAR,'🌙',BEAR,'✦',BEAR];   // 떠다니는 입자 (하얀곰 위주 + 초승달·반짝)
var FX_CLICK = BEAR;                          // 클릭/프사톡 = 하얀곰
var FX_COUNT = 16;                            // 떠다니는 입자 개수 (많을수록 무거움)
var FX_TILT  = true;                          // 카드 마우스오버 살짝 기울기 (끄려면 false)

/* ─ 로딩화면 + 페이지 전환(커지는 등장) — 보통 그대로 두세요 ─ */
var FX_LOADER      = true;   // 페이지 넘어갈 때 로딩화면 + 레이아웃 커지는 등장 (끄려면 false)
var FX_LOADER_IMG  = '';     // 로딩화면 가운데 이미지 URL. 비우면 자동: 마스코트(--char) → SOOP 프사 → 글자
var FX_LOADER_TEXT = '';     // 이미지 없을 때/이름표에 띄울 글자. 비우면 상단 로고 글자 자동
var FX_TRANS_MS    = 800;    // 커지는 등장 길이(ms). 더 느리게 = 숫자 ↑ / 더 빠르게 = 숫자 ↓
/* 예)  별 테마 :  FX_FLOAT=['★','✦','☆'];   FX_CLICK='★';
        토끼 테마:  FX_FLOAT=['🐻','✦','♡'];  FX_CLICK='🐻';
        음표 테마:  FX_FLOAT=['♪','♫','✦'];   FX_CLICK='♪';                 */
/* ────────────────────────────────────────────────────── */

(function () {
  var mqReduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mqFine   = window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches;

  var css = `
    body::before{ display:none !important; }            /* 빽빽한 정적 배경무늬 끄기 */
    #fx{ position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
    .fx-p{ position:absolute; top:-26px; color:var(--main); opacity:0; will-change:transform,opacity; animation:fxFall linear infinite; }
    @keyframes fxFall{
      0%{ transform:translateY(-26px) translateX(0) rotate(0); opacity:0; }
      12%{ opacity:.5; } 88%{ opacity:.4; }
      100%{ transform:translateY(103vh) translateX(var(--drift,20px)) rotate(210deg); opacity:0; }
    }
    .container, .wrap{ perspective:1300px; }
    .card{ transition:transform .25s ease, box-shadow .25s ease; will-change:transform; }
    .card.fx-tilting{ box-shadow:var(--shadow-hover); }
    .fx-heart{ position:fixed; z-index:500; pointer-events:none; color:var(--main); transform:translate(-50%,-50%); animation:fxHeart .95s ease-out forwards; }
    @keyframes fxHeart{
      0%{ opacity:0; transform:translate(-50%,-50%) scale(.4); }
      18%{ opacity:.85; }
      100%{ opacity:0; transform:translate(calc(-50% + var(--hx,0px)), calc(-50% - 62px)) scale(1.05); }
    }
    @media (prefers-reduced-motion: reduce){ #fx{ display:none; } .card{ transition:none; } .fx-heart{ display:none; } }

    /* ── 로딩화면 + 페이지 전환(커지는 등장) ── */
    #fxload{ position:fixed; inset:0; z-index:9999; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px; background:var(--bg); transition:opacity .34s ease; }
    #fxload.fx-hide{ opacity:0; pointer-events:none; }
    #fxload.fx-hide .fxload-av, #fxload.fx-hide .fxload-dots i{ animation-play-state:paused; }
    #fxload .fxload-av{ width:96px; height:96px; border-radius:50%; background:var(--main-light); background-size:cover; background-position:center; display:flex; align-items:center; justify-content:center; font-size:46px; font-weight:800; color:var(--main-dark); box-shadow:0 10px 28px rgba(0,0,0,.14); animation:fxBob 1.1s ease-in-out infinite; } #fxload .fxload-av{ color:var(--hdg,#5a5a5a); }
    @keyframes fxBob{ 0%,100%{ transform:translateY(0) scale(1); } 50%{ transform:translateY(-12px) scale(1.04); } }
    #fxload .fxload-name{ font-weight:800; font-size:18px; color:var(--hdg,#5a5a5a); letter-spacing:.02em; }
    #fxload .fxload-dots{ display:flex; gap:7px; }
    #fxload .fxload-dots i{ width:9px; height:9px; border-radius:50%; background:var(--main); display:block; animation:fxDot 1s ease-in-out infinite; }
    #fxload .fxload-dots i:nth-child(2){ animation-delay:.15s; }
    #fxload .fxload-dots i:nth-child(3){ animation-delay:.3s; }
    @keyframes fxDot{ 0%,100%{ opacity:.3; transform:translateY(0); } 40%{ opacity:1; transform:translateY(-7px); } }
    .fx-enter{ animation:fxPop var(--fx-trans,.8s) cubic-bezier(.2,.72,.3,1) both; transform-origin:50% 0; }
    @keyframes fxPop{ from{ opacity:0; transform:scale(.93); } to{ opacity:1; transform:scale(1); } }
    .fx-tap{ animation:fxTap .5s cubic-bezier(.34,1.56,.64,1); }
    @keyframes fxTap{ 0%{ transform:scale(1); } 25%{ transform:scale(.86); } 55%{ transform:scale(1.12); } 100%{ transform:scale(1); } }
    @media (prefers-reduced-motion: reduce){ #fxload .fxload-av, #fxload .fxload-dots i{ animation:none !important; } .fx-enter{ animation:none !important; } .fx-tap{ animation:none !important; } }
  `;
  var st = document.createElement('style'); st.id = 'fx-style'; st.textContent = css; document.head.appendChild(st);

  /* ── 로딩화면 + 페이지 전환 ──
     · 진입: 로딩화면 잠깐 → 콘텐츠가 살짝 작았다가 커지며 등장
     · 이동: 내부 링크 클릭 시 커버가 덮인 뒤 실제 페이지로 이동(도착 페이지에서 다시 등장)
     이미지 자동 매칭: FX_LOADER_IMG → 마스코트(--char) → SOOP 프사(파비콘) → 글자  /  색은 --main·--bg */
  var loaderOn = FX_LOADER && !mqReduce;
  var fxLoadEl = null, shownAt = 0;
  document.documentElement.style.setProperty('--fx-trans', (FX_TRANS_MS || 800) + 'ms');

  function buildLoader() {
    if (!loaderOn || fxLoadEl || !document.body) return;
    var el = document.createElement('div'); el.id = 'fxload'; el.setAttribute('aria-hidden', 'true');
    var av = document.createElement('div'); av.className = 'fxload-av';
    var ch = (getComputedStyle(document.body).getPropertyValue('--char') || '').trim();
    var img = FX_LOADER_IMG;
    if (!img) {
      var ico = document.querySelector('link[rel~="icon"]');
      if (ico && ico.href && /\.(jpe?g|png|gif|webp)(\?|$)/i.test(ico.href)) img = ico.href;
    }
    var logoTxt = ((document.querySelector('.nav-logo') || {}).textContent || document.title || '').trim();
    if (FX_LOADER_IMG)            av.style.backgroundImage = 'url("' + FX_LOADER_IMG + '")';
    else if (ch && ch !== 'none') av.style.backgroundImage = ch;          /* --char = url("data:...") */
    else if (img)                av.style.backgroundImage = 'url("' + img + '")';
    else                         av.textContent = (FX_LOADER_TEXT || logoTxt || '✿').charAt(0) || '✿';
    var nm = document.createElement('div'); nm.className = 'fxload-name';
    nm.textContent = (FX_LOADER_TEXT || logoTxt || '');
    var dt = document.createElement('div'); dt.className = 'fxload-dots'; dt.innerHTML = '<i></i><i></i><i></i>';
    el.appendChild(av); if (nm.textContent) el.appendChild(nm); el.appendChild(dt);
    document.body.appendChild(el); fxLoadEl = el; shownAt = Date.now();
  }

  function revealPage() {
    if (!loaderOn) return;
    var wait = Math.max(0, 450 - (Date.now() - shownAt));   /* 너무 빨리 깜빡이지 않게 최소 표시 */
    setTimeout(function () {
      var w = document.querySelector('.wrap, .container, main');
      if (w) { w.classList.remove('fx-enter'); void w.offsetWidth; w.classList.add('fx-enter'); }
      if (fxLoadEl) fxLoadEl.classList.add('fx-hide');
    }, wait);
  }

  if (loaderOn) {
    if (document.body) buildLoader(); else document.addEventListener('DOMContentLoaded', buildLoader);
    if (document.readyState === 'complete') revealPage(); else window.addEventListener('load', revealPage);
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]'); if (!a) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
      var href = a.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|javascript:)/i.test(href)) return;
      var url; try { url = new URL(a.href, location.href); } catch (_) { return; }
      if (url.origin !== location.origin) return;                          /* 외부 링크 제외 */
      if (url.pathname === location.pathname && (url.hash || url.href === location.href)) return;
      e.preventDefault();
      if (!fxLoadEl) buildLoader();
      if (fxLoadEl) { fxLoadEl.classList.remove('fx-hide'); shownAt = Date.now(); }
      setTimeout(function () { location.href = a.href; }, 360);
    }, true);
  }


  function build() {
    /* 떠다니는 입자 */
    if (!mqReduce) {
      var fx = document.getElementById('fx');
      if (!fx) { fx = document.createElement('div'); fx.id = 'fx'; fx.setAttribute('aria-hidden','true'); document.body.appendChild(fx); }
      if (!fx.childElementCount) {
        for (var i = 0; i < FX_COUNT; i++) {
          var p = document.createElement('span'); p.className = 'fx-p';
          var _sh = FX_FLOAT[(Math.random() * FX_FLOAT.length) | 0];
          var dur = 13 + Math.random() * 11;
          p.style.left = (Math.random() * 100).toFixed(2) + 'vw';
          if (/^data:|^https?:\/\//.test(_sh)) {
            var _z = (13 + Math.random() * 10).toFixed(1);
            p.style.width = _z + 'px'; p.style.height = _z + 'px';
            p.style.backgroundImage = 'url("' + _sh + '")'; p.style.backgroundSize = 'contain'; p.style.backgroundRepeat = 'no-repeat'; p.style.backgroundPosition = 'center';
          } else {
            p.textContent = _sh;
            p.style.fontSize = (9 + Math.random() * 7).toFixed(1) + 'px';
          }
          p.style.animationDuration = dur.toFixed(1) + 's';
          p.style.animationDelay = (-Math.random() * dur).toFixed(1) + 's';
          p.style.setProperty('--drift', (Math.random() * 60 - 30).toFixed(0) + 'px');
          fx.appendChild(p);
        }
      }
    }
    /* 카드 살짝 기울기 (데스크톱 마우스에서만) */
    if (FX_TILT && mqFine && !mqReduce) {
      document.querySelectorAll('.card').forEach(function (card) {
        if (card.dataset.fxTilt) return; card.dataset.fxTilt = '1';
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var rx = (0.5 - (e.clientY - r.top) / r.height) * 5;
          var ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
          card.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
          card.classList.add('fx-tilting');
        });
        card.addEventListener('mouseleave', function () { card.style.transform = ''; card.classList.remove('fx-tilting'); });
      });
    }
    /* 프사 톡(이스터에그): 프사를 클릭하면 모양이 펑 */
    var av = document.querySelector('.avatar-wrap, #avatarWrap, .avatar');
    if (av && !av.dataset.fxPop) {
      av.dataset.fxPop = '1'; av.style.cursor = 'pointer';
      av.addEventListener('click', function (e) { window.fxHearts(e.clientX, e.clientY, 10); av.classList.remove('fx-tap'); void av.offsetWidth; av.classList.add('fx-tap'); });
    }
  }

  /* 모양 뿌리기 (전역 공용) */
  window.fxHearts = function (x, y, n) {
    if (mqReduce) return;
    for (var i = 0; i < n; i++) {
      var h = document.createElement('span'); h.className = 'fx-heart';
      h.style.left = x + 'px'; h.style.top = y + 'px';
      if (/^data:|^https?:\/\//.test(FX_CLICK)) {
        var _hz = (16 + Math.random() * 10).toFixed(0);
        h.style.width = _hz + 'px'; h.style.height = _hz + 'px';
        h.style.backgroundImage = 'url("' + FX_CLICK + '")'; h.style.backgroundSize = 'contain'; h.style.backgroundRepeat = 'no-repeat'; h.style.backgroundPosition = 'center';
      } else {
        h.textContent = FX_CLICK;
        h.style.fontSize = (12 + Math.random() * 8).toFixed(0) + 'px';
      }
      h.style.setProperty('--hx', (Math.random() * 64 - 32).toFixed(0) + 'px');
      h.style.animationDelay = (Math.random() * 0.12).toFixed(2) + 's';
      document.body.appendChild(h);
      (function (el) { setTimeout(function () { el.remove(); }, 1200); })(h);
    }
  };

  /* 생일 D-Day 도우미: fxDday('03-15') → 다음 생일까지 남은 일수(숫자). 오늘이면 0.
     사용 예) document.getElementById('dday').textContent = 'D-' + fxDday('03-15'); */
  window.fxDday = function (mmdd) {
    try {
      var t = String(mmdd).split(/[-./]/); var m = parseInt(t[0],10), d = parseInt(t[1],10);
      if (!m || !d) return null;
      var now = new Date(); now.setHours(0,0,0,0);
      var y = now.getFullYear(); var next = new Date(y, m-1, d);
      if (next < now) next = new Date(y+1, m-1, d);
      return Math.round((next - now) / 86400000);
    } catch (e) { return null; }
  };

  /* 아무 데나 클릭하면 모양 톡 (입력창·버튼·링크·프사 위에선 생략) */
  document.addEventListener('click', function (e) {
    if (e.target.closest('input, textarea, button, a, .iq-modal, .iq-ov, .avatar-wrap, #avatarWrap, .avatar')) return;
    window.fxHearts(e.clientX, e.clientY, 4);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
