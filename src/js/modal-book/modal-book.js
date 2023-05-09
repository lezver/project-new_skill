import { fetchBooks } from '../categories/fetchRequest';

const listOfBooks = document.querySelector('.home__items');
const backdrop = document.querySelector('.backdrop');
const modalWindow = document.querySelector('.modal-window');
const modalWindowCloseButton = document.querySelector('.close-icon');
let bookImage = document.querySelector('.book-image');
let bookName = document.querySelector('.book-name');
let bookAuthor = document.querySelector('.book-author');
let bookDescription = document.querySelector('.book-description');
const amazonLogo = document.querySelector('.amazon-logo'); //
let amazonLink = document.querySelector('.amazon-link');
let bookLink = document.querySelector('.book-link');
let bookShopLink = document.querySelector('.book-shop-link');
const addBookButton = document.querySelector('.add-book-button');
const removeBookContainer = document.querySelector('.remove-book-container');
const removeBookButton = document.querySelector('.remove-book-button');
const removeBookText = document.querySelector('.remove-book-text');
const themeSwitcher = document.querySelector('.switch');
const themeMode = localStorage.getItem('darkMode');

// MODAL WINDOW OPEN
listOfBooks.addEventListener('click', e => {
  if (e.target.classList.contains('img__wrapper')) {
    backdrop.style.display = 'block';

    const bookID = e.target.dataset.id;

    async function fetchBook() {
      const {
        _id,
        book_image,
        title,
        author,
        description,
        buy_links: [Amazon, appleBooks, , , bookShop],
      } = await fetchBooks.getBookById(bookID);
      bookImage.src = book_image;
      bookName.textContent = title;
      bookAuthor.textContent = author;

      if (description) {
        bookDescription.textContent = await description;
      } else {
        bookDescription.textContent = 'No description';
      }

      console.log(await fetchBooks.getBookById(bookID));

      const amazonUrl = Amazon.url;
      amazonLink.href = amazonUrl;

      const bookUrl = appleBooks.url;
      bookLink.href = bookUrl;

      const bookShopUrl = bookShop.url;
      bookShopLink.href = bookShopUrl;

      // const savedBook = localStorage.getItem();
      // if (!savedBook) {
      //   removeBookContainer.style.display = 'none';
      //   addBookButton.style.display = 'block';
      // } else {
      //   removeBookContainer.style.display = 'block';
      //   addBookButton.style.display = 'none';
      // }
      // addBookButton.addEventListener('click', () => {
      //   localStorage.setItem('shopping_list', []);
      // });
      return;
    }
    fetchBook();
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

// console.log(themeMode);
// themeSwitcher.addEventListener('change', () => {

//   modalWindow.classList.remove('black-theme-modal-window');
//   modalWindowCloseButton.classList.remove('black-theme-close-icon');
//   amazonLogo.classList.remove('black-theme-amazon-logo');
//   addBookButton.classList.remove('black-theme-add-book-button');
//   removeBookButton.classList.remove('black-theme-remove-book-button');
//   removeBookText.classList.remove('black-theme-remove-book-text');
// });

if (themeMode === 'true') {
  modalWindow.classList.add('black-theme-modal-window');
  modalWindowCloseButton.classList.add('black-theme-close-icon');
  amazonLogo.classList.add('black-theme-amazon-logo');
  addBookButton.classList.add('black-theme-add-book-button');
  removeBookButton.classList.add('black-theme-remove-book-button');
  removeBookText.classList.add('black-theme-remove-book-text');
}
