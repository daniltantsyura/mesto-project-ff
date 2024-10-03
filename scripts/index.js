// @todo: Темплейт карточки

const templateElement = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placeListElement = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (cardObject) {
    const cardContainer = templateElement.querySelector('.card').cloneNode(true);
    const cardImageElement = cardContainer.querySelector('.card__image');
    const cardTitleElement = cardContainer.querySelector('.card__title');
    const cardRemoveButton = cardContainer.querySelector('.card__delete-button');

    cardImageElement.src = cardObject.link;
    cardImageElement.alt = cardObject.name;
    cardTitleElement.textContent = cardObject.name;
    cardRemoveButton.addEventListener('click', removeCard);

    return cardContainer;
}

// @todo: Функция удаления карточки

function removeCard (event) {
    event.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (cardObject) {
    placeListElement.append(createCard(cardObject));
});