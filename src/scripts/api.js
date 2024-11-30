"use strict";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
    headers: {
      authorization: 'df089792-a67d-41d5-b354-4cd03174c768',
      'Content-Type': 'application/json'
    }
  }

const profileDataPromise = fetch(config.baseUrl+'/users/me', {
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(res => {
            return checkResponseStatus(res);
        });

const cardsDataPromise = fetch(config.baseUrl+'/cards', {
    headers: {
        authorization: config.headers.authorization
    }
})
    .then(res => {
        return checkResponseStatus(res);
    });

function checkResponseStatus (res) {
    if (res.ok) {
        return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

export function sendUserData (userName, userAbout) {
    return fetch(config.baseUrl+'/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userName,
            about: userAbout
        })
    })
    .then(res => {
        return checkResponseStatus(res);
    });
}

export function sendNewCard (cardName, cardLink) {
    return fetch(config.baseUrl+'/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
        .then((res) => {
            return checkResponseStatus(res);
        });
}

export function deleteCard (cardID) {
    return fetch(config.baseUrl+`/cards/${cardID}`, {
        method: "DELETE",
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then((res) => {
            return checkResponseStatus(res);
        });
}

export function sendLike(cardID) {
    return fetch(config.baseUrl+`/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(res => {
            return checkResponseStatus(res);
        });
}

export function deleteLike(cardID) {
    return fetch(config.baseUrl+`/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(res => {
            return checkResponseStatus(res);
        });
}

export function sendAvatarLink (link) {
    return fetch(config.baseUrl+'/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
        .then(res => {
            return checkResponseStatus(res);
        });
}

export const apiPromises = [ profileDataPromise, cardsDataPromise ];


