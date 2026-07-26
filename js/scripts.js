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

// Duplicate partners track for seamless infinite scroll
(function() {
  const track = document.querySelector('.partners-track');
  if (track) {
    const clone = track.cloneNode(true);
    track.parentNode.appendChild(clone);
  }
})();

// Contact Form → WhatsApp
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const phone = document.getElementById('formPhone').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  const text = `*🔔 New Enquiry from Kingsley Jackson Consults website*%0A%0A*Name* ➡ ${encodeURIComponent(name)}%0A*Email* ➡ ${encodeURIComponent(email)}%0A*Phone* ➡ ${encodeURIComponent(phone)}%0A*Message* ➡ ${encodeURIComponent(message)}`;

  window.open(`https://wa.me/2348080730351?text=${text}`, '_blank');
});
