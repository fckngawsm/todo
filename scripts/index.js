// constants
const tasks = document.querySelector(".tasks");
const todoForm = document.querySelector(".todo__form");
const todoInput = document.querySelector(".todo__input");
const todoButton = todoForm.querySelector(".todo__button");
const todoSubtitle = document.querySelector(".todo__subtitle");

const headerInput = document.querySelector(".header__input");
const headerForm = document.querySelector(".header__form");

let editItemElement;
let initialItem = [];
initialItem = JSON.parse(localStorage.getItem('initialItem'))
// save data to localStorage
function saveToLocalStorage() {
  localStorage.setItem("initialItem", JSON.stringify(initialItem));
}

// for copy item
function copyItem(evt) {
  let listItemElement = evt.target.closest(".task").cloneNode(true);
  listItemElement.classList.add("task__clone_visible");
  let copyElement = listItemElement.querySelector(".task__copy");
  copyElement.classList.add("task__copy_visible");
  let changeElemnt = listItemElement.querySelector(".task__element-change");
  changeElemnt.classList.add("element__change_no-visible");
  let listItemElementText = listItemElement.querySelector('.task__text').textContent
  listItemElementText += '(copy)'
  initialItem.push(listItemElementText)
  saveToLocalStorage()
  tasks.append(listItemElement);
}
// delete item
function deleteItem(evt) {
  let currentItem = evt.target.closest(".task");
  let currentItemText = currentItem.querySelector('.task__text').textContent;
  initialItem = initialItem.filter((item) => item !== currentItemText);
  localStorage.removeItem('initialItem' , JSON.stringify(initialItem))
  saveToLocalStorage();
  currentItem.remove();
}
// edit item
function editItem(evt) {
  let editButton = evt.target.closest(".task");
  let editItemText = editButton.querySelector(".task__text");
  editItemElement = editItemText;
  todoInput.value = editItemText.textContent;
  todoButton.textContent = "Change";
  saveToLocalStorage();
}

// add item
function addItem(e) {
  e.preventDefault();
  let inputValue = todoInput.value;
  if (!editItemElement) renderItem(inputValue);
  else {
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
  const template = document.querySelector("#template").content;
  const listItem = template.cloneNode(true);
  const textElement = listItem.querySelector(".task__text");
  textElement.textContent = text;
  const deleteButton = listItem.querySelector(".task__button_type_delete");
  const editButton = listItem.querySelector(".task__button_type_change");
  const copyButton = listItem.querySelector(".task__button_type_copy");
  deleteButton.addEventListener("click", deleteItem);
  editButton.addEventListener("click", editItem);
  copyButton.addEventListener("click", copyItem);
  tasks.prepend(listItem);
}
// render item from arr
function renderList(arr) {
  arr.forEach((item) => {
    renderItem(item);
  });
}
renderList(initialItem);
// filter list
function filterList() {
  let input = headerInput;
  input.addEventListener("keyup", function () {
    let filter = input.value.toUpperCase();
    let filterItems = document.querySelectorAll(".task");
    filterItems.forEach((item) => {
      if (item.textContent.toUpperCase().indexOf(filter) > -1) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
}
// event listener
headerForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  filterList();
});
todoForm.addEventListener("submit", addItem);
