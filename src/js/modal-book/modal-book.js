import axios from 'axios';

const listOfBooks = document.querySelector('.home__items');
// const bookModal = document.querySelector('.');
const backdrop = document.querySelector('.backdrop');
const modalWindowCloseButton = document.querySelector('.close-icon');
const bookImage = document.querySelector('.book-image');
const bookName = document.querySelector('.book-name');
const bookAuthor = document.querySelector('.book-author');
const bookDescription = document.querySelector('.book-description');
const addBookButton = document.querySelector('.add-book-button');
const removeBookContainer = document.querySelector('.remove-book-container');
const removeBookButton = document.querySelector('.remove-book-button');
const themeSwitcher = document.querySelector('.slider__theme-switcher');
const themeMode = localStorage.getItem('darkMode');

console.log(themeMode);
if (themeMode === 'true') {
  console.log(123);
} else {
  console.log(321);
}

// const test =
//   'https://books-backend.p.goit.global/books/643282b1e85766588626a080';
// async function fetchBook(link) {
//   const response = await axios.get(link);
//   return await console.log(response.data);
// }
// fetchBook(test);

// MODAL WINDOW OPEN
// listOfBooks.addEventListener('click', e => {
//   if (e.target === book) {
//     backdrop.style.display = 'block';
//   }
// });

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
