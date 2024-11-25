"use strict";

const authorizationToken = 'df089792-a67d-41d5-b354-4cd03174c768';

const profileDataPromise = fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
    headers: {
        authorization: authorizationToken
    }
})
    .then(res => res.json())
    .then((result) =>  {
        return result;
    });

const cardsDataPromise = fetch('https://nomoreparties.co/v1/wff-cohort-27/cards', {
    headers: {
        authorization: authorizationToken
    }
})
    .then(res => res.json())
    .then((result) => {
        return result;
    });

export function sendUserData (userName, userAbout) {
    fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
        method: 'PATCH',
        headers: {
            authorization: authorizationToken,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: userName,
            about: userAbout
        })
    });
}

export function sendNewCard (cardName, cardLink) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/cards', {
        method: 'POST',
        headers: {
            authorization: authorizationToken,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
        .then((res) => res.json())
        .then((result) => result);
}

export function deleteCard (card) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/${card.cardObject._id}`, {
        method: "DELETE",
        headers: {
            authorization: authorizationToken
        }
    })
        .then(() => {
            card.event.target.closest('.card').remove();
        });
}

export function likeCard (card) {
    let cardObject = card.cardObject;
    const cardID = cardObject._id;

    cardObject = updateCardObject(cardID)
    // const likeCountElem = card.likeCount;
    // const likeButton = card.event.target; 
    // const isLiked = card.checkLike(cardObject, card.userID);

    // if (isLiked) {
    //     deleteLike(cardID, likeCountElem, likeButton);
    // } else {
    //     sendLike(cardID, likeCountElem, likeButton);
    // }
}

function updateCardObject(cardID) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/${cardID}`, {
        headers: {
            authorization: authorizationToken
        }
    })
        .then((res) => res.json())
        .then((result) => console.log(result));
} 

function sendLike(cardID, likeCountElem, likeButton) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: {
            authorization: authorizationToken
        }
    })
        .then(res => res.json())
        .then((result) => {
            likeButton.classList.add('card__like-button_is-active');
            likeCountElem.textContent = result.likes.length;
        });
}

function deleteLike(cardID, likeCountElem, likeButton) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: {
            authorization: authorizationToken
        }
    })
        .then(res => res.json())
        .then((result) => {
            likeButton.classList.remove('card__like-button_is-active');
            likeCountElem.textContent = result.likes.length;
        });
}

export const apiPromises = [ profileDataPromise, cardsDataPromise ];


