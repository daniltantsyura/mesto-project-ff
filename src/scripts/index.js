import '../pages/index.css';
import { initialCards, like, createCard } from './cards.js';
import { openModal, addOpenClass, closeModalByEscape, closeModal } from './modal.js';

// @todo: Темплейт карточки

export const templateElement = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placeListElement = document.querySelector('.places__list');

// Элементы попапов

const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
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

// Функция открытия попапа редактирования профиля

export function openEditModal () {
    addOpenClass(popupTypeEdit);
    fillEditForm();
}

// Функция открытия попапа с картинкой

export function openImageModal (event) {
    addOpenClass(popupTypeImage);
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');

    popupImage.src = event.target.src;
    popupCaption.textContent = event.target.alt;
    document.addEventListener('keydown', closeModalByEscape);
}

// Функция заполнения формы редактирования профиля

function fillEditForm () {
    profileFormNameInput.value = profileName.textContent;
    profileFormDescriptionInput.value = profileDescription.textContent; 
}

// Функция очистки формы

function clearForm () {
    placeNameInput.value = '';
    linkInput.value = '';
}

// Обработчик событий для формы добавления карточек

function addCardByForm (event) {
    event.preventDefault();

    placeListElement.prepend(createCard({name: placeNameInput.value, link: linkInput.value}, like, openModal));

    clearForm();
    closeModal();
}

// Обработчик событий формы редактирования профиля


function handleFormSubmit (event) {
    event.preventDefault();
    
    profileName.textContent = profileFormNameInput.value;
    profileDescription.textContent = profileFormDescriptionInput.value;

    closeModal();
}

// Добавление обработчиков событий формам

editProfileForm.addEventListener('submit', handleFormSubmit);
cardAddForm.addEventListener('submit', addCardByForm);

// @todo: Вывести карточки на страницу

initialCards.forEach(function (cardObject) {
    placeListElement.append(createCard(cardObject, like, openModal));
});