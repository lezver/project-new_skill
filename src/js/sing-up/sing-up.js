import { body } from '../header/header';

const refs = {
  headerSignUp: document.querySelector('.auth__modal-open'),
  headerSignUpMenu: document.querySelector('.sign-up-btn-js'),
  signUp: document.querySelector('.sign-up'),
};

const {
  children: [singUpModal],
} = refs.signUp;

const {
  children: [buttonOfClose, signUpForm],
} = singUpModal;

const signUpButton = singUpModal.children[2].children[0];
const signIpButton = singUpModal.children[2].children[1];

const closeModalSingUp = e => {
  const buttonOfCloseSvg = buttonOfClose.children[0];
  const buttonOfCloseUse = buttonOfClose.children[0].children[0];

  if (
    e.target.className === 'sign-up sign-up-hidden' ||
    e.target.className === 'sign-up__cross' ||
    e.target === buttonOfCloseSvg ||
    e.target === buttonOfCloseUse
  ) {
    body.classList.remove('no-scroll-body-js');
    refs.signUp.classList.remove('sign-up-hidden');
  }
};

const escapeCloseModalSingUp = e => {
  if (e.code === 'Escape') {
    body.classList.remove('no-scroll-body-js');
    refs.signUp.classList.remove('sign-up-hidden');
  }
};

const openModalSingUp = () => {
  body.classList.add('no-scroll-body-js');
  refs.signUp.classList.add('sign-up-hidden');
  refs.signUp.addEventListener('click', closeModalSingUp);
  document.addEventListener('keydown', escapeCloseModalSingUp);
};

refs.headerSignUp.addEventListener('click', openModalSingUp);
refs.headerSignUpMenu.addEventListener('click', openModalSingUp);

const checkForm = e => {
  e.preventDefault();
  const [name, email, password, buttonSignUp] = signUpForm;
  const userInfo = {};
  userInfo.name = name.value;
  userInfo.email = email.value;
  userInfo.password = password.value;
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  signUpForm.reset();
  buttonSignUp.disabled = true;
  buttonSignUp.style.cursor = 'auto';
};

const checkRequired = () => {
  const [name, email, password, buttonSignUp] = signUpForm;
  if (
    name.checkValidity() &&
    email.checkValidity() &&
    password.checkValidity()
  ) {
    buttonSignUp.disabled = false;
    buttonSignUp.style.cursor = 'pointer';
  } else {
    buttonSignUp.disabled = true;
    buttonSignUp.style.cursor = 'auto';
  }
};

signUpForm.addEventListener('submit', checkForm);
signUpForm.addEventListener('input', checkRequired);

const createMarkupSignIp = () => {
  signIpButton.classList.add('sign-up-button-active');

  signUpButton.classList.remove('sign-up-button-active');
};

createMarkupSignIp();

const createMarkupSignUp = () => {
  signUpButton.classList.add('sign-up-button-active');

  signIpButton.classList.remove('sign-up-button-active');
};

signUpButton.addEventListener('click', createMarkupSignUp);
signIpButton.addEventListener('click', createMarkupSignIp);

createMarkupSignUp();
