// AOS Init
try {
  AOS.init({ duration: 600, once: true, offset: 80 });
} catch (e) { console.warn('AOS failed:', e); }

try {
  var swiper = new Swiper('.testimonial-section .swiper-container', {
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

// Portfolio Swiper
try {
  new Swiper('.portfolio-swiper', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      576: { slidesPerView: 2, spaceBetween: 15 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      992: { slidesPerView: 3, spaceBetween: 20 }
    }
  });
} catch (e) {
  console.warn('Portfolio Swiper failed:', e);
}

// Portfolio Lightbox with swipe navigation
(function() {
  const carouselImages = [];
  document.querySelectorAll('.portfolio-swiper .portfolio-item img').forEach(img => {
    carouselImages.push(img.src);
  });

  const lightbox = document.createElement('div');
  lightbox.className = 'portfolio-lightbox';
  lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Previous">&#8249;</button>' +
    '<img src="" alt="Enlarged portfolio image">' +
    '<button class="lightbox-next" aria-label="Next">&#8250;</button>';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  let touchStartX = 0;

  function showImage(index) {
    if (carouselImages.length === 0) return;
    currentIndex = Math.max(0, Math.min(index, carouselImages.length - 1));
    lightboxImg.src = carouselImages[currentIndex];
  }

  document.querySelectorAll('.portfolio-swiper .portfolio-item').forEach((item, i) => {
    item.addEventListener('click', () => {
      showImage(i);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  document.querySelectorAll('.portfolio-grid .portfolio-item').forEach((item) => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
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

  lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1));
  lightboxNext.addEventListener('click', () => showImage(currentIndex + 1));

  lightboxImg.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  lightboxImg.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) showImage(currentIndex + 1);
      else showImage(currentIndex - 1);
    }
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
})();

// Duplicate partners items for seamless infinite scroll
(function() {
  const track = document.querySelector('.partners-track');
  if (track) {
    track.querySelectorAll('.partner-item').forEach(item => {
      track.appendChild(item.cloneNode(true));
    });
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
