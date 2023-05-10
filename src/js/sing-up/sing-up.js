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
    name.value.length >= 2 &&
    email.value.length >= 15 &&
    password.value.length >= 5
  ) {
    buttonSignUp.disabled = false;
    buttonSignUp.style.cursor = 'pointer';
  }
};

signUpForm.addEventListener('submit', checkForm);
signUpForm.addEventListener('input', checkRequired);
