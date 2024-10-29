"use strict";

// @todo: Темплейт карточки

export const templateElement = document.querySelector('#card-template').content;

// Функция обработчика лайка

export function like (event) {
  event.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки

export function removeCard (event) {
  event.target.closest('.card').remove();
}

// @todo: Функция создания карточки

export function createCard (cardObject, likeFunc, imageFunc, removeFunc) {
  const cardContainer = templateElement.querySelector('.card').cloneNode(true);
  const cardImageElement = cardContainer.querySelector('.card__image');
  const cardTitleElement = cardContainer.querySelector('.card__title');
  const cardRemoveButton = cardContainer.querySelector('.card__delete-button');
  const likeButton = cardContainer.querySelector('.card__like-button');
  // Сравнивать по элементу, а не списку классов не получится из-за того, что элементы likeButton и cardRemoveButton будут равны
  const elems = {
      [cardImageElement.classList[0]]: imageFunc,
      [likeButton.classList[0]]: likeFunc,
      [cardRemoveButton.classList[0]]: removeFunc
  }

  cardImageElement.src = cardObject.link;
  cardImageElement.alt = cardObject.name;
  cardTitleElement.textContent = cardObject.name;
  cardContainer.addEventListener('click', (event) => {
      const elem = elems[event.target.classList[0]];
      if (elem) {
        elem(event);
      }
  });

  return cardContainer;
}