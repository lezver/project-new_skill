import { fetchBooks } from '../categories/fetchRequest';

const refs = {
  listOfBooks: document.querySelector('.home__items'),
  backdrop: document.querySelector('.backdrop'),
  modalWindow: document.querySelector('.modal-window'),
};

const modalWindowCloseIcon = refs.modalWindow.querySelector('.close-icon');
const modalWindowCloseButton =
  refs.modalWindow.querySelector('.close-icon-button');
const imageContainer = document.querySelector('.image-container');
let bookName = refs.modalWindow.querySelector('.book-name');
let bookAuthor = refs.modalWindow.querySelector('.book-author');
let bookDescription = refs.modalWindow.querySelector('.book-description');
let amazonLink = refs.modalWindow.querySelector('.amazon-link');
let bookLink = refs.modalWindow.querySelector('.book-link');
let bookShopLink = refs.modalWindow.querySelector('.book-shop-link');
const addBookButton = refs.modalWindow.querySelector('.add-book-button');
const removeBookContainer = refs.modalWindow.querySelector(
  '.remove-book-container'
);
const removeBookButton = removeBookContainer.querySelector(
  '.remove-book-button'
);

// OPEN MODAL WINDOW
refs.listOfBooks.addEventListener('click', e => {
  const asd = document.querySelector('.img__wrapper');
  if (
    e.target.className === 'img__wrapper' ||
    e.target.className === 'img__book'
  ) {
    document.body.classList.add('no-scroll-body-js');
    // FETCH BOOK FUNCTION
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

      refs.backdrop.classList.add('backdrop-visible');

      refs.modalWindow.id = await _id;

      const defaultImage = `<img class="img__cap" width="180" height="265" srcset="
				./images/png/home/cap.jpg    1x,
				./images/png/home/cap@2x.jpg 2x
			"
			src="./images/png/home/cap.jpg"
			alt="cap" loading="lazy"
			/>`;
      const bookImage = `<img src="${book_image}" load="lazy" alt="Book image" class="book-image" />`;
      imageContainer.innerHTML = book_image ? bookImage : defaultImage;

      bookName.textContent = await title;
      bookAuthor.textContent = await author;
      if (description) {
        bookDescription.style.display = 'block';
        bookDescription.textContent = description;
      } else {
        bookDescription.style.display = 'none';
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
      // const objTitle = shoppingList.find(obj => obj.title === title);
      // BOOK IDS ARE DIFFERENT DUE TO THE VARIETY OF GENRES, OR AN ISSUE WITH THE BACKEND SYSTEM.
      // SO, IF YOU WANT TO SEARCH FOR A BOOK MORE ACCURATELY BY ITS TITLE,
      // YOU CAN UNCOMMENT LINE 81 AND CHANGE '!objId' TO '!objTitle' IN BRACKETS ON LINES 86 AND 109.

      if (!objId) {
        refs.modalWindow.classList.remove('colored-modal-border');
        addBookButton.classList.remove('add-book-button-none');
        removeBookContainer.classList.remove('remove-book-container-visible');
      } else {
        addBookButton.classList.add('add-book-button-none');
        refs.modalWindow.classList.add('colored-modal-border');
        removeBookContainer.classList.add('remove-book-container-visible');
      }

      addBookButton.addEventListener('click', AddBookToShoppingList);
      removeBookButton.addEventListener('click', RemoveBookFromShoppingList);
      // ADD BOOK TO SHOPPING LIST
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
          refs.modalWindow.classList.add('colored-modal-border');
          removeBookContainer.classList.add('remove-book-container-visible');
        }
        localStorage.setItem('shopping_list', JSON.stringify(shoppingList));
        addBookButton.removeEventListener('click', AddBookToShoppingList);
      }
      // REMOVE BOOK FROM SHOPPING LIST
      function RemoveBookFromShoppingList() {
        const index = shoppingList.find(obj => obj.title === title);
        if (index) {
          shoppingList.splice(index, 1);
          localStorage.setItem('shopping_list', JSON.stringify(shoppingList));
          addBookButton.classList.remove('add-book-button-none');
          refs.modalWindow.classList.remove('colored-modal-border');
          removeBookContainer.classList.remove('remove-book-container-visible');
          addBookButton.addEventListener('click', AddBookToShoppingList);
        }
        removeBookButton.removeEventListener('click', AddBookToShoppingList);
      }
      return;
    }
    fetchBook();
  }
});

// CLOSE MODAL WINDOW
document.addEventListener('click', e => {
  if (e.target === refs.backdrop) {
    refs.backdrop.classList.remove('backdrop-visible');
    document.body.classList.remove('no-scroll-body-js');
  } else {
    if (
      e.target === modalWindowCloseButton ||
      e.target === modalWindowCloseButton.firstElementChild ||
      e.target === modalWindowCloseIcon.firstElementChild
    ) {
      refs.backdrop.classList.remove('backdrop-visible');
      document.body.classList.remove('no-scroll-body-js');
    }
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    refs.backdrop.classList.remove('backdrop-visible');
    document.body.classList.remove('no-scroll-body-js');
  }
});

// A BUG FIX WAS MADE TO PREVENT THE MODAL WINDOW FROM APPEARING FOR A FEW SECONDS DURING PAGE RELOADING
setTimeout(() => {
  refs.backdrop.classList.add('backdrop-display-block-js');
}, 250);
