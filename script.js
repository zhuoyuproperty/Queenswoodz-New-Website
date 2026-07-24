document.addEventListener('DOMContentLoaded', function () {
  var WA_NUMBER = '60168808528';

  // Build WhatsApp links from data-wa-msg so every message stays correctly
  // URL-encoded without hand-encoding each href in the markup.
  document.querySelectorAll('[data-wa-msg]').forEach(function (el) {
    var msg = el.getAttribute('data-wa-msg');
    el.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
  });

  // Sticky header background once the hero has scrolled past.
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle.
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll-triggered reveal, skipped entirely for reduced-motion users.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Show a plain-language result after send-form.php redirects back here.
  var params = new URLSearchParams(window.location.search);
  var form = document.getElementById('lead-form');
  if (form && params.has('sent')) {
    form.innerHTML = '<p style="margin:0;font-size:1.05rem;">Thanks — your enquiry has been sent. An independent registered agent will be in touch shortly.</p>';
  } else if (form && params.has('error')) {
    var notice = document.createElement('p');
    notice.style.cssText = 'margin:0 0 18px;color:#8a3b2b;font-size:0.9rem;';
    notice.textContent = 'Please fill in your name and phone number and try again.';
    form.prepend(notice);
  }

  // Virtual tour: the 360vr.my embed only loads once the visitor asks for it,
  // so the heavy third-party iframe never costs anything on initial page load.
  var tourBtn = document.querySelector('[data-load-tour]');
  var tourWrap = document.querySelector('.tour-embed');
  if (tourBtn && tourWrap) {
    tourBtn.addEventListener('click', function () {
      if (tourWrap.querySelector('iframe')) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.360vr.my/exsim/queenswoodz/';
      iframe.title = 'The Queenswoodz @ Bukit Jalil — 360° virtual tour';
      iframe.loading = 'lazy';
      iframe.allow = 'fullscreen';
      iframe.setAttribute('allowfullscreen', '');
      tourWrap.innerHTML = '';
      tourWrap.appendChild(iframe);
    });
  }
});
