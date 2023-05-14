import { bodyRef } from '../header/header';
import icons from '../../images/icons.svg';

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

const signUpBtn = switcher.children[0];
const signInBtn = switcher.children[1];

// CHECKED AND CREATE DATA >

const createDataForm = e => {
  e.preventDefault();

  if (form.length === 5) {
    const [name, email, password, , submitBtn] = form;

    const signUp = {};

    signUp.name = name.value;
    signUp.email = email.value;
    signUp.password = password.value;

    localStorage.setItem('signUp', JSON.stringify(signUp));

    form.reset();

    submitBtn.disabled = true;
    submitBtn.style.cursor = 'auto';
  }

  if (form.length === 4) {
    const [email, password, , submitBtn] = form;

    const signIn = {};
    signIn.email = email.value;
    signIn.password = password.value;

    localStorage.setItem('signIn', JSON.stringify(signIn));

    form.reset();

    submitBtn.disabled = true;
    submitBtn.style.cursor = 'auto';
  }
};

const checkRequiredForm = () => {
  if (form.length === 5) {
    const [name, email, password, seePassword, submitBtn] = form;

    if (seePassword.checked === true) {
      password.type = 'text';
    } else {
      password.type = 'password';
    }

    if (!name.checkValidity()) {
      name.style.color = 'rgba(255, 99, 71, 1)';
    } else {
      name.style.color = 'rgb(60, 179, 113)';
    }
    if (!email.checkValidity()) {
      email.style.color = 'rgba(255, 99, 71, 1)';
    } else {
      email.style.color = 'rgb(60, 179, 113)';
    }
    if (!password.checkValidity()) {
      password.style.color = 'rgba(255, 99, 71, 1)';
    } else {
      password.style.color = 'rgb(60, 179, 113)';
    }

    if (
      name.checkValidity() &&
      email.checkValidity() &&
      password.checkValidity()
    ) {
      submitBtn.disabled = false;
      submitBtn.style.cursor = 'pointer';
    } else {
      submitBtn.disabled = true;
      submitBtn.style.cursor = 'auto';
    }
  }

  if (form.length === 4) {
    const [email, password, seePassword, submitBtn] = form;

    if (seePassword.checked === true) {
      password.type = 'text';
    } else {
      password.type = 'password';
    }

    if (!email.checkValidity()) {
      email.style.color = 'rgba(255, 99, 71, 1)';
    } else {
      email.style.color = 'rgb(60, 179, 113)';
    }
    if (!password.checkValidity()) {
      password.style.color = 'rgba(255, 99, 71, 1)';
    } else {
      password.style.color = 'rgb(60, 179, 113)';
    }

    if (email.checkValidity() && password.checkValidity()) {
      submitBtn.disabled = false;
      submitBtn.style.cursor = 'pointer';
    } else {
      submitBtn.disabled = true;
      submitBtn.style.cursor = 'auto';
    }
  }
};

const removeCheckedForm = () => {
  form.removeEventListener('submit', createDataForm);
  form.removeEventListener('input', checkRequiredForm);
};

const addCheckedForm = () => {
  form.addEventListener('submit', createDataForm);
  form.addEventListener('input', checkRequiredForm);
};

// >

// CREATE MARKUP MODAL'S WINDOW >>

const createMarkupSignIn = () => {
  const markup = `
  <label class="sign-up-email">
    <input
      type="email"
      placeholder="email"
      name="user_email"
      minlength="2"
      required
      title="your@mail.com"
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[a-z]{2,4}$"
    />
    <svg class="sign-up__email">
      <use href="${icons}#icon-email"></use>
    </svg>
  </label>
  <label class="sign-up-password">
    <input
      type="password"
      placeholder="password"
      name="user_password"
      minlength="5"
      maxlength="12"
      required
    />
    <svg class="sign-up__lock">
      <use href="${icons}#icon-lock"></use>
    </svg>
  </label>
  <input type="checkbox" id="see" name="checked password"/>
  <label for="see" class="sign-up-checkbox" name="checked password">
    see password
  </label>
  <button type="submit" disabled>sign up</button>
  `;
  form.innerHTML = markup;
  signInBtn.classList.add('sign-up-button-active');
  signUpBtn.classList.remove('sign-up-button-active');
};

const createMarkupSignUp = () => {
  const markup = `
  <label class="sign-up-name">
    <input
      type="text"
      placeholder="name"
      name="user_name"
      minlength="2"
      required
      pattern="^[a-zA-Z]+$"
    />
  </label>
  <label class="sign-up-email">
    <input
      type="email"
      placeholder="email"
      name="user_email"
      required
      title="your@mail.com"
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    />
    <svg class="sign-up__email">
      <use href="${icons}#icon-email"></use>
    </svg>
  </label>
  <label class="sign-up-password">
    <input
      type="password"
      placeholder="password"
      name="user_password"
      minlength="5"
      maxlength="12"
      required
    />
    <svg class="sign-up__lock">
      <use href="${icons}#icon-lock"></use>
    </svg>
  </label>
  <input type="checkbox" id="see" name="checked password"/>
  <label for="see" class="sign-up-checkbox" name="checked password">
    see password
  </label>
  <button type="submit" disabled>sign up</button>
  `;
  form.innerHTML = markup;
  signUpBtn.classList.add('sign-up-button-active');
  signInBtn.classList.remove('sign-up-button-active');
};

signUpBtn.addEventListener('click', createMarkupSignUp);
signInBtn.addEventListener('click', createMarkupSignIn);

createMarkupSignUp();

// >>

//  OPEN OR CLOSED MODAL's WINDOW >>>

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
    removeCheckedForm();
  }
};

const escapeCloseModalSingUp = e => {
  if (e.code === 'Escape') {
    bodyRef.classList.remove('no-scroll-body-js');
    refs.signUp.classList.remove('sign-up-hidden');
    removeCheckedForm();
  }
};

const openModalSingUp = () => {
  bodyRef.classList.add('no-scroll-body-js');
  refs.signUp.classList.add('sign-up-hidden');
  refs.signUp.addEventListener('click', closeModalSingUp);
  document.addEventListener('keydown', escapeCloseModalSingUp);
  addCheckedForm();
};

refs.headerSignUp.addEventListener('click', openModalSingUp);
refs.headerSignUpMenu.addEventListener('click', openModalSingUp);

// >>>

setTimeout(() => {
  refs.signUp.classList.add('sign-up-display-block-js');
}, 250);
