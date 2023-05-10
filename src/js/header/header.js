import openCloseIcon from '../../images/icons.svg';
import styles from '../../sass/utils/_variables.scss';
import debounce from 'lodash.debounce';

//   Перемикач світла/темна тема
export const body = document.body;

const header = document.querySelector('.page-nav');
const isDarkModeStored = localStorage.getItem('darkMode') === 'true';
let slider = document.querySelector('.switch');

const switchModeElStyles = {
  body: {
    lightMode: {
      bgColor: '#f6f6f6',
      mainTextColor: '#111111',
    },
    darkMode: {
      bgColor: '#202024',
      mainTextColor: '#fff',
    },
  },

  header: {
    lightMode: {
      bgColor: '#fff',
      mainTextColor: '#111111',
      borderColor: '#111111',
    },
    darkMode: {
      bgColor: '#111111',
      mainTextColor: '#fff',
      borderColor: '#fff',
    },
  },
};

slider.addEventListener('change', changeDarkMode);

if (isDarkModeStored) {
  slider.checked = true;
  setDarkModeBodyStyle();
  setDarkModeHeaderStyle();

  // body.classList.add('dark');
  // header.classList.add('dark');
}

function changeDarkMode() {
  const darkModeId = 'darkMode';

  if (slider.checked) {
    // body.classList.add('dark');
    // header.classList.add('dark');

    localStorage.setItem(darkModeId, 'true');
    setDarkModeBodyStyle();
    setDarkModeHeaderStyle();
    document.querySelector('.icon-href').setAttribute('fill', 'white');
  } else {
    // body.classList.remove('dark');
    // header.classList.remove('dark');

    localStorage.setItem(darkModeId, 'false');
    setLightModeBodyStyle();
    setLightModeHeaderStyle();
    document.querySelector('.icon-href').setAttribute('fill', 'black');
  }
}

function setLightModeBodyStyle() {
  // if (slider.checked) {
  //     body.style.backgroundColor = bgColor;
  //     body.style.color = mainTextColor;
  // } else {
  //     body.style.backgroundColor = bgColor;
  //     body.style.color = mainTextColor;
  // };

  const { bgColor, mainTextColor } = switchModeElStyles.body.lightMode;

  body.style.backgroundColor = bgColor;
  body.style.color = mainTextColor;
}

function setDarkModeBodyStyle() {
  const { bgColor, mainTextColor } = switchModeElStyles.body.darkMode;

  body.style.backgroundColor = bgColor;
  body.style.color = mainTextColor;
}

function setLightModeHeaderStyle() {
  const { bgColor, mainTextColor, borderColor } =
    switchModeElStyles.header.lightMode;

  header.style.backgroundColor = bgColor;
  header.style.color = mainTextColor;
  header.style.borderColor = borderColor;
}

function setDarkModeHeaderStyle() {
  const { bgColor, mainTextColor, borderColor } =
    switchModeElStyles.header.darkMode;

  header.style.backgroundColor = bgColor;
  header.style.color = mainTextColor;
  header.style.borderColor = borderColor;
}

//   Відкриття/Закриття модалки для моб.версії

const modalBoxEl = document.querySelector('.data-modal');
const openModalBtnEl = document.querySelector('.js-open-menu');
const openModalBtnSvgEl = document.querySelector('.icon-burger');
const iconHrefEl = document.querySelector('.icon-href');

openModalBtnEl.addEventListener('click', toggleModal);

if (isDarkModeStored) {
  iconHrefEl.setAttribute('fill', 'white');
} else {
  iconHrefEl.setAttribute('fill', 'black');
}

function toggleModal() {
  if (modalBoxEl.classList.contains('is-hidden')) {
    modalBoxEl.classList.remove('is-hidden');
    iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-cross`);
    document.body.classList.add('modal-open');
    openModalBtnSvgEl.style.width = '18px';
    openModalBtnSvgEl.style.height = '18px';
    return;
  } else {
    modalBoxEl.classList.add('is-hidden');
    iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-menu`);
    document.body.classList.remove('modal-open');
    openModalBtnSvgEl.style.width = '24px';
    openModalBtnSvgEl.style.height = '24px';
  }
}

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

// Обрізання назви Shopping list при певній довжині екрану

// const mediaQuery = window.matchMedia('(min-width: 577px) and (max-width: 640px)'); // визначаємо порогове значення
// const menuShoppingRef = document.getElementById('menu__shopping-list');
// const DEBOUNCE_DELAY = 400;

// function handleMediaChange(event) {
//     if (event.matches) {
//         menuShoppingRef.textContent = 'Shopping...'; // змінюємо текстовий вміст елементу
//     } else {
//         menuShoppingRef.textContent = '';
//         menuShoppingRef.insertAdjacentHTML('beforeend', `Shopping list
//             <svg class="icon-cart" width="13.33" height="16.67">
//                 <use href="/src/images/icons.svg#icon-email"></use>
//             </svg>
//         `); // змінюємо текстовий вміст елементу назад
//         // menuShoppingRef.setAttribute();
//     }
// }

// // function setShortNameShopList() {
// //     menuShoppingRef.textContent = 'Shopping...';
// // }

// mediaQuery.addEventListener('change', debounce(handleMediaChange, DEBOUNCE_DELAY)); // додаємо слухача на подію зміни медіа-запиту

// // викликаємо функцію handleMediaChange при завантаженні сторінки, щоб встановити початковий текстовий вміст елементу
// handleMediaChange(mediaQuery);
