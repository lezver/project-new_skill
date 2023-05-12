import { addLoader, removeLoader } from '../loader/loader';
import { refs } from './refsOfTags';
import { fetchBooks } from '../categories/fetchRequest';

export const createMarkupCategories = arr => {
  const markup = arr.reduce((acc, { book_image, title, author, _id }) => {
    const img = `<img class="img__book" data-id=${_id} width="180" heigh="265" loading="lazy" src="${book_image}" alt="book" />`;

    return (
      acc +
      `
      <li class="home__item-category">
        <div class="img__wrapper" data-id=${_id}>
          ${img ? img : refs.mobCapImg}
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

const findCategory = async e => {
  if (e.target.className === 'category-btn') {
    addLoader();

    const category = e.target.dataset.category.replace(/ /g, '+');

    const response = await fetchBooks.getBooksByCategory(category);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    await createMarkupCategories(response);

    refs.homeItems.classList.add('home__items-category');

    e.target.disabled = true;

    setTimeout(() => {
      e.target.disabled = false;
    }, 1000);
  }
};

export const createMarkupBestBooks = arr => {
  refs.homeItems.classList.remove('home__items-category');
  const markup = arr.reduce(
    (
      acc,
      {
        list_name,
        books: [firstBook, secondBook, thirdBook, fourthBook, fifthBook],
      }
    ) => {
      const img1 = `<img class="img__book" data-id=${firstBook._id} width="180" heigh="265" loading="lazy" src="${firstBook.book_image}" alt="book" />`;
      const img2 = `<img class="img__book" data-id=${secondBook._id} width="180" heigh="265" loading="lazy" src="${secondBook.book_image}" alt="book" />`;
      const img3 = `<img class="img__book" data-id=${thirdBook._id} width="180" heigh="265" loading="lazy" src="${thirdBook.book_image}" alt="book" />`;
      const img4 = `<img class="img__book" data-id=${fourthBook._id} width="180" heigh="265" loading="lazy" src="${fourthBook.book_image}" alt="book" />`;
      const img5 = `<img class="img__book" data-id=${fifthBook._id} width="180" heigh="265" loading="lazy" src="${fifthBook.book_image}" alt="book" />`;

      return (
        acc +
        `
      <li class="home__item">
      <p>${list_name}</p>
        <ul>
          <li>
            <div class="img__wrapper" data-id=${firstBook._id}>
              ${img1 ? img1 : refs.mobCapImg}
            </div>
            <h2>${firstBook.title}</h2>
            <span>${firstBook.author}</span>
          </li>
          <li>
            <div class="img__wrapper" data-id=${secondBook._id}>
              ${img2 ? img2 : refs.mobCapImg}
            </div>
            <h2>${secondBook.title}</h2>
            <span>${secondBook.author}</span>
          </li>
          <li>
            <div class="img__wrapper" data-id=${thirdBook._id}>
              ${img3 ? img3 : refs.mobCapImg}
            </div>
            <h2>${thirdBook.title}</h2>
            <span>${thirdBook.author}</span>
          </li>
          <li>
            <div class="img__wrapper" data-id=${fourthBook._id}>
              ${img4 ? img4 : refs.mobCapImg}
            </div>
            <h2>${fourthBook.title}</h2>
            <span>${fourthBook.author}</span>
          </li>
          <li>
            <div class="img__wrapper" data-id=${fifthBook._id}>
              ${img5 ? img5 : refs.mobCapImg}
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

const fetchTopBooks = async () => {
  try {
    addLoader();

    const response = await fetchBooks.getBestSellers();

    await createMarkupBestBooks(response);
  } catch (error) {
    console.log(error);
  }
};

fetchTopBooks();

refs.homeItems.addEventListener('click', findCategory);
