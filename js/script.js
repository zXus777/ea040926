(function () {
  'use strict';

  var WEDDING_DATE = new Date('2026-09-04T16:00:00+03:00').getTime();

  /* ---------- Countdown ---------- */
  function updateCountdown() {
    var el = document.getElementById('countdown');
    if (!el) return;

    var now = Date.now();
    var diff = WEDDING_DATE - now;

    if (diff <= 0) {
      el.querySelectorAll('.countdown__num').forEach(function (n) { n.textContent = '00'; });
      return;
    }

    var day = Math.floor(diff / 86400000);
    var hour = Math.floor((diff % 86400000) / 3600000);
    var min = Math.floor((diff % 3600000) / 60000);
    var sec = Math.floor((diff % 60000) / 1000);

    var values = { days: day, hours: hour, minutes: min, seconds: sec };
    Object.keys(values).forEach(function (unit) {
      var target = el.querySelector('[data-unit="' + unit + '"]');
      if (target) target.textContent = String(values[unit]).padStart(2, '0');
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- Scroll reveal ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Floating petals ---------- */
  if (!reduceMotion) {
    var container = document.querySelector('.petals');
    if (container) {
      var count = window.innerWidth < 640 ? 10 : 18;
      for (var i = 0; i < count; i++) {
        var petal = document.createElement('span');
        petal.className = 'petal';
        var left = Math.random() * 100;
        var duration = 12 + Math.random() * 14;
        var delay = Math.random() * 20;
        var drift = (Math.random() * 120 - 60).toFixed(0) + 'px';
        var scale = (0.6 + Math.random() * 0.9).toFixed(2);

        petal.style.left = left + 'vw';
        petal.style.animationDuration = duration + 's';
        petal.style.animationDelay = '-' + delay + 's';
        petal.style.setProperty('--drift', drift);
        petal.style.transform = 'scale(' + scale + ')';

        container.appendChild(petal);
      }
    }
  }
})();
