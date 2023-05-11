import { fetchBooks } from './fetchRequest';
import { refs } from '../home/refsOfTags';
import { createMarkupCategories, createMarkupBestBooks } from '../home/home';
import { addLoader } from '../loader/loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const allCategoriesBtn = document.getElementById('allCategoriesBtn');
const [listEl] = document.getElementsByClassName('categories-list');
const [inputDarkMode] = document.getElementsByClassName('switch');

inputDarkMode.addEventListener('change', changeMode);

allCategoriesBtn.classList.add('active-categories');
listEl.addEventListener('click', markup);
let localStorageMode = localStorage.getItem('darkMode');
let [activeBtn] = document.getElementsByClassName('active-categories');

changeMode();
function changeMode(event) {
  localStorageMode = localStorage.getItem('darkMode');

  [activeBtn] = document.getElementsByClassName('active-categories');

  if (localStorageMode === 'true') {
    activeBtn.classList.add('active-dark');
    listEl.classList.add('dark');
  } else {
    activeBtn.classList.remove('active-dark');
    listEl.classList.remove('dark');
  }
}

const clearSelectedCategories = () => {
  for (let i = 0; i < listEl.children.length; i += 1) {
    const category = listEl.children[i];

    category.firstElementChild.classList.remove('active-categories');
    category.firstElementChild.classList.remove('active-dark');
  }
};
const createCategoryList = async () => {
  try {
    const categoriesList = await fetchBooks.getCategoriesList();
    categoriesList.sort(function (a, b) {
      const categoryA = a.list_name;
      const categoryB = b.list_name;
      if (categoryA < categoryB) {
        return -1;
      }
      if (categoryA > categoryB) {
        return 1;
      }
      return 0;
    });

    const makeNewButtons = categoriesList
      .map(
        category =>
          `<li class= 'categories-list__item '> <button class= 'categories-list__button'>${category.list_name}</button> </li>`
      )
      .join('');
    listEl.insertAdjacentHTML('beforeend', makeNewButtons);
    const buttons = document.querySelectorAll('.categories-list__button');
    addEventListenerForCategory(buttons);
  } catch (error) {
    Notify.failure('Server error! Please try again later');
  }
};
createCategoryList();

const addEventListenerForCategory = buttons => {
  for (let i = 1; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', makeOneCategory);
  }
};

async function markup(ev) {
  try {
    if (ev.target.nodeName !== 'BUTTON') {
      return;
    }
    clearSelectedCategories();
    if (ev.target === allCategoriesBtn) {
      addLoader();
      allCategoriesBtn.classList.add('active-categories');
      changeMode();

      refs.homeTitle.innerHTML = 'Best Sellers <span>Books</span>';
      const response = await fetchBooks.getBestSellers();
      createMarkupBestBooks(response);
      return;
    }
    if (ev.target === allCategoriesBtn) {
      allCategoriesBtn.classList.remove('active-dark');
    } else {
      clearSelectedCategories();
    }
    drawCategory(ev.target.textContent);
    ev.target.classList.add('active-categories');
    changeMode();
  } catch (error) {
    console.log(error);
  }
}

const drawCategory = nameOfCategory => {
  const title = nameOfCategory.split(' ');
  const titleStartPart = title.slice(0, title.length - 1).join(' ');
  const titleEndPart = title.slice(title.length - 1).join();
  refs.homeTitle.innerHTML = `${titleStartPart}<span > ${titleEndPart}</span>`;
  allCategoriesBtn.classList.remove('active-categories');
};

async function makeOneCategory(categoryName) {
  try {
    addLoader();
    const categoryArr = await fetchBooks.getBooksByCategory(
      categoryName.target.innerHTML
    );
    createMarkupCategories(categoryArr);
    refs.homeItems.classList.add('home__items-category');
  } catch (error) {
    console.log(error);
  }
}
