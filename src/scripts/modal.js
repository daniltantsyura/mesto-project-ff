"use strict";

import { 
    popupTypeNewCard, 
    openEditModal,
    openImageModal
} from './index.js';

// Node List с попапами

export const popups = document.querySelectorAll('.popup');

// Открывающие кнопки

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Функция добавления модификатора _is-open

export function addOpenClass (popup) {
    popup.classList.add('popup_is-opened');
}

// Функция открытия попапа

export function openModal (event) {
    const type = event.target.classList[0];
    const types = {
        'profile__edit-button' : openEditModal,
        'profile__add-button' : openAddModal,
        'card__image' : openImageModal 
    }

    types[type](event);
    document.addEventListener('keydown', closeModalByEscape);
}

// Функция открытия попапа добавления карточки

function openAddModal () {
    addOpenClass(popupTypeNewCard);
}

// Функция закрытия попапа по клику на кнопку закрытия и оверлей

function closeModalByClick (event) {
    if (event.target.classList.contains('popup__close') || event.currentTarget === event.target) {
        closeModal();
    }
}

// Функция закрытия попапа нажатием на Escape

export function closeModalByEscape (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

// Функция закрытия попапа по клику

export function closeModal () {
    const currentModal = document.querySelector('.popup_is-opened');
    
    currentModal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalByEscape);
}

// Добавление обработчика открывающим кнопкам

editButton.addEventListener('click', openModal);

addButton.addEventListener('click', openModal);

// Добавление обработчика закрывающим кнопкам

popups.forEach((popup) => {
    popup.addEventListener('click', closeModalByClick);
});