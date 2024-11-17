(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,n,r){return(n=function(t){var n=function(t){if("object"!=e(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=e(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(n)?n:n+""}(n))in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}var n=document.querySelector("#card-template").content;function r(e){e.target.classList.toggle("card__like-button_is-active")}function o(e){e.target.closest(".card").remove()}function c(e,r,o,c){var i=n.querySelector(".card").cloneNode(!0),a=i.querySelector(".card__image"),u=i.querySelector(".card__title"),s=i.querySelector(".card__delete-button"),l=i.querySelector(".card__like-button"),p=t(t(t({},a.classList[0],o),l.classList[0],r),s.classList[0],c);return a.src=e.link,a.alt=e.name,u.textContent=e.name,i.addEventListener("click",(function(e){var t=p[e.target.classList[0]];t&&t(e)})),i}function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function a(e){var t=e.currentTarget;(e.target.classList.contains("popup__close")||t===e.target)&&s(t)}function u(e){"Escape"===e.key&&s(document.querySelector(".popup_is-opened"))}function s(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",a)}));var l=document.querySelector(".places__list"),p=document.querySelector(".profile__edit-button"),d=document.querySelector(".profile__add-button"),m=document.querySelector(".popup_type_edit"),f=document.querySelector(".popup_type_new-card"),y=document.querySelector(".popup_type_image"),v=document.forms["new-place"],_=v["place-name"],S=v.link,b=document.forms["edit-profile"],k=b.name,g=b.description,q=document.querySelector(".profile__info"),L=q.querySelector(".profile__title"),h=q.querySelector(".profile__description");function x(e){i(y);var t=y.querySelector(".popup__image"),n=y.querySelector(".popup__caption");t.src=e.target.src,n.textContent=e.target.alt}p.addEventListener("click",(function(){i(m),k.value=L.textContent,g.value=h.textContent})),d.addEventListener("click",(function(){i(f)})),b.addEventListener("submit",(function(e){e.preventDefault(),L.textContent=k.value,h.textContent=g.value,s(m)})),v.addEventListener("submit",(function(e){e.preventDefault(),l.prepend(c({name:_.value,link:S.value},r,x,o)),v.reset(),s(f)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){l.append(c(e,r,x,o))}))})();