import '../pages/index.css';
import { createCard, removeCard, likeCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { apiPromises, sendUserData, sendNewCard, sendAvatarLink } from './api.js';

// @todo: DOM узлы

const placeListElement = document.querySelector('.places__list');

// Открывающие кнопки

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Элементы попапов

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const popupTypeRemove = document.querySelector('.popup_type_remove');

// Элементы формы добавления карточки

const cardAddForm = document.forms['new-place'];
const placeNameInput = cardAddForm['place-name'];
const linkInput = cardAddForm.link;

// Элементы формы редактирования профиля

const editProfileForm = document.forms['edit-profile'];
const profileFormNameInput = editProfileForm.name;
const profileFormDescriptionInput = editProfileForm.description;

// Элементы формы изменения аватара

const avatarForm = document.forms.avatar;
const avatarLinkInput = avatarForm.link;

// Элемент формы подтверждения удаления карточки

const cardRemovalForm = document.forms.remove;

// Объект с информацией о выбранной для удаления карточке

let currentRemovingCard = {};

// Элементы профиля

const profileContainer = document.querySelector('.profile');
const profileAvatar = profileContainer.querySelector('.profile__image');
const profileInfo = profileContainer.querySelector('.profile__info');
const profileNameElem = profileInfo.querySelector('.profile__title');
const profileDescriptionElem = profileInfo.querySelector('.profile__description');

// Конфиг валидации форм

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Функция открытия попапа добавления карточки

function openAddModal () {
    openModal(popupTypeNewCard);
}

// Функция открытия попапа с картинкой

function openImageModal (event) {
    openModal(popupTypeImage);

    popupImage.src = event.target.src;
    popupCaption.textContent = event.target.alt;
}

// Функция открытия попапа редактирования профиля

function openEditModal () {
    openModal(popupTypeEdit);
    fillEditForm();
}

// Функция открытия попапа изменения аватара

function openAvatarModal () {
    openModal(popupTypeAvatar);
}

// Функция открытия попапа удаления карточки

function openRemoveModal (cardContainer, cardID) {
    openModal(popupTypeRemove);
    currentRemovingCard.cardContainer = cardContainer;
    currentRemovingCard.cardID = cardID;
}

// Функция заполнения формы редактирования профиля

function fillEditForm () {
    profileFormNameInput.value = profileNameElem.textContent;
    profileFormDescriptionInput.value = profileDescriptionElem.textContent; 
    clearValidation(editProfileForm, validationConfig);
}

// Обработчик событий для формы добавления карточек

function addCardByForm (event) {
    event.preventDefault();
    const button = event.target.querySelector('.popup__button');
    button.textContent = 'Сохранение...';

    sendNewCard(placeNameInput.value, linkInput.value)
        .then(cardObject => {
            placeListElement.prepend(createCard(cardObject, likeCard, openImageModal, openRemoveModal, cardObject.owner._id));
            button.textContent = 'Сохранить';
            cardAddForm.reset();
            closeModal(popupTypeNewCard);
        })
        .catch((err) => {
            console.log(err); 
        });

    clearValidation(cardAddForm, validationConfig);
}

// Обработчик событий формы редактирования профиля


function editProfileSubmit (event) {
    event.preventDefault();
    const profileNameText = profileFormNameInput.value;
    const profileDescriptionText = profileFormDescriptionInput.value;
    
    sendUserData(profileNameText, profileDescriptionText)
        .then(res => {
            setProfileText(res.name, res.about);
            closeModal(popupTypeEdit);
        })
        .catch((err) => {
            console.log(err); 
        });
}

// Обработчик событий формы добавления аватара

function changeAvatar (event) {
    event.preventDefault();
    const button = event.target.querySelector('.popup__button');
    button.textContent = 'Сохранение...';

    sendAvatarLink(avatarLinkInput.value)
        .then((res) => {
            setProfileData(res);
            closeModal(popupTypeAvatar);
            avatarForm.reset();
        })
        .catch((err) => {
            console.log(err); 
        })
        .finally(() => {
            button.textContent = 'Сохранить';
        });
}

// Обработчик событий формы подтверждения удаления карточки

function removalSubmit (event) {
    event.preventDefault();
    removeCard(currentRemovingCard.cardContainer, currentRemovingCard.cardID);
    currentRemovingCard = {};
    closeModal(popupTypeRemove);
}

// Функция установки текстовых данных пользователя, отображаемых на странице

function setProfileText (profileName, profileDescription) {
    profileNameElem.textContent = profileName;
    profileDescriptionElem.textContent = profileDescription;
}

// Функция установки данных пользователя на страницу

function setProfileData (profileData) {
    setProfileText(profileData.name, profileData.about);
    profileAvatar.style.backgroundImage = `url(${profileData.avatar})`;
}

// Функция вывода карточек на страницу

function addCards(initialCards, userID) {
    initialCards.forEach(function (cardObject) {
        placeListElement.append(createCard(cardObject, likeCard, openImageModal, openRemoveModal, userID));
    });
}

// Добавление обработчика открывающим кнопкам

editButton.addEventListener('click', openEditModal);

addButton.addEventListener('click', openAddModal);

profileAvatar.addEventListener('click', openAvatarModal);

// Добавление обработчиков событий формам

editProfileForm.addEventListener('submit', editProfileSubmit);
cardAddForm.addEventListener('submit', addCardByForm);
avatarForm.addEventListener('submit', changeAvatar);
cardRemovalForm.addEventListener('submit', removalSubmit);

// Вызов функции включения валидации форм

enableValidation(validationConfig);

// Обработка промиса данных пользователя

Promise.all(apiPromises)
    .then(([profileData, cardsData]) => {
        setProfileData(profileData);
        addCards(cardsData, profileData._id);
    })
    .catch((err) => {
        console.log(err); 
    });
