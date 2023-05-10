const refs = {
  headerSignUp: document.querySelector('.auth__modal-open'),
};

const openModalSingUp = () => {
  console.log(window.children);
};

refs.headerSignUp.addEventListener('click', openModalSingUp);
