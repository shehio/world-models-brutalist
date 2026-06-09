// brutalist-A — vanilla enhancement: highlight the nav link for the section
// currently in view. Toggling aria-current also drives the active CSS style.
// No animation here (purely a state toggle), so it is safe with reduced motion.
(function () {
  'use strict';

  var links = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"]')
  );
  if (!links.length || !('IntersectionObserver' in window)) return;

  var sections = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    var sec = document.getElementById(id);
    if (sec) sections[id] = a;
  });

  function setActive(id) {
    links.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) {
        a.setAttribute('aria-current', 'true');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setActive(e.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  Object.keys(sections).forEach(function (id) {
    io.observe(document.getElementById(id));
  });
})();
