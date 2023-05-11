import { fetchBooks } from '../categories/fetchRequest';

// const refs = {
//   listOfBooks: document.querySelector('.home__items'),
//   backdrop: document.querySelector('.backdrop'),
//   modalWindow: document.querySelector('.modal-window'),
//   modalWindowCloseIcon: document.querySelector('.close-icon'),
//   modalWindowCloseButton: document.querySelector('.close-icon-button'),
//   imageContainer: document.querySelector('.image-container'),
//   bookName: document.querySelector('.book-name'),
//   bookAuthor: document.querySelector('.book-author'),
//   bookDescription: document.querySelector('.book-description'),
//   amazonLogo: document.querySelector('.amazon-logo'),
//   amazonLink: document.querySelector('.amazon-link'),
// };

const listOfBooks = document.querySelector('.home__items');
const backdrop = document.querySelector('.backdrop');
const modalWindow = document.querySelector('.modal-window');
const modalWindowCloseIcon = document.querySelector('.close-icon');
const modalWindowCloseButton = document.querySelector('.close-icon-button');
const imageContainer = document.querySelector('.image-container');
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

// MODAL WINDOW OPEN
listOfBooks.addEventListener('click', e => {
  const asd = document.querySelector('.img__wrapper');
  if (e.target.className === 'img__wrapper' || e.target.nodeName === 'IMG') {
    document.body.classList.add('no-scroll-body-js');

    async function fetchBook() {
      const bookDataObj = await fetchBooks.getBookById(e.target.dataset.id);
      const {
        _id,
        book_image,
        title,
        list_name,
        author,
        description,
        buy_links: [Amazon, appleBooks, , , bookShop],
      } = bookDataObj;

      backdrop.classList.add('backdrop-visible');

      modalWindow.id = await _id;
      imageContainer.innerHTML = `<img src="${book_image}" alt="Book image" class="book-image" />`;
      bookName.textContent = await title;
      bookAuthor.textContent = await author;
      if (description) {
        bookDescription.textContent = description;
      } else {
        bookDescription.textContent = 'No description';
      } // ВИЯСНИТИ ЧОМУ З/БЕЗ AWAIT
      const amazonUrl = await Amazon.url;
      amazonLink.href = await amazonUrl;
      const bookUrl = await appleBooks.url;
      bookLink.href = await bookUrl;
      const bookShopUrl = await bookShop.url;
      bookShopLink.href = await bookShopUrl;

      let shoppingList = localStorage.getItem('shopping_list');
      shoppingList = shoppingList ? JSON.parse(shoppingList) : [];
      const objId = shoppingList.find(obj => obj.id === _id);

      if (!objId) {
        addBookButton.classList.remove('add-book-button-none');
        removeBookContainer.classList.remove('remove-book-container-visible');
      } else {
        addBookButton.classList.add('add-book-button-none');
        removeBookContainer.classList.add('remove-book-container-visible');
      }

      addBookButton.addEventListener('click', AddBookToShoppingList);
      removeBookButton.addEventListener('click', RemoveBookFromShoppingList);
      function AddBookToShoppingList() {
        const bookData = {
          id: _id,
          book_image: book_image,
          title: title,
          list_name: list_name,
          author: author,
          description: description,
          buy_links: [Amazon, appleBooks, bookShop],
        };
        if (!objId) {
          shoppingList.push(bookData);
          addBookButton.classList.add('add-book-button-none');
          removeBookContainer.classList.add('remove-book-container-visible');
        }
        localStorage.setItem('shopping_list', JSON.stringify(shoppingList));
        addBookButton.removeEventListener('click', AddBookToShoppingList);
        removeBookButton.removeEventListener('click', AddBookToShoppingList);
      }

      function RemoveBookFromShoppingList() {
        const index = shoppingList.find(obj => obj.id === _id);
        if (index) {
          shoppingList.splice(index, 1);
          localStorage.setItem('shopping_list', JSON.stringify(shoppingList));
          addBookButton.classList.remove('add-book-button-none');
          removeBookContainer.classList.remove('remove-book-container-visible');
          addBookButton.addEventListener('click', AddBookToShoppingList);
        }
      }
      return;
    }
    fetchBook();
  }
});

// MODAL WINDOW CLOSE
document.addEventListener('click', e => {
  if (e.target === backdrop) {
    backdrop.classList.remove('backdrop-visible');
    document.body.classList.remove('no-scroll-body-js');
  } else {
    if (e.target === modalWindowCloseButton) {
      backdrop.classList.remove('backdrop-visible');
      document.body.classList.remove('no-scroll-body-js');
    }
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    backdrop.classList.remove('backdrop-visible');
    document.body.classList.remove('no-scroll-body-js');
  }
});

// THEME MOD TOGGLE
themeSwitcher.addEventListener('change', changeThemeFunc);
changeThemeFunc();
function changeThemeFunc() {
  const themeMode = localStorage.getItem('darkMode');
  if (themeMode === 'true') {
    modalWindow.classList.add('black-theme-modal-window');
    modalWindowCloseIcon.classList.add('black-theme-close-icon');
    amazonLogo.classList.add('black-theme-amazon-logo');
    addBookButton.classList.add('black-theme-add-book-button');
    removeBookButton.classList.add('black-theme-remove-book-button');
    removeBookText.classList.add('black-theme-remove-book-text');
  } else {
    modalWindow.classList.remove('black-theme-modal-window');
    modalWindowCloseIcon.classList.remove('black-theme-close-icon');
    amazonLogo.classList.remove('black-theme-amazon-logo');
    addBookButton.classList.remove('black-theme-add-book-button');
    removeBookButton.classList.remove('black-theme-remove-book-button');
    removeBookText.classList.remove('black-theme-remove-book-text');
  }
}
