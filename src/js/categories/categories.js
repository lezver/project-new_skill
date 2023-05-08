import { fetchBooks } from './fetchRequest';
import { refs } from '../home/refsOfTags';
// import { fetchTopBooks } from '../home/home';

const allCategoriesBtn = document.getElementById('allCategoriesBtn');
const [listEl] = document.getElementsByClassName('categories-list');
const mainListEl = document.querySelector('.home__items');
const mainTitle = document.querySelector('.main__title-js');

const mode = localStorage.getItem('darkMode');
// console.log(mode);

let idBook = 0;
let title = '';
allCategoriesBtn.classList.add('active-categories');
listEl.addEventListener('click', markup);

const createCategoryList = async () => {
  try {
    const categoriesList = await fetchBooks.getCategoriesList();
    const makeNewButtons = categoriesList
      .map(
        category =>
          `<li class= 'categories-list__item '> <button class= 'categories-list__button'>${category.list_name}</button> </li>`
      )
      .join('');
    listEl.insertAdjacentHTML('beforeend', makeNewButtons);
    const buttons = document.querySelectorAll('.categories-list__button');
    // addEventListenerForCategory(buttons);
  } catch (error) {
    console.log(error);
  }
};
createCategoryList();

export const addEventListenerForCategory = buttons => {
  // buttons.forEach(btn => {
  //   btn.addEventListener('click', makeOneCategory);
  // });

  for (let i = 1; i < buttons.length - 1; i += 1) {
    buttons[i].addEventListener('click', makeOneCategory);
  }
};

const drawCategory = nameOfCategory => {
  // const title = nameOfCategory.split(' ');
  // const titleStartPart = title.slice(0, title.length - 1).join(' ');
  // const titleEndPart = title.slice(title.length - 1).join();
  // mainTitle.innerHTML = `${titleStartPart}<span class="span-purple"> ${titleEndPart}</span>`;
  allCategoriesBtn.classList.remove('active-categories');
};

async function markup(ev) {
  try {
    if (ev.target.nodeName !== 'BUTTON') {
      return;
    }

    clearSelectedCategories();
    if (ev.target === allCategoriesBtn) {
      allCategoriesBtn.classList.add('active-categories');
      mainTitle.innerHTML = `Best Sellers<span class="span-purple"> Books</span>`;
      await fetchTopBooks();
      return;
    }

    title = ev.target.textContent;
    drawCategory(title);
    ev.target.classList.add('active-categories');
  } catch (error) {
    console.log(error);
  }
}

const clearSelectedCategories = () => {
  for (let i = 0; i < listEl.children.length; i += 1) {
    const category = listEl.children[i];

    category.firstElementChild.classList.remove('active-categories');
  }
};

// async function makeOneCategory(categoryName) {
//   try {
//     const categoryArr = await fetchBooks.getBooksByCategory(
//       categoryName.target.innerHTML
//     );

//     let markupOfCategory = '';

//     categoryArr.forEach(category => {
//       img = category.book_image;
//       markupOfCategory += `
//     <li class="home__item">
//       <ul>
//         <li>
//           <div>
//    <img src="${img ? img : refs.mobCap}" alt="book" />
//           </div>
//           <h2>${category.title}</h2>
//           <span>${category.author}</span>
//         </li>

//       </ul>
//     </li>
//     `;
//     });
//     mainListEl.classList.add('flex-direction');
//     mainListEl.innerHTML = markupOfCategory;
//   } catch (error) {
//     console.log(error);
//   }
// }
