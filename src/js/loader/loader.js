const [loaderOverlay] = document.getElementsByClassName('loader__overlay');

const removeLoader = () => {
  setTimeout(() => {
    loaderOverlay.classList.remove('on-loader');
  }, 250);
};

const addLoader = () => {
  loaderOverlay.classList.add('on-loader');
};

export { addLoader, removeLoader };
