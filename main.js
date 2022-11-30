/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
// constants
var tasks = document.querySelector(".tasks");
var todoForm = document.querySelector(".todo__form");
var todoInput = document.querySelector(".todo__input");
var todoButton = todoForm.querySelector(".todo__button");
var todoSubtitle = document.querySelector(".todo__subtitle");
var headerInput = document.querySelector(".header__input");
var headerForm = document.querySelector(".header__form");
var editItemElement;
var initialItem = [];
initialItem = JSON.parse(localStorage.getItem('initialItem'));
// save data to localStorage
function saveToLocalStorage() {
  localStorage.setItem("initialItem", JSON.stringify(initialItem));
}

// for copy item
function copyItem(evt) {
  var listItemElement = evt.target.closest(".task").cloneNode(true);
  listItemElement.classList.add("task__clone_visible");
  var copyElement = listItemElement.querySelector(".task__copy");
  copyElement.classList.add("task__copy_visible");
  var changeElemnt = listItemElement.querySelector(".task__element-change");
  changeElemnt.classList.add("element__change_no-visible");
  var listItemElementText = listItemElement.querySelector('.task__text').textContent;
  listItemElementText += '(copy)';
  initialItem.push(listItemElementText);
  saveToLocalStorage();
  tasks.append(listItemElement);
}
// delete item
function deleteItem(evt) {
  var currentItem = evt.target.closest(".task");
  var currentItemText = currentItem.querySelector('.task__text').textContent;
  initialItem = initialItem.filter(function (item) {
    return item !== currentItemText;
  });
  localStorage.removeItem('initialItem', JSON.stringify(initialItem));
  saveToLocalStorage();
  currentItem.remove();
}
// edit item
function editItem(evt) {
  var editButton = evt.target.closest(".task");
  var editItemText = editButton.querySelector(".task__text");
  editItemElement = editItemText;
  todoInput.value = editItemText.textContent;
  todoButton.textContent = "Change";
  saveToLocalStorage();
}

// add item
function addItem(e) {
  e.preventDefault();
  var inputValue = todoInput.value;
  if (!editItemElement) renderItem(inputValue);else {
    editItemElement.textContent = todoInput.value;
    todoButton.textContent = "Submit";
  }
  editItemElement = null;
  todoInput.value = null;
  initialItem.push(inputValue);
  saveToLocalStorage();
  disableSubmitButton(vallidateSetting, todoButton);
}
// render item
function renderItem(text) {
  var template = document.querySelector("#template").content;
  var listItem = template.cloneNode(true);
  var textElement = listItem.querySelector(".task__text");
  textElement.textContent = text;
  var deleteButton = listItem.querySelector(".task__button_type_delete");
  var editButton = listItem.querySelector(".task__button_type_change");
  var copyButton = listItem.querySelector(".task__button_type_copy");
  deleteButton.addEventListener("click", deleteItem);
  editButton.addEventListener("click", editItem);
  copyButton.addEventListener("click", copyItem);
  tasks.prepend(listItem);
}
// render item from arr
function renderList(arr) {
  arr.forEach(function (item) {
    renderItem(item);
  });
}
renderList(initialItem);
// filter list
function filterList() {
  var input = headerInput;
  input.addEventListener("keyup", function () {
    var filter = input.value.toUpperCase();
    var filterItems = document.querySelectorAll(".task");
    filterItems.forEach(function (item) {
      if (item.textContent.toUpperCase().indexOf(filter) > -1) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
}
// event listener
headerForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  filterList();
});
todoForm.addEventListener("submit", addItem);
/******/ })()
;
//# sourceMappingURL=main.js.map