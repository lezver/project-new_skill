import { bodyRef } from '../header/header';
import svgIcons from '../../images/icons.svg';

setTimeout(() => {
  refs.signUp.classList.add('sign-up-display-block-js');
}, 250);

const refs = {
  headerSignUp: document.querySelector('.auth__modal-open'),
  headerSignUpMenu: document.querySelector('.sign-up-btn-js'),
  signUp: document.querySelector('.sign-up'),
};

const {
  children: [singUpModal],
} = refs.signUp;

const {
  children: [closeBtn, form, switcher],
} = singUpModal;

console.log(form);

const signUpBtn = switcher.children[0];
const signInBtn = switcher.children[1];

const closeModalSingUp = e => {
  const closeBtnSvg = closeBtn.firstElementChild;
  const closeBtnUse = closeBtn.firstElementChild.firstElementChild;

  if (
    e.target.className === 'sign-up sign-up-display-block-js sign-up-hidden' ||
    e.target.className === 'sign-up__cross' ||
    e.target === closeBtnSvg ||
    e.target === closeBtnUse
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

// const createDataForm = e => {
//   e.preventDefault();
//   const [name, email, password, buttonSignUp] = form;
//   const signUp = {};
//   signUp.name = name.value;
//   signUp.email = email.value;
//   signUp.password = password.value;
//   localStorage.setItem('sign-up', JSON.stringify(signUp));
//   signUpForm1.reset();
//   buttonSignUp.disabled = true;
//   buttonSignUp.style.cursor = 'auto';
// };

// const checkRequiredForm = () => {
//   const [name, email, password, buttonSignUp] = form;
//   if (
//     name.checkValidity() &&
//     email.checkValidity() &&
//     password.checkValidity()
//   ) {
//     buttonSignUp.disabled = false;
//     buttonSignUp.style.cursor = 'pointer';
//   } else {
//     buttonSignUp.disabled = true;
//     buttonSignUp.style.cursor = 'auto';
//   }
// };

// form.addEventListener('submit', createDataForm);
// form.addEventListener('input', checkRequiredForm);

const createMarkupSignIp = () => {
  const markup = `
  <label>
    <input
      type="email"
      placeholder="email"
      name="user_email"
      required
      title="your@mail.com"
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[a-z]{2,4}$"
    />
    <svg class="sign-up__email">
      <use href="./images/iconsvg#icon-email"></use>
    </svg>
  </label>
  <label>
    <input
      type="password"
      placeholder="password"
      name="user_password"
      minlength="5"
      maxlength="12"
      required
    />
    <svg class="sign-up__lock">
      <use href="./images/iconsvg#icon-lock"></use>
    </svg>
  </label>
  <button type="submit" disabled>sign up</button>
  `;
  form.innerHTML = markup;
  signInBtn.classList.add('sign-up-button-active');
  signUpBtn.classList.remove('sign-up-button-active');
};

const createMarkupSignUp = () => {
  const markup = `
  <label>
    <input
      type="text"
      placeholder="name"
      name="user_name"
      required
      pattern="^[a-zA-Z]+$"
    />
  </label>
  <label>
    <input
      type="email"
      placeholder="email"
      name="user_email"
      required
      title="your@mail.com"
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    />
    <svg class="sign-up__email">
      <use href="./images/icons.svg#icon-email"></use>
    </svg>
  </label>
  <label>
    <input
      type="password"
      placeholder="password"
      name="user_password"
      minlength="5"
      maxlength="12"
      required
    />
    <svg class="sign-up__lock">
      <use href="./images/icons.svg#icon-lock"></use>
    </svg>
  </label>
  <button type="submit" disabled>sign up</button>
  `;
  form.innerHTML = markup;
  signUpBtn.classList.add('sign-up-button-active');
  signInBtn.classList.remove('sign-up-button-active');
};

signUpBtn.addEventListener('click', createMarkupSignUp);
signInBtn.addEventListener('click', createMarkupSignIp);

createMarkupSignUp();
