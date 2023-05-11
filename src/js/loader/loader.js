const [loaderOverlay] = document.getElementsByClassName('loader__overlay');

const removeLoader = () => {
  loaderOverlay.classList.remove('on-loader');
};

const addLoader = () => {
  loaderOverlay.classList.add('on-loader');
};

export { addLoader, removeLoader };
