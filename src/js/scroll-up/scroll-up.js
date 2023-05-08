const [scrollUp] = document.getElementsByClassName('scroll-up');

const checkOfWindowHeight = () => {
  if (window.scrollY > 1000) {
    scrollUp.classList.add('is-display-none');
  } else {
    scrollUp.classList.remove('is-display-none');
  }
};

window.addEventListener('scroll', checkOfWindowHeight);
