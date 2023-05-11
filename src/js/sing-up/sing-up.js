import { bodyRef } from '../header/header';
import svgIcons from '../../images/icons.svg';

const refs = {
  headerSignUp: document.querySelector('.auth__modal-open'),
  headerSignUpMenu: document.querySelector('.sign-up-btn-js'),
  signUp: document.querySelector('.sign-up'),
};

const {
  children: [singUpModal],
} = refs.signUp;

const {
  children: [buttonOfClose, signUpForm1, signUpForm2],
} = singUpModal;

const signUpButton = singUpModal.children[3].children[0];
const signIpButton = singUpModal.children[3].children[1];

const closeModalSingUp = e => {
  const buttonOfCloseSvg = buttonOfClose.children[0];
  const buttonOfCloseUse = buttonOfClose.children[0].children[0];

  if (
    e.target.className === 'sign-up sign-up-hidden' ||
    e.target.className === 'sign-up__cross' ||
    e.target === buttonOfCloseSvg ||
    e.target === buttonOfCloseUse
  ) {
    bodyRef.classList.remove('no-scroll-body-js');
    refs.signUp.classList.remove('sign-up-hidden');
  }
};

const escapeCloseModalSingUp = e => {
  if (e.code === 'Escape') {
    bodyRef.classList.remove('no-scroll-body-js');
    refs.signUp.classList.remove('sign-up-hidden');
  }
};

const openModalSingUp = () => {
  bodyRef.classList.add('no-scroll-body-js');
  refs.signUp.classList.add('sign-up-hidden');
  refs.signUp.addEventListener('click', closeModalSingUp);
  document.addEventListener('keydown', escapeCloseModalSingUp);
};

refs.headerSignUp.addEventListener('click', openModalSingUp);
refs.headerSignUpMenu.addEventListener('click', openModalSingUp);

const checkForm1 = e => {
  e.preventDefault();
  const [name, email, password, buttonSignUp] = signUpForm1;
  const signUp = {};
  signUp.name = name.value;
  signUp.email = email.value;
  signUp.password = password.value;
  localStorage.setItem('sign-up', JSON.stringify(signUp));
  signUpForm1.reset();
  buttonSignUp.disabled = true;
  buttonSignUp.style.cursor = 'auto';
};

const checkRequired1 = () => {
  const [name, email, password, buttonSignUp] = signUpForm1;
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

signUpForm1.addEventListener('submit', checkForm1);
signUpForm1.addEventListener('input', checkRequired1);

const checkForm2 = e => {
  e.preventDefault();
  const [email, password, buttonSignUp] = signUpForm2;
  const signIn = {};
  signIn.email = email.value;
  signIn.password = password.value;
  localStorage.setItem('sign-in', JSON.stringify(signIn));
  signUpForm2.reset();
  buttonSignUp.disabled = true;
  buttonSignUp.style.cursor = 'auto';
};

const checkRequired2 = () => {
  const [email, password, buttonSignUp] = signUpForm2;
  if (email.checkValidity() && password.checkValidity()) {
    buttonSignUp.disabled = false;
    buttonSignUp.style.cursor = 'pointer';
  } else {
    buttonSignUp.disabled = true;
    buttonSignUp.style.cursor = 'auto';
  }
};

signUpForm2.addEventListener('submit', checkForm2);
signUpForm2.addEventListener('input', checkRequired2);

const createMarkupSignIp = () => {
  const markup = ``;
  signIpButton.classList.add('sign-up-button-active');
  signUpButton.classList.remove('sign-up-button-active');
  signUpForm2.classList.remove('sign-up-hidden');
  signUpForm1.classList.add('sign-up-hidden');
};

createMarkupSignIp();

const createMarkupSignUp = () => {
  const markup = ``;
  signUpButton.classList.add('sign-up-button-active');
  signIpButton.classList.remove('sign-up-button-active');
  signUpForm1.classList.remove('sign-up-hidden');
  signUpForm2.classList.add('sign-up-hidden');
};

signUpButton.addEventListener('click', createMarkupSignUp);
signIpButton.addEventListener('click', createMarkupSignIp);

createMarkupSignUp();
