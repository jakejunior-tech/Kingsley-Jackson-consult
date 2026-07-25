// AOS Init
try {
  AOS.init({ duration: 600, once: true, offset: 80 });
} catch (e) { console.warn('AOS failed:', e); }

try {
  var swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      768: { slidesPerView: 1 },
      992: { slidesPerView: 1 }
    }
  });
} catch (e) {
  console.warn('Swiper failed to load:', e);
}

const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.opacity = '1';
    backToTop.style.visibility = 'visible';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.visibility = 'hidden';
  }
});

backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

try {
  document.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar-collapse');
    if (nav.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(nav);
      if (bsCollapse) bsCollapse.hide();
    }
  });

  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');
    if (nav.classList.contains('show') && !nav.contains(e.target) && !toggler.contains(e.target)) {
      const bsCollapse = bootstrap.Collapse.getInstance(nav);
      if (bsCollapse) bsCollapse.hide();
    }
  });
} catch (e) {
  console.warn('Bootstrap dropdown handlers failed:', e);
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-question').forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// Animated Counters
(function() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const increment = Math.ceil(target / 40);
    let current = 0;

    const update = () => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = current;
      requestAnimationFrame(update);
    };
    update();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => observer.observe(c));
})();

// Portfolio Lightbox
(function() {
  const lightbox = document.createElement('div');
  lightbox.className = 'portfolio-lightbox';
  lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="Enlarged portfolio image">';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.portfolio-item').forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  let valid = true;

  form.querySelectorAll('[required]').forEach((field) => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#e74c3c';
      valid = false;
    }
  });

  const email = form.querySelector('#formEmail');
  if (email.value.trim() && !email.value.includes('@')) {
    email.style.borderColor = '#e74c3c';
    valid = false;
  }

  if (valid) {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.style.backgroundColor = '#27ae60';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.backgroundColor = '';
      form.reset();
    }, 3000);
  }
});
