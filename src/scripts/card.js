"use strict";

import { deleteCard, sendLike, deleteLike } from './api.js';

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

  setCardData (cardImageElement, cardTitleElement, likeCountElem, cardObject.link, cardObject.name, cardObject.likes);
  disableRemovingOtherCards(cardRemoveButton, userID, cardObject.owner._id);
  setLiked(likeButton, checkLike(cardObject, userID));

  likeButton.addEventListener('click', (event) => {
    likeFunc(event, cardObject, likeCountElem, checkLikedClass(likeButton));
  });

  cardImageElement.addEventListener('click', imageFunc);

  cardRemoveButton.addEventListener('click', () => {
    removeFunc(cardContainer, cardObject._id);
  });

  return cardContainer;
}

function setCardData (imageElem, titleElem, likeCountElem, link, name, likes) {
  imageElem.src = link;
  imageElem.alt = name;
  titleElem.textContent = name;
  likeCountElem.textContent = likes.length;
}

export function removeCard (cardElem, cardID) {
  deleteCard(cardID)
    .then(res => {
      cardElem.closest('.card').remove();
    })
    .catch((err) => {
      console.log(err); 
    });
}

export function likeCard (event, cardObject, likeCountElem, isLiked) {
  const cardID = cardObject._id;
  const likeElem = event.target;

  if (isLiked) {
    deleteLike(cardID, likeCountElem, likeElem)
      .then((result) => {
        likeElem.classList.remove('card__like-button_is-active');
        likeCountElem.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); 
      });
  } else {
    sendLike(cardID, likeCountElem, likeElem)
      .then((result) => {
        likeElem.classList.add('card__like-button_is-active');
        likeCountElem.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); 
      });
  }
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