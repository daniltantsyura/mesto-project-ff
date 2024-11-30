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
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) =>  {
            return result;
        })
        .catch((err) => {
            console.log(err); 
        });

const cardsDataPromise = fetch(config.baseUrl+'/cards', {
    headers: {
        authorization: config.headers.authorization
    }
})
    .then(res => {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err); 
    });

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
        if (res.ok) {
            return res.json();
        }
    })
    .catch((err) => {
        console.log(err); 
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
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); 
        });;
}

export function deleteCard (cardConfig) {
    return fetch(config.baseUrl+`/cards/${cardConfig.cardObject._id}`, {
        method: "DELETE",
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); 
        });
}

export function sendLike(cardID, likeCountElem, likeButton) {
    return fetch(config.baseUrl+`/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); 
        });
}

export function deleteLike(cardID, likeCountElem, likeButton) {
    return fetch(config.baseUrl+`/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); 
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
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); 
        });
}

export const apiPromises = [ profileDataPromise, cardsDataPromise ];


