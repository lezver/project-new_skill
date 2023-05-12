import openCloseIcon from '../../images/icons.svg';

//   Light/dark theme switcher
export const bodyRef = document.body;
const header = document.querySelector('.page-nav');
const iconMobileMenu = document.querySelector('.menu-toggle');
const darkModeLocalStored = localStorage.getItem('darkMode');
const darkModeId = 'darkMode';
let slider = document.querySelector('.switch');

slider.addEventListener('change', changeDarkMode);
window.addEventListener('storage', syncChangeDarkMode);

if (darkModeLocalStored === 'true') {
  slider.checked = true;
  slider.setAttribute('checked', '');
  setDarkModeStyle();
}

function changeDarkMode() {
  if (slider.checked) {
    setDarkModeStyle();
    try {
      localStorage.setItem(darkModeId, 'true');
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  } else {
    setLightModeStyle();
    try {
      localStorage.setItem(darkModeId, 'false');
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }
}

function syncChangeDarkMode(e) {
  // console.log(e);
  // console.log('slider.checked', slider.checked);
  // console.log('e.newValue', e.newValue);

  if (e.newValue === 'true') {
    slider.checked = true;
    slider.setAttribute('checked', '');
    setDarkModeStyle();
  } else {
    slider.checked = false;
    slider.removeAttribute('checked');
    setLightModeStyle();
  }
}

function setLightModeStyle() {
  bodyRef.classList.remove('dark-mode');
  header.classList.remove('dark-mode');
  iconMobileMenu.classList.remove('dark-mode');
}

function setDarkModeStyle() {
  bodyRef.classList.add('dark-mode');
  header.classList.add('dark-mode');
  iconMobileMenu.classList.add('dark-mode');
}

// Opening/closing a mod for the mobile version

const modalBoxEl = document.querySelector('.data-modal');
const openModalBtnEl = document.querySelector('.js-open-menu');
const openModalBtnSvgEl = document.querySelector('.icon-burger');
const signUpBtnMobile = document.querySelector('.sign-up-btn-js');
const booksImg = document.querySelector('.modal__books-list');
const iconHrefEl = document.querySelector('.icon-href');

openModalBtnEl.addEventListener('click', toggleModal);
signUpBtnMobile.addEventListener('click', toggleModal);

function openModalTransition() {
  modalBoxEl.style.right = '0';
  booksImg.style.scale = '1.2';
}

function closeModalTransition() {
  modalBoxEl.style.right = '-100%';
  booksImg.style.scale = '1';
}

function toggleModal(e) {
  if (modalBoxEl.classList.contains('is-hidden')) {
    modalBoxEl.classList.remove('is-hidden');
    setTimeout(openModalTransition, 0);
    bodyRef.classList.add('no-scroll-body-js');
    iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-cross`);
    document.body.classList.add('modal-open');
    openModalBtnSvgEl.style.width = '18px';
    openModalBtnSvgEl.style.height = '18px';
    return;
  } else {
    
    if (e.target === signUpBtnMobile) {
      modalBoxEl.classList.add('is-hidden');
    } else {
      setTimeout(function () {
        modalBoxEl.classList.add('is-hidden');
      }, 250);
    }

    setTimeout(closeModalTransition, 0);
    bodyRef.classList.remove('no-scroll-body-js');
    iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-menu`);
    document.body.classList.remove('modal-open');
    openModalBtnSvgEl.style.width = '24px';
    openModalBtnSvgEl.style.height = '24px';
  }
}

// Highlighting the name of the current page in yellow, as well as making disabled the current page 'button' (menu in the header)

const menuHomeEl = document.querySelector('.menu__home');
const menuShoppingEl = document.querySelector('.menu__shopping');
const disabledClass = 'disabled';

const setCurrentPage = () => {
  const currentPageName = window.location.pathname;
  // console.log(currentPageName);

  if (
    currentPageName === '/index.html' ||
    currentPageName === '/project-new_skill/' ||
    currentPageName === '/project-new_skill/index.html'
  ) {
    menuHomeEl.classList.add('current-page');
    menuShoppingEl.classList.remove('current-page');
    toggleElDisabled(menuShoppingEl);
    menuHomeEl.classList.add(disabledClass);
    return;
  }

  menuShoppingEl.classList.add('current-page');
  menuHomeEl.classList.remove('current-page');
  toggleElDisabled(menuHomeEl);
  menuShoppingEl.classList.add(disabledClass);
};

setCurrentPage();

function toggleElDisabled(element) {
  if (!element.classList.contains(disabledClass)) return;

  element.classList.remove(disabledClass);
}

// Highlighting the name of the current page in yellow, as well as making disabled the current page 'button' (menu in the modal)

const dropMenuHomeEl = document.querySelector('.drop-menu__home');
const dropMenuShoppingEl = document.querySelector('.drop-menu__shopping');

const dropSetCurrentPage = () => {
  const dropCurrentPageName = window.location.pathname;

  if (
    dropCurrentPageName === '/index.html' ||
    dropCurrentPageName === '/project-new_skill/' ||
    dropCurrentPageName === '/project-new_skill/index.html'
  ) {
    dropMenuHomeEl.classList.add('current-page');
    dropMenuShoppingEl.classList.remove('current-page');
    toggleElDisabled(dropMenuShoppingEl);
    dropMenuHomeEl.classList.add(disabledClass);
    return;
  }
  dropMenuShoppingEl.classList.add('current-page');
  dropMenuHomeEl.classList.remove('current-page');
  toggleElDisabled(dropMenuHomeEl);
  dropMenuShoppingEl.classList.add(disabledClass);
};

dropSetCurrentPage();
