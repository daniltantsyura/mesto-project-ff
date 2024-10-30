"use strict";

// Node List с попапами

const popups = document.querySelectorAll('.popup');

// Функция открытия попапа

export function openModal (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalByEscape);
}

// Функция закрытия попапа по клику на кнопку закрытия и оверлей

function closeModalByClick (event) {
    let popup = event.currentTarget;
    if (event.target.classList.contains('popup__close') || popup === event.target) {
        closeModal(popup);
    }
}

// Функция закрытия попапа нажатием на Escape

export function closeModalByEscape (event) {
    if (event.key === 'Escape') {
        const currentModal = document.querySelector('.popup_is-opened');
        closeModal(currentModal);
    }
}

// Функция закрытия попапа по клику

export function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalByEscape);
}

// Добавление обработчика закрывающим кнопкам

popups.forEach((popup) => {
    popup.addEventListener('click', closeModalByClick);
});