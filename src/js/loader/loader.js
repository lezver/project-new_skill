const [loaderOverlay] = document.getElementsByClassName('loader__overlay');

// REMOVE LOADER >>

const removeLoader = () => {
  loaderOverlay.classList.remove('on-loader');
};

// >>

// ADD LOADER >>

const addLoader = () => {
  loaderOverlay.classList.add('on-loader');
};

// >>

export { addLoader, removeLoader };
