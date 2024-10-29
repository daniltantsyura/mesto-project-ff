import '../pages/index.css';
import { like, createCard, removeCard } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';

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

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

// Функция открытия попапа добавления карточки

function openAddModal () {
    openModal(popupTypeNewCard);
}

// Функция открытия попапа с картинкой

function openImageModal (event) {
    openModal(popupTypeImage);
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');

    popupImage.src = event.target.src;
    popupCaption.textContent = event.target.alt;
}

// Функция открытия попапа редактирования профиля

function openEditModal () {
    openModal(popupTypeEdit);
    fillEditForm();
}

// Функция заполнения формы редактирования профиля

function fillEditForm () {
    profileFormNameInput.value = profileName.textContent;
    profileFormDescriptionInput.value = profileDescription.textContent; 
}

// Обработчик событий для формы добавления карточек

function addCardByForm (event) {
    event.preventDefault();

    placeListElement.prepend(createCard({name: placeNameInput.value, link: linkInput.value}, like, openImageModal, removeCard));

    cardAddForm.reset();
    closeModal(popupTypeNewCard);
}

// Обработчик событий формы редактирования профиля


function editProfileSubmit (event) {
    event.preventDefault();
    
    profileName.textContent = profileFormNameInput.value;
    profileDescription.textContent = profileFormDescriptionInput.value;

    closeModal(popupTypeEdit);
}

// Добавление обработчика открывающим кнопкам

editButton.addEventListener('click', openEditModal);

addButton.addEventListener('click', openAddModal);

// Добавление обработчиков событий формам

editProfileForm.addEventListener('submit', editProfileSubmit);
cardAddForm.addEventListener('submit', addCardByForm);

// @todo: Вывести карточки на страницу

initialCards.forEach(function (cardObject) {
    placeListElement.append(createCard(cardObject, like, openImageModal, removeCard));
});