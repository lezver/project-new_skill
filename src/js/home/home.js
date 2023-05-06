import axios from 'axios';
import debounce from 'lodash.debounce';
import { refs } from './refsOfTags';

const URL = 'https://books-backend.p.goit.global/books/top-books';

const checkBtn = async e => {
  const categoryBtn = document.querySelector('.category-btn');
  if (e.target.className === categoryBtn.className) {
    const category = e.target.dataset.category.replace(/ /g, '+');

    const fetchCategoryBooks = await axios.get(
      'https://books-backend.p.goit.global/books/category?category=' + category
    );

    e.target.disabled = true;

    setTimeout(() => {
      e.target.disabled = false;
    }, 1000);
  }
};

const createMurkupBestBooks = arr => {
  const maukup = arr.reduce(
    (
      acc,
      {
        list_name,
        books: [firstbook, secondBook, thirdBook, fourthBook, fifthBook],
      }
    ) => {
      const img1 = `<img src="${firstbook.book_image}" alt="book" />`;
      const img2 = `<img src="${secondBook.book_image}" alt="book" />`;
      const img3 = `<img src="${thirdBook.book_image}" alt="book" />`;
      const img4 = `<img src="${fourthBook.book_image}" alt="book" />`;
      const img5 = `<img src="${fifthBook.book_image}" alt="book" />`;

      return (
        acc +
        `
      <li class="home__item">
      <p>${list_name}</p>
        <ul>
          <li>
            <div>
              ${img1 ? img1 : refs.mobCap}
              <button type="button" data-open-modal>quick view</button>
            </div>
            <h2>${firstbook.title}</h2>
            <span>${firstbook.author}</span>
          </li>
          <li>
            <div>
              ${img2 ? img2 : refs.mobCap}
              <button type="button" data-open-modal>quick view</button>
            </div>
            <h2>${secondBook.title}</h2>
            <span>${secondBook.author}</span>
          </li>
          <li>
            <div>
              ${img3 ? img3 : refs.mobCap}
              <button type="button" data-open-modal>quick view</button>
            </div>
            <h2>${thirdBook.title}</h2>
            <span>${thirdBook.author}</span>
          </li>
          <li>
            <div>
              ${img4 ? img4 : refs.mobCap}
              <button type="button" data-open-modal>quick view</button>
            </div>
            <h2>${fourthBook.title}</h2>
            <span>${fourthBook.author}</span>
          </li>
          <li>
            <div>
              ${img5 ? img5 : refs.mobCap}
              <button type="button" data-open-modal>quick view</button>
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

  refs.homeTitle.innerHTML = '<span>Best Sellers</span> Books';

  refs.homeItems.innerHTML = maukup;

  refs.homeItems.addEventListener('click', checkBtn);
};

const fetchTopBooks = async url => {
  try {
    const response = await axios.get(url);

    await createMurkupBestBooks(response.data);
  } catch (error) {
    console.log(error);
  }
};

fetchTopBooks(URL);
