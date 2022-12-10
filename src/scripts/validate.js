export default class Validate {
  constructor(validateSettings, formElement) {
    this._form = formElement;
    this._submit = formElement.querySelector(validateSettings.buttonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(
      validateSettings.inputSelector
    ));
    this._error = validateSettings.errorClass;
    this._buttonDisabled = validateSettings.buttonDisabledClass;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}_error`);
    errorElement.classList.add(this._error);
    errorElement.textContent = errorMessage;
  }
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}_error`);
    errorElement.classList.add(this._error);
    errorElement.textContent = "";
  }
  _validate(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _enableSubmitButton() {
    this._submit.classList.remove(this._buttonDisabled);
    this._submit.disabled = false;
  }

  disableSubmitButton() {
    this._submit.classList.add(this._buttonDisabled);
    this._submit.disabled = true;
  }

  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this._submit.removeAttribute("disabled");
      this._submit.classList.remove(this._buttonDisabled);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._validate(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

// const showInputError = (formElement, inputElement, errorMessage, options) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
//   errorElement.classList.add(options.errorClass);
//   errorElement.textContent = errorMessage;
// };

// const hideInputError = (formElement, inputElement, options) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
//   errorElement.classList.remove(options.errorClass);
//   errorElement.textContent = "";
// };

// const validate = (inputElement, formElement, options) => {
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       options
//     );
//   } else {
//     hideInputError(formElement, inputElement, options);
//   }
// };

// function enableSubmitButton(options, buttonSubmit) {
//   buttonSubmit.classList.remove(options.buttonDisabledClass);
//   buttonSubmit.disabled = false;
// }

// function disableSubmitButton(options, buttonSubmit) {
//   buttonSubmit.classList.add(options.buttonDisabledClass);
//   buttonSubmit.disabled = true;
// }

// function toogleButtonState(inputList, buttonSubmit, options) {
//   if (hasInvalidInput(inputList, options)) {
//     disableSubmitButton(options, buttonSubmit);
//   } else {
//     enableSubmitButton(options, buttonSubmit);
//   }
// }

// const setEventListeners = (formElement, options) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(options.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(options.buttonSelector);
//   toogleButtonState(inputList, buttonElement, options);

//   inputList.forEach((input) => {
//     input.addEventListener("input", () => {
//       validate(input, formElement, options);
//       toogleButtonState(inputList, buttonElement, options);
//     });
//   });
// };

// const enableValidation = (options) => {
//   const formList = Array.from(document.querySelectorAll(options.formSelector));
//   formList.forEach((form) => {
//     form.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(form, options);
//   });
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const vallidateSetting = {
//   errorClass: "todo__error_visibility",
//   buttonDisabledClass: "todo__button_disabled",
//   inputSelector: ".todo__input",
//   buttonSelector: ".todo__button",
//   formSelector: ".todo__form",
// };

// enableValidation(vallidateSetting);
