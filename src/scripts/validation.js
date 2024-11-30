"use strict";

export function enableValidation (settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));

    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
        const button = form.querySelector(settings.submitButtonSelector);
        
        inputs.forEach((input) => {
            input.addEventListener('input', (event) => {
                event.preventDefault();
    
                inputValidation(input, settings.inputErrorClass, settings.errorClass);
                buttonValidation(button, inputs, settings.inactiveButtonClass, settings.inputErrorClass);
            });
        });
    });
}

export function clearValidation (profileForm, validationConfig) {
    const inputs = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const button = profileForm.querySelector(validationConfig.submitButtonSelector);

    hideErrors(inputs, validationConfig.errorClass, validationConfig.inputErrorClass);
    disableButton(button, validationConfig.inactiveButtonClass);
}

function inputValidation (input, inputErrorClass, errorClass) {
    const errorElem = getErrorElem(input.id);
    const message = getErrorMessage(input);
    
    if(!input.validity.valid) {
        showError(errorElem, message, errorClass, input, inputErrorClass);
    } else {
        hideError(errorElem, errorClass, input, inputErrorClass);
    }
}

function getErrorElem (inputId) {
    return document.querySelector(`.${inputId}-error`);
}

function getErrorMessage (input) {
    if (input.validity.patternMismatch) {
        return input.dataset.invalidMessage;
    } else {
        return input.validationMessage;
    }
}

function showError (errorElem, message, errorClass, input, inputErrorClass) {
    input.classList.add(inputErrorClass);
    errorElem.classList.add(errorClass);
    errorElem.textContent = message;
}

function hideError (errorElem, errorClass, input, inputErrorClass) {
    input.classList.remove(inputErrorClass);
    errorElem.classList.remove(errorClass);
    errorElem.textContent = '';
}

function hideErrors (inputs, errorClass, inputErrorClass) {
    inputs.forEach((input) => {
        const errorElem = getErrorElem(input.id);

        hideError(errorElem, errorClass, input, inputErrorClass);
    });
}

function buttonValidation (button, inputs, inactiveButtonClass, inputErrorClass) {
    const isValid = isInputsValid(inputs, inputErrorClass);

    if (isValid) {
        enableButton(button, inactiveButtonClass);
    } else {
        disableButton(button, inactiveButtonClass);
    }
}

function enableButton (button, inactiveButtonClass) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
}

function disableButton (button, inactiveButtonClass) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
}

function isInputsValid (inputs, inputErrorClass) {
    return !inputs.some((input) => {
        return input.classList.contains(inputErrorClass);
    });
}

