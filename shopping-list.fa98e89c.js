!function(){function e(e,n,t,r){Object.defineProperty(e,n,{get:t,set:r,enumerable:!0,configurable:!0})}function n(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in o){var n=o[e];delete o[e];var t={id:e,exports:{}};return r[e]=t,n.call(t.exports,t,t.exports),t.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},t.parcelRequired7c6=i),i.register("iE7OH",(function(n,t){var r,o;e(n.exports,"register",(function(){return r}),(function(e){return r=e})),e(n.exports,"resolve",(function(){return o}),(function(e){return o=e}));var i={};r=function(e){for(var n=Object.keys(e),t=0;t<n.length;t++)i[n[t]]=e[n[t]]},o=function(e){var n=i[e];if(null==n)throw new Error("Could not resolve bundle with id "+e);return n}})),i.register("aNJCr",(function(n,t){var r;e(n.exports,"getBundleURL",(function(){return r}),(function(e){return r=e}));var o={};function i(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(e){var n=o[e];return n||(n=function(){try{throw new Error}catch(n){var e=(""+n.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return i(e[2])}return"/"}(),o[e]=n),n}})),i("iE7OH").register(JSON.parse('{"eMUNn":"shopping-list.fa98e89c.js","eI5Nn":"amazon.b8fa90cb.png","cM0OA":"amazon@2x.edefe29e.png","d752U":"book.5a9f17e3.png","lubPl":"book@2x.54474d7d.png","lEgPn":"book-shop.91914384.png","lS2x3":"book-shop@2x.fbbde057.png","dTCDb":"books.4abada78.png","6scPy":"books@2x.434ca15d.png","jJagq":"basket.d8f64c6c.png","gwSB5":"basket@2x.ee4d598c.png","7nZsR":"shopping-list.c720e7c7.js","8EQcy":"shopping-list.af841197.css"}')),i("bWgPh"),i("j8hkN");var s={};s=i("aNJCr").getBundleURL("eMUNn")+i("iE7OH").resolve("eI5Nn");var a={};a=i("aNJCr").getBundleURL("eMUNn")+i("iE7OH").resolve("cM0OA");var l={};l=i("aNJCr").getBundleURL("eMUNn")+i("iE7OH").resolve("d752U");var c={};c=i("aNJCr").getBundleURL("eMUNn")+i("iE7OH").resolve("lubPl");var u={};u=i("aNJCr").getBundleURL("eMUNn")+i("iE7OH").resolve("lEgPn");var d={};d=i("aNJCr").getBundleURL("eMUNn")+i("iE7OH").resolve("lS2x3");var f={};f=i("aNJCr").getBundleURL("eMUNn")+i("iE7OH").resolve("dTCDb");var p={};p=i("aNJCr").getBundleURL("eMUNn")+i("iE7OH").resolve("6scPy");var g={};g=i("aNJCr").getBundleURL("eMUNn")+i("iE7OH").resolve("jJagq");var b={};b=i("aNJCr").getBundleURL("eMUNn")+i("iE7OH").resolve("gwSB5");const v=document.querySelector(".gallery"),H=document.querySelector(".shopping-list-empty"),_=localStorage.getItem("shopping_list");let h=[];function m(e){const n=e.target.closest(".button"),t=h.map((e=>e._id)).indexOf(n.id);h.splice(t,1),E()}function E(){if(removeEventListener("click",m),h.length){const e=h.map((e=>k(e))).join("");v.innerHTML=e,document.querySelectorAll(".button").forEach((e=>{e.addEventListener("click",m)}))}else H.innerHTML=`\n    <p>This page is empty, add some books and proceed to order.</p>\n    <img srcset=" ${n(f)} 1x, ${n(p)} 2x" src="${n(f)}" alt="books">\n  `,v.innerHTML=""}function k({book_image:e,title:t,list_name:r,description:o,author:i,_id:f,buy_links:p}){let v="",H="",_="";if(p){const e=p.map((e=>e.name));v=p[e.indexOf("Amazon")].url;H=p[e.indexOf("Apple Books")].url;_=p[e.indexOf("Bookshop")].url}return`\n  <li class="border shopping-list-item">\n    <img src="${e}" alt="${t}" class="book_image">\n    <div class = "book-info">\n        <div>\n            <div class="shopping-list-item-action">\n                <div>\n                    <h3 class = "book-tittle">${t}</h3>\n                    <p class = "list-name">${r}</p>\n                </div>\n                <button id="${f}" class="button">\n                    <img srcset=" ${n(g)} 1x, ${n(b)} 2x"   src="${n(g)}" alt="basket" class = "basket">\n                </button>\n            </div>\n        <div  class="description-info">\n            <p class = "description">${o}</p>\n        </div>\n    </div>\n    <div class="shopping-list-item-buy">\n        <p class = "author">${i}</p>\n        <ul class="list-buy">\n          <li>\n            <a target="_blank" href="${v}">\n              <img srcset="${n(s)} 1x, ${n(a)} 2x" src="${n(s)}" alt="amazon" class="link-amazon">\n            </a>\n          </li>\n          <li>\n            <a target="_blank" href="${H}">\n              <img srcset="${n(l)} 1x, ${n(c)} 2x" src="${n(l)}" alt="applebooks" class="link-applebooks">\n            </a>\n          </li>\n          <li>\n            <a target="_blank" href="${_}">\n              <img srcset="${n(u)} 1x, ${n(d)} 2x" src="${n(u)}" alt="bookshop" class="link-bookshop">\n            </a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </li>\n  `}_&&(h=JSON.parse(_)),E(),k(h),i("hWvCD")}();
//# sourceMappingURL=shopping-list.fa98e89c.js.map
