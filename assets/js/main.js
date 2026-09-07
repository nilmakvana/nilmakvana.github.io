/* ==========================================================================
   Nil Makvana — site behaviour
   No dependencies. Everything degrades gracefully with JS disabled.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. CONFIG — the only bit you normally need to edit
     ------------------------------------------------------------------ */
  var SITE = {
    // Used by the Email card, the footer icon and the contact form. The same
    // address is hard-coded in index.html as the no-JS fallback — change both.
    email: 'makvananick168@gmail.com',
    name:  'Nil Makvana'
  };

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ------------------------------------------------------------------
     2. Wire the email address into every mailto link
     ------------------------------------------------------------------ */
  $$('[data-email]').forEach(function (el) {
    el.setAttribute('href', 'mailto:' + SITE.email);
  });

  /* ------------------------------------------------------------------
     3. Mobile navigation
     ------------------------------------------------------------------ */
  var toggle = $('.nav-toggle');
  var nav    = $('#site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    // close after tapping a link on mobile
    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     4. Reveal on scroll
     ------------------------------------------------------------------ */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // stagger siblings a touch so grids cascade rather than pop
        var delay = Math.min(i * 70, 280);
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    $$('.reveal').forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
     5. Seamless marquee — duplicate the track so the loop has no seam
     ------------------------------------------------------------------ */
  var track = $('[data-marquee]');
  if (track && !reduced) {
    var originals = Array.prototype.slice.call(track.children);
    originals.forEach(function (node) {
      var clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  /* ------------------------------------------------------------------
     6. "Show all projects"
     ------------------------------------------------------------------ */
  var showAll = $('[data-show-all]');
  if (showAll) {
    var extras = $$('[data-extra]');
    var total  = $$('.p-card').length;

    // The markup ships every card visible so the list is complete without JS.
    // Collapse the extras here, now that the toggle is wired up.
    extras.forEach(function (card) { card.classList.add('is-hidden'); });
    showAll.textContent = 'Show all ' + total + ' projects';

    showAll.addEventListener('click', function () {
      var expanded = showAll.getAttribute('aria-expanded') === 'true';

      extras.forEach(function (card) {
        card.classList.toggle('is-hidden', expanded);
        if (!expanded) {
          // fade the newly shown cards in
          card.classList.remove('is-in');
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { card.classList.add('is-in'); });
          });
        }
      });

      showAll.setAttribute('aria-expanded', String(!expanded));
      showAll.textContent = expanded ? 'Show all ' + total + ' projects' : 'Show fewer projects';

      if (expanded) {
        var grid = $('[data-projects]');
        if (grid) grid.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      }
    });
  }

  /* ------------------------------------------------------------------
     7. Back to top
     ------------------------------------------------------------------ */
  var toTop = $('[data-to-top]');
  if (toTop) {
    var onScroll = function () {
      toTop.classList.toggle('is-on', window.scrollY > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     8. Contact form -> opens the visitor's own mail client.
        No backend, no third party, nothing stored.
        (To use a real form service instead, give the <form> an action
        and a method and delete this handler.)
     ------------------------------------------------------------------ */
  var form = $('[data-contact-form]');
  if (form) {
    var note = $('[data-form-note]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = form.elements.name.value.trim();
      var email   = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();

      if (!name || !email || !message) {
        if (note) {
          note.textContent = 'Please fill in your name, email and a message first.';
          note.style.color = '#C02B0A';
        }
        (!name ? form.elements.name : !email ? form.elements.email : form.elements.message).focus();
        return;
      }

      var subject = 'Hello from ' + name + ' — via ' + location.hostname;
      var body    = message + '\n\n—\n' + name + '\n' + email;

      window.location.href =
        'mailto:' + SITE.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body='    + encodeURIComponent(body);

      if (note) {
        note.textContent = 'Opening your mail app… if nothing happens, write to ' + SITE.email + ' directly.';
        note.style.color = '';
      }
    });
  }

  /* ------------------------------------------------------------------
     9. Footer year
     ------------------------------------------------------------------ */
  $$('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

})();
