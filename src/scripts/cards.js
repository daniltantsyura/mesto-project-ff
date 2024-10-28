import { templateElement } from './index.js';

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Функция обработчика лайка

export function like (event) {
  event.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки

export function removeCard (event) {
  event.target.closest('.card').remove();
}

// @todo: Функция создания карточки

export function createCard (cardObject, likeFunc, imageFunc) {
  const cardContainer = templateElement.querySelector('.card').cloneNode(true);
  const cardImageElement = cardContainer.querySelector('.card__image');
  const cardTitleElement = cardContainer.querySelector('.card__title');
  const cardRemoveButton = cardContainer.querySelector('.card__delete-button');
  const likeButton = cardContainer.querySelector('.card__like-button');

  cardImageElement.src = cardObject.link;
  cardImageElement.alt = cardObject.name;
  cardTitleElement.textContent = cardObject.name;
  cardContainer.addEventListener('click', (event) => {
      const elems = {
          [cardImageElement.classList]: imageFunc,
          [likeButton.classList]: likeFunc,
          [cardRemoveButton.classList]: removeCard
      }
      const elem = elems[event.target.classList];
      if (elem) {
        elems[event.target.classList](event);
      }
  });

  return cardContainer;
}