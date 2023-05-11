const refs = {
  homeItems: document.querySelector('.home__items'),
  homeTitle: document.querySelector('.home__title'),
  mobCap: `<img class="img__cap" width="auto" heigh="auto"
  srcset="
    ./images/png/home/icon.png    1x,
    ./images/png/home/icon@2x.png 2x
  "
  src="./images/png/home/icon.png"
  alt="cap" loading="lazy"
/>`,
};

export { refs };
