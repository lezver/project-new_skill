

import Pagination from 'tui-pagination';

import amazonImage1 from '../../images/png/modal-book/amazon.png';
import amazonImage2 from '../../images/png/modal-book/amazon@2x.png';
import appleImage1 from '../../images/png/modal-book/book.png';
import appleImage2 from '../../images/png/modal-book/book@2x.png';
import bookshopImage1 from '../../images/png/modal-book/book-shop.png';
import bookshopImage2 from '../../images/png/modal-book/book-shop@2x.png';
import booksImageMob1 from '../../images/png/shopping-list/books.png';
import booksImageMob2 from '../../images/png/shopping-list/books@2x.png';
import bookBasket1 from '../../images/png/shopping-list/basket/basket.png';
import bookBasket2 from '../../images/png/shopping-list/basket/basket@2x.png';
import svgIcon from '../../images/icons.svg';

const galleryEl = document.querySelector('.gallery');
const emptyListEl = document.querySelector('.shopping-list-empty');
const paginationEl = document.querySelector('.pagination');
const savedSettings = localStorage.getItem('shopping_list');

let currentPage = 1;

const paginationContainer = document.getElementById('tui-pagination-container');
let perPage = window.innerWidth <= 576 ? 4 : 3;
let visiblePages = window.innerWidth <= 576 ? 2 : 3;
const paginationSettings = {
  totalItems: 100,
  itemsPerPage: perPage,
  visiblePages: visiblePages,
  centerAlign: true,
  template: {
    moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
            '<span class="tui-ico-{{type}}">' +
                `<svg >
                    <use href = "${svgIcon}#icon-pagination-{{type}}"></use>
                </svg>` +
            '</span>' +
        '</a>',
    disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
            '<span class="tui-ico-{{type}}">' +
                `<svg >
                    <use href = "${svgIcon}#icon-pagination-{{type}}"></use>
                </svg>` +
            '</span>' +
        '</span>',
  }
};
const paginationInstance = new Pagination(
  paginationContainer,
  paginationSettings
);
paginationInstance.on('beforeMove', function (eventData) {
  currentPage = eventData.page;
  innerMarkup();
});

let parsedSettings = [];
if (savedSettings) {
  parsedSettings = JSON.parse(savedSettings);
  paginationInstance.reset(parsedSettings.length);
}
innerMarkup();

function onClick(event) {
  const target = event.target.closest('.button');
  const index = parsedSettings.map(element => element._id).indexOf(target.id);
  parsedSettings.splice(index, 1);
  // localStorage.setItem('shopping_list', JSON.stringify(parsedSettings));
  innerMarkup();
}

function innerMarkup() {
  offListener();
  if (parsedSettings.length) {
    const markup = getMarkup()
      .map(dataItem => buildBooks(dataItem))
      .join('');
    galleryEl.innerHTML = markup;
    onListener();
    paginationEl.classList.add('pagination-visible');
    paginationEl.classList.remove('pagination-hidden');
  } else {
    paginationEl.classList.add('pagination-hidden');
    paginationEl.classList.remove('pagination-visible');
    emptyListEl.innerHTML = buildEmptyList();
    galleryEl.innerHTML = ``;
  }
}

function getMarkup() {
  const from = 0 + (currentPage - 1) * perPage;
  const to = perPage + (currentPage - 1) * perPage;
  return parsedSettings.slice(from, to);
}

function offListener() {
  removeEventListener('click', onClick);
  removeEventListener('resize', onResize);
}

function onListener() {
  const buttonEl = document.querySelectorAll('.button');
  buttonEl.forEach(element => {
    element.addEventListener('click', onClick);
  });
  window.addEventListener('resize', onResize);
}

function onClick(event) {
    const target = event.target.closest('.button');
    const index = parsedSettings.map(element => element._id).indexOf(target.id);
    parsedSettings.splice(index, 1);
    innerMarkup();
    paginationInstance.setTotalItems(parsedSettings.length);
    paginationInstance.movePageTo(paginationInstance.getCurrentPage());
  }

  function onResize(event) {
    const _perPage = event.target.innerWidth <= 576 ? 4 : 3
    if (_perPage != perPage) {
        perPage = _perPage
        paginationInstance.setItemsPerPage(perPage)
        innerMarkup()
        paginationInstance.movePageTo(paginationInstance.getCurrentPage());
    }
  }

function buildEmptyList() {
  return `
    <p>This page is empty, add some books and proceed to order.</p>
    <img srcset=" ${booksImageMob1} 1x, ${booksImageMob2} 2x" src="${booksImageMob1}" alt="books">
  `;
}

buildBooks(parsedSettings);
function buildBooks({
  book_image,
  title,
  list_name,
  description,
  author,
  _id,
  buy_links,
}) {
  let urlAmazon = '';
  let urlApplebooks = '';
  let urlBookshop = '';
  if (buy_links) {
    const names = buy_links.map(item => item.name);
    const indexAmazon = names.indexOf('Amazon');
    urlAmazon = buy_links[indexAmazon].url;

    const indexApplebooks = names.indexOf('Apple Books');
    urlApplebooks = buy_links[indexApplebooks].url;

    const indexBookshop = names.indexOf('Bookshop');
    urlBookshop = buy_links[indexBookshop].url;
  }
  return `
  <li class="border shopping-list-item">
    <img src="${book_image}" alt="${title}" class="book_image">
    <div class = "book-info">
        <div>
            <div class="shopping-list-item-action">
                <div>
                    <h3 class = "book-tittle">${title}</h3>
                    <p class = "list-name">${list_name}</p>
                </div>
                <button id="${_id}" class="button">
                    <img srcset=" ${bookBasket1} 1x, ${bookBasket2} 2x"   src="${bookBasket1}" alt="basket" class = "basket">
                </button>
            </div>
        <div  class="description-info">
            <p class = "description">${description}</p>
        </div>
    </div>
    <div class="shopping-list-item-buy">
        <p class = "author">${author}</p>
        <ul class="list-buy">
          <li>
            <a target="_blank" href="${urlAmazon}">
              <img srcset="${amazonImage1} 1x, ${amazonImage2} 2x" src="${amazonImage1}" alt="amazon" class="link-amazon">
            </a>
          </li>
          <li>
            <a target="_blank" href="${urlApplebooks}">
              <img srcset="${appleImage1} 1x, ${appleImage2} 2x" src="${appleImage1}" alt="applebooks" class="link-applebooks">
            </a>
          </li>
          <li>
            <a target="_blank" href="${urlBookshop}">
              <img srcset="${bookshopImage1} 1x, ${bookshopImage2} 2x" src="${bookshopImage1}" alt="bookshop" class="link-bookshop">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </li>
  `;
}
