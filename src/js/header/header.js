import openCloseIcon from '../../images/icons.svg';
import styles from '../../sass/utils/_variables.scss';
import debounce from 'lodash.debounce';

//   Перемикач світла/темна тема
const body = document.body;
const header = document.querySelector('.page-nav');
const iconMobileMenu = document.querySelector('.menu-toggle');
const darkModeLocalStored = localStorage.getItem('darkMode');
let slider = document.querySelector('.switch');

slider.addEventListener('change', changeDarkMode);
// window.addEventListener('storage', syncChangeDarkMode);

if (darkModeLocalStored === 'true') {
  slider.checked = true;
  // slider.setAttribute('checked', '');
  setDarkModeStyle();
}

function changeDarkMode() {
  const darkModeId = 'darkMode';

  // if (slider.checked) {
  if (slider.checked) {
    setDarkModeStyle();
    localStorage.setItem(darkModeId, 'true');
  } else {
    setLightModeStyle();
    localStorage.setItem(darkModeId, 'false');
  }
}

// function syncChangeDarkMode(e) {
//   console.log(e);

//   console.log(slider.checked.value);
//   // console.log();
//   // console.log();
// }

function setLightModeStyle() {
  body.classList.remove('dark-mode');
  header.classList.remove('dark-mode');
  iconMobileMenu.classList.remove('dark-mode');
  // sliderBall.classList.remove('dark-mode');
}

function setDarkModeStyle() {
  body.classList.add('dark-mode');
  header.classList.add('dark-mode');
  iconMobileMenu.classList.add('dark-mode');
  // sliderBall.classList.add('dark-mode');
}


// Відкриття/Закриття модалки для моб.версії

const modalBoxEl = document.querySelector('.data-modal');
const openModalBtnEl = document.querySelector('.js-open-menu');
const openModalBtnSvgEl = document.querySelector('.icon-burger');
const signUpBtnMobile = document.querySelector('.sign-up-btn-js');
const iconHrefEl = document.querySelector('.icon-href');

openModalBtnEl.addEventListener('click', toggleModal);
signUpBtnMobile.addEventListener('click', toggleModal);

function toggleModal() {
  if (modalBoxEl.classList.contains('is-hidden')) {
    modalBoxEl.classList.remove('is-hidden');
    // body.classList.remove('no-scroll-body-js');
    iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-cross`);
    document.body.classList.add('modal-open');
    openModalBtnSvgEl.style.width = '18px';
    openModalBtnSvgEl.style.height = '18px';
    return;
  } else {
    modalBoxEl.classList.add('is-hidden');
    // body.classList.add('no-scroll-body-js');
    iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-menu`);
    document.body.classList.remove('modal-open');
    openModalBtnSvgEl.style.width = '24px';
    openModalBtnSvgEl.style.height = '24px';
  }
}

// Унеможливлення скролу мобільного меню



// Виділення жовтим назву поточної сторінки (меню в хедері)

const menuHomeEl = document.querySelector('.menu__home');
const menuShoppingEl = document.querySelector('.menu__shopping');

const setCurrentPage = () => {
  const currentPageName = window.location.pathname;
  // console.log(currentPageName);
  // console.log(menuHomeEl);
  // console.log(menuShoppingEl);

  if (
    currentPageName === '/index.html' ||
    currentPageName === '/project-new_skill/index.html' ||
    currentPageName === '/project-new_skill/'
  ) {
    menuHomeEl.classList.add('current-page');
    menuShoppingEl.classList.remove('current-page');
    return;
  }

  menuShoppingEl.classList.add('current-page');
  menuHomeEl.classList.remove('current-page');
};

setCurrentPage();

// Виділення жовтим назву поточної сторінки (меню в модалці)

const dropMenuHomeEl = document.querySelector('.drop-menu__home');
const dropMenuShoppingEl = document.querySelector('.drop-menu__shopping');

const dropSetCurrentPage = () => {
  const dropCurrentPageName = window.location.pathname;

  if (
    dropCurrentPageName === '/index.html' ||
    dropCurrentPageName === '/project-new_skill/index.html'
  ) {
    dropMenuHomeEl.classList.add('current-page');
    return;
  }
  dropMenuShoppingEl.classList.add('current-page');
};

dropSetCurrentPage();