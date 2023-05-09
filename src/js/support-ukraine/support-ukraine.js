import { fundArray } from './funds-array';
import Swiper from 'swiper';

const supportListEl = document.querySelector('.support__list');
const btnSwiperEl = document.querySelector('.swiper-button-next');

const renderSupportList = items => {
  const listItems = items
    .map((item, index) => {
      const { title, url, img, img2 } = item;
      const number = (index + 1).toString().padStart(2, '0');
      return `
           <li class="support__list-item swiper-slide">
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="company icon"
                class="support__link"
                href="${url}"
              >
                <img
                  src="${img}"
                  alt="${title}"
                  class="support__logo"
                  srcset="${img} 1x, ${img2} 2x" 
                  width="149"
                  loading="lazy"
                />
              </a>
              <span class="support__number">${number}</span>
            </li>
              `;
    })
    .join('');
  supportListEl.innerHTML = `${listItems}`;
};

renderSupportList(fundArray);

const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  spaceBetween: 19,
  slidesPerView: 'auto',
  rewind: true,

  navigation: {
    nextEl: '.swiper-button-next',
  },

  plugins: {
    scrollContainer: true,
  },
});

swiper.update();

btnSwiperEl.addEventListener('click', () => {
  swiper.slideNext();
});

// const imgSlides = document.querySelectorAll('.support__list-item');
// const sliderBtn = document.querySelector('.support__btn');

// let counter = 0;
// let moveDown = false;

// const verticalSlider = function () {
//   imgSlides.forEach(function (slide) {
//     slide.style.transform = `translateY(-${counter * 100}%)`;
//   });
// };

// sliderBtn.addEventListener('click', function () {
//   if (moveDown) {
//     counter -= 3;
//     if (counter < 0) {
//       counter = 0;
//       moveDown = false;
//       sliderBtn.querySelector('.support__btn-icon').style.transform = '';
//     }
//   } else {
//     counter += 3;
//     if (counter >= imgSlides.length) {
//       counter = imgSlides.length - 1;
//       moveDown = true;
//       sliderBtn.querySelector('.support__btn-icon').style.transform =
//         'rotate(180deg)';
//     }
//   }
//   verticalSlider(renderSupportList);
// });
