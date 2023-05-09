import axios from 'axios';
import { addLoader, removeLoader } from '../loader/loader';
import { refs } from './refsOfTags';

const URL = 'https://books-backend.p.goit.global/books/top-books';
const URL_CATEGORY =
  'https://books-backend.p.goit.global/books/category?category=';

const createMarkupCategories = arr => {
  const markup = arr.reduce((acc, { book_image, title, author, _id }) => {
    const img = `<img loading="lazy" src="${book_image}" alt="book" />`;

    return (
      acc +
      `
      <li class="home__item-category">
        <div class="img__wrapper" data-id=${_id}>
          ${img ? img : refs.mobCap}
        </div>
        <h2>${title}</h2>
        <span>${author}</span>
      </li>
      `
    );
  }, '');

  refs.homeItems.innerHTML = markup;

  removeLoader();
};

const fetchCategoryBooks = async value => {
  const response = await axios.get(URL_CATEGORY + value);

  await createMarkupCategories(response.data);
};

const checkBtn = e => {
  const categoryBtn = document.querySelector('.category-btn');

  if (e.target.className === 'category-btn') {
    const category = e.target.dataset.category.replace(/ /g, '+');

    addLoader();

    fetchCategoryBooks(category);

    refs.homeItems.classList.add('home__items-category');

    e.target.disabled = true;

    setTimeout(() => {
      e.target.disabled = false;
    }, 1000);
  }
};

const createMarkupBestBooks = arr => {
  refs.homeItems.classList.remove('home__items-category');
  const markup = arr.reduce(
    (
      acc,
      {
        list_name,
        books: [firstBook, secondBook, thirdBook, fourthBook, fifthBook],
      }
    ) => {
      const img1 = `<img loading="lazy" src="${firstBook.book_image}" alt="book" />`;
      const img2 = `<img loading="lazy" src="${secondBook.book_image}" alt="book" />`;
      const img3 = `<img loading="lazy" src="${thirdBook.book_image}" alt="book" />`;
      const img4 = `<img loading="lazy" src="${fourthBook.book_image}" alt="book" />`;
      const img5 = `<img loading="lazy" src="${fifthBook.book_image}" alt="book" />`;

      return (
        acc +
        `
      <li class="home__item">
      <p>${list_name}</p>
        <ul>
          <li>
            <div class="img__wrapper" data-id=${firstBook._id}>
              ${img1 ? img1 : refs.mobCap}
            </div>
            <h2>${firstBook.title}</h2>
            <span>${firstBook.author}</span>
          </li>
          <li>
            <div class="img__wrapper" data-id=${secondBook._id}>
              ${img2 ? img2 : refs.mobCap}
            </div>
            <h2>${secondBook.title}</h2>
            <span>${secondBook.author}</span>
          </li>
          <li>
            <div class="img__wrapper" data-id=${thirdBook._id}>
              ${img3 ? img3 : refs.mobCap}
            </div>
            <h2>${thirdBook.title}</h2>
            <span>${thirdBook.author}</span>
          </li>
          <li>
            <div class="img__wrapper" data-id=${fourthBook._id}>
              ${img4 ? img4 : refs.mobCap}
            </div>
            <h2>${fourthBook.title}</h2>
            <span>${fourthBook.author}</span>
          </li>
          <li>
            <div class="img__wrapper" data-id=${fifthBook._id}>
              ${img5 ? img5 : refs.mobCap}
            </div>
            <h2>${fifthBook.title}</h2>
            <span>${fifthBook.author}</span>
          </li>
        </ul>
        <button class="category-btn" type="button" data-category="${list_name}">
          see more
        </button>
      </li>
      `
      );
    },
    ''
  );

  refs.homeTitle.innerHTML = 'Best Sellers <span>Books</span>';

  refs.homeItems.innerHTML = markup;

  removeLoader();
};

const fetchTopBooks = async url => {
  try {
    addLoader();
    const response = await axios.get(url);

    await createMarkupBestBooks(response.data);
  } catch (error) {
    console.log(error);
  }
};

fetchTopBooks(URL);

refs.homeItems.addEventListener('click', checkBtn);
