const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
  errorElement.classList.add(options.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
};

const validate = (inputElement, formElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

function enableSubmitButton(options, buttonSubmit) {
  buttonSubmit.classList.remove(options.buttonDisabledClass);
  buttonSubmit.disabled = false;
}

function disableSubmitButton(options, buttonSubmit) {
  buttonSubmit.classList.add(options.buttonDisabledClass);
  buttonSubmit.disabled = true;
}

function toogleButtonState(inputList, buttonSubmit, options) {
  if (hasInvalidInput(inputList, options)) {
    disableSubmitButton(options, buttonSubmit);
  } else {
    enableSubmitButton(options, buttonSubmit);
  }
}

const setEventListeners = (formElement, options) => {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.buttonSelector);
  toogleButtonState(inputList, buttonElement, options);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      validate(input, formElement, options);
      toogleButtonState(inputList, buttonElement, options);
    });
  });
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, options);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const vallidateSetting = {
  errorClass: "todo__error_visibility",
  buttonDisabledClass: "todo__button_disabled",
  inputSelector: ".todo__input",
  buttonSelector: ".todo__button",
  formSelector: ".todo__form",
};
//
//
enableValidation(vallidateSetting);
