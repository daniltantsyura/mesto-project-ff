"use strict";

// @todo: Темплейт карточки

export const templateElement = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

export function createCard (cardObject, likeFunc, imageFunc, removeFunc, userID) {
  const cardContainer = templateElement.querySelector('.card').cloneNode(true);
  const cardImageElement = cardContainer.querySelector('.card__image');
  const cardTitleElement = cardContainer.querySelector('.card__title');
  const cardRemoveButton = cardContainer.querySelector('.card__delete-button');
  const cardLike = cardContainer.querySelector('.card__like');
  const likeButton = cardLike.querySelector('.card__like-button');
  const likeCountElem = cardLike.querySelector('.card__like-count');

  disableRemovingOtherCards(cardRemoveButton, userID, cardObject.owner._id);
  setLiked(likeButton, checkLike(cardObject, userID));

  const elems = {
      [cardImageElement.classList[0]]: imageFunc,
      [likeButton.classList[0]]: likeFunc,
      [cardRemoveButton.classList[0]]: removeFunc
  }

  cardImageElement.src = cardObject.link;
  cardImageElement.alt = cardObject.name;
  cardTitleElement.textContent = cardObject.name;
  likeCountElem.textContent = cardObject.likes.length;
  cardContainer.addEventListener('click', (event) => {
      const elem = elems[event.target.classList[0]];
      if (elem) {
        elem({
          'event': event,
          'cardObject': cardObject,
          'likeCount': likeCountElem,
          'isLiked': checkLikedClass(likeButton)
        });
      }
  });

  return cardContainer;
}

function checkLikedClass (likeElem) {
  return likeElem.classList.contains('card__like-button_is-active');
}

function checkLike (cardObject, userID) {
  return cardObject.likes.some((like) => {
    return like._id === userID;
  });
}

function setLiked (likeButton, isLiked) {
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
}

function disableRemovingOtherCards (cardRemoveButton, userID, creatorID) {
  if (creatorID !== userID) {
    cardRemoveButton.remove();
  }
}