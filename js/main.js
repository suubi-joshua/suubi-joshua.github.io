(function () {
  'use strict';

  // ===== Navbar on scroll =====
  const navbar = document.getElementById('mainNav');
  function handleNavScroll() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ===== Typewriter effect =====
  const typewriteEl = document.querySelector('.typewrite');
  if (typewriteEl) {
    const period = parseInt(typewriteEl.getAttribute('data-period')) || 2000;
    const items = JSON.parse(typewriteEl.getAttribute('data-type'));
    let itemIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    function type() {
      const current = items[itemIndex];
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typewriteEl.querySelector('.wrap').textContent = current.substring(0, charIndex);

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        timeout = setTimeout(type, period);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        itemIndex = (itemIndex + 1) % items.length;
        timeout = setTimeout(type, 500);
      } else {
        const speed = isDeleting ? 40 : 80;
        timeout = setTimeout(type, speed);
      }
    }

    type();
  }

  // ===== Scroll animations (Intersection Observer) =====
  const aosElements = document.querySelectorAll('[data-aos]');
  if (aosElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    aosElements.forEach((el) => observer.observe(el));
  }

  // ===== Counter animation =====
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count')) || 0;
            let current = 0;
            const increment = Math.ceil(target / 60);
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = current + (target === 100 ? '%' : '+');
            }, 25);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((el) => counterObserver.observe(el));
  }

  // ===== Close navbar on link click (mobile) =====
  const navLinks = document.querySelectorAll('.nav-link');
  const navCollapse = document.getElementById('navMenu');
  if (navLinks.length && navCollapse) {
    const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

})();
