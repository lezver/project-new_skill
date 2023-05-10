import { fetchBooks } from '../categories/fetchRequest';

const listOfBooks = document.querySelector('.home__items');
const backdrop = document.querySelector('.backdrop');
const modalWindow = document.querySelector('.modal-window');
const modalWindowCloseButton = document.querySelector('.close-icon');
let bookImage = document.querySelector('.book-image');
let bookName = document.querySelector('.book-name');
let bookAuthor = document.querySelector('.book-author');
let bookDescription = document.querySelector('.book-description');
const amazonLogo = document.querySelector('.amazon-logo');
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
    document.body.style.overflow = 'hidden';
    const bookID = e.target.dataset.id;

    async function fetchBook() {
      const bookDataObj = await fetchBooks.getBookById(bookID);
      const {
        _id,
        book_image,
        title,
        author,
        description,
        buy_links: [Amazon, appleBooks, , , bookShop],
      } = bookDataObj;

      modalWindow.id = await _id;
      bookImage.src = await book_image;
      bookName.textContent = await title;
      bookAuthor.textContent = await author;

      if (description) {
        bookDescription.textContent = description;
      } else {
        bookDescription.textContent = 'No description';
      } // ВИЯСНИТИ ЧОМУ З/БЕЗ AWAIT

      // console.log(bookDataObj);

      const amazonUrl = await Amazon.url;
      amazonLink.href = amazonUrl;

      const bookUrl = await appleBooks.url;
      bookLink.href = await bookUrl;

      const bookShopUrl = await bookShop.url;
      bookShopLink.href = await bookShopUrl;
      backdrop.classList.add('backdrop-visible');
      addBookButton.addEventListener('click', toggleBookAtShoppingList); // ADD/REMOVE TO SHOPPING LIST FUNC
      function toggleBookAtShoppingList() {
        const bookData = {
          id: _id,
          Image: book_image,
          Title: title,
          Author: author,
          Description: description,
          buy_links: [Amazon, appleBooks, bookShop],
        };

        let shoppingList = localStorage.getItem('shoppingList');
        shoppingList = shoppingList ? JSON.parse(shoppingList) : [];
        const index = shoppingList.find(obj => obj.id === _id);
        if (!index) {
          // BOOK ADD
          shoppingList.push(bookData);
          console.log(addBookButton);
          addBookButton.classList.add('add-book-button-none');
          removeBookContainer.classList.add('remove-book-container-visible');
        } else {
          // BOOK REMOVE
          // shoppingList.splice(index, 1);
          addBookButton.classList.remove('add-book-button-none');
          removeBookContainer.classList.remove('remove-book-container-visible');
        }
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        addBookButton.removeEventListener('click', toggleBookAtShoppingList);
      }

      return;
    }
    fetchBook();
  }
});

// MODAL WINDOW CLOSE
document.addEventListener('click', e => {
  if (e.target === backdrop) {
    document.body.style.overflow = 'auto';
    backdrop.classList.remove('backdrop-visible');
  } else if (e.target === modalWindowCloseButton) {
    document.body.style.overflow = 'auto';
    backdrop.classList.remove('backdrop-visible');
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.body.style.overflow = 'auto';
    backdrop.classList.remove('backdrop-visible');
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
