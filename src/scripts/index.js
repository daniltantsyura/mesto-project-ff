import '../pages/index.css';
import { createCard} from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { apiPromises, sendUserData, sendNewCard, deleteCard, likeCard } from './api.js';

// @todo: DOM узлы

const placeListElement = document.querySelector('.places__list');

// Открывающие кнопки

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Элементы попапов

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

// Элементы формы добавления карточки

const cardAddForm = document.forms['new-place'];
const placeNameInput = cardAddForm['place-name'];
const linkInput = cardAddForm.link;

// Элементы формы редактирования профиля

const editProfileForm = document.forms['edit-profile'];
const profileFormNameInput = editProfileForm.name;
const profileFormDescriptionInput = editProfileForm.description;

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

function openImageModal (card) {
    openModal(popupTypeImage);
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');

    popupImage.src = card.event.target.src;
    popupCaption.textContent = card.event.target.alt;
}

// Функция открытия попапа редактирования профиля

function openEditModal () {
    openModal(popupTypeEdit);
    fillEditForm();
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

    sendNewCard(placeNameInput.value, linkInput.value)
        .then(cardObject => {
            placeListElement.prepend(createCard(cardObject, likeCard, openImageModal, deleteCard));
        });

    cardAddForm.reset();
    clearValidation(cardAddForm, validationConfig);
    closeModal(popupTypeNewCard);
}

// Обработчик событий формы редактирования профиля


function editProfileSubmit (event) {
    event.preventDefault();
    const profileNameText = profileFormNameInput.value;
    const profileDescriptionText = profileFormDescriptionInput.value;
    
    setProfileText(profileNameText, profileDescriptionText);
    sendUserData(profileNameText, profileDescriptionText);

    closeModal(popupTypeEdit);
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
        placeListElement.append(createCard(cardObject, likeCard, openImageModal, deleteCard, userID));
    });
}

// Добавление обработчика открывающим кнопкам

editButton.addEventListener('click', openEditModal);

addButton.addEventListener('click', openAddModal);

// Добавление обработчиков событий формам

editProfileForm.addEventListener('submit', editProfileSubmit);
cardAddForm.addEventListener('submit', addCardByForm);

// Вызов функции включения валидации форм

enableValidation(validationConfig);

// Обработка промиса данных пользователя

Promise.all(apiPromises)
    .then((res) => {
        const profileData = res[0];
        const cardsData = res[1];
        console.log(profileData);
        setProfileData(profileData);
        addCards(cardsData, profileData._id);
    });
