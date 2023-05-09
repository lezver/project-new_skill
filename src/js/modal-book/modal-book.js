import axios from 'axios';

const listOfBooks = document.querySelector('.home__items');
const backdrop = document.querySelector('.backdrop');
const modalWindow = document.querySelector('.modal-window');
const modalWindowCloseButton = document.querySelector('.close-icon');
const bookImage = document.querySelector('.book-image');
const bookName = document.querySelector('.book-name');
const bookAuthor = document.querySelector('.book-author');
const bookDescription = document.querySelector('.book-description');
const amazonLogo = document.querySelector('.amazon-logo');
const addBookButton = document.querySelector('.add-book-button');
const removeBookContainer = document.querySelector('.remove-book-container');
const removeBookButton = document.querySelector('.remove-book-button');
const removeBookText = document.querySelector('.remove-book-text');
const themeSwitcher = document.querySelector('.slider__theme-switcher');
const themeMode = localStorage.getItem('darkMode');

console.log(themeMode);
themeSwitcher.addEventListener('change', () => {
  console.log('asdasdasd');
});
if (themeMode === 'true') {
  modalWindow.classList.add('black-theme-modal-window');
  modalWindowCloseButton.classList.add('black-theme-close-icon');
  amazonLogo.classList.add('black-theme-amazon-logo');
  addBookButton.classList.add('black-theme-add-book-button');
  removeBookButton.classList.add('black-theme-remove-book-button');
  removeBookText.classList.add('black-theme-remove-book-text');
}

// const test =
//   'https://books-backend.p.goit.global/books/643282b1e85766588626a080';
// async function fetchBook(link) {
//   const response = await axios.get(link);
//   return await console.log(response.data);
// }
// fetchBook(test);

// MODAL WINDOW OPEN
listOfBooks.addEventListener('click', e => {
  if (e.target.classList.contains('img__wrapper')) {
    backdrop.style.display = 'block';
  }
});

// MODAL WINDOW CLOSE
document.addEventListener('click', e => {
  if (e.target === backdrop) {
    backdrop.style.display = 'none';
  } else if (e.target === modalWindowCloseButton) {
    backdrop.style.display = 'none';
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    backdrop.style.display = 'none';
  }
});
