var swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 'auto',
    spaceBetween: 30,
    autoplay: {
        delay: 5000, // Set the autoplay interval to 5 seconds
    },
});

const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.opacity = '1';
    backToTopButton.style.visibility = 'visible';
  } else {
    backToTopButton.style.opacity = '0';
    backToTopButton.style.visibility = 'hidden';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

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
