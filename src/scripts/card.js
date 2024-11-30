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

export function removeCard (cardConfig) {
  deleteCard(cardConfig)
    .then(res => {
      cardConfig.event.target.closest('.card').remove();
    });
}

export function likeCard (cardConfig) {
  let cardObject = cardConfig.cardObject;
  const cardID = cardObject._id;
  const isLiked = cardConfig.isLiked;
  const likeCountElem = cardConfig.likeCount;
  const likeElem = cardConfig.event.target;

  if (isLiked) {
    deleteLike(cardID, likeCountElem, likeElem)
      .then((result) => {
        likeElem.classList.remove('card__like-button_is-active');
        likeCountElem.textContent = result.likes.length;
      });
  } else {
    sendLike(cardID, likeCountElem, likeElem)
      .then((result) => {
        likeElem.classList.add('card__like-button_is-active');
        likeCountElem.textContent = result.likes.length;
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