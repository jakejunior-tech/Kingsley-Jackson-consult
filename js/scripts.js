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
