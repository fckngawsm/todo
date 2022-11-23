const tasks = document.querySelector(".tasks");
const todoForm = document.querySelector(".todo__form");
const todoInput = document.querySelector(".todo__input");
const todoButton = todoForm.querySelector(".todo-button__submit");
let editItemElement = null;
const initialItem = [
  "push project",
  "create new app",
  "find job",
  "go to walk",
];
function deleteItem(evt) {
  evt.target.closest(".task").remove();
  console.log(evt.target);
}
function editItem(evt) {
  let editButton = evt.target.closest(".task");
  let editItemText = editButton.querySelector(".task__text");
  editItemElement = editItemText;
  todoInput.value = editItemText.textContent;
  todoButton.textContent = "Change";
}
function renderItem(text) {
  const template = document.querySelector("#template").content;
  const listItem = template.cloneNode(true);
  const textElement = listItem.querySelector(".task__text");
  textElement.textContent = text;
  const deleteButton = listItem.querySelector(".task__button_type_delete");
  const editButton = listItem.querySelector(".task__button_type_change");
  deleteButton.addEventListener("click", deleteItem);
  editButton.addEventListener("click", editItem);
  tasks.prepend(listItem);
}

function renderList(arr) {
  arr.forEach((item) => renderItem(item));
}

function addItem(e) {
  e.preventDefault();
  let inputValue = todoInput.value;
  if (inputValue && inputValue.trim(" ") === "") {
    alert("wrong or empty input");
    return;
  }
  if (!editItemElement) renderItem(inputValue);
  else {
    editItemElement.textContent = todoInput.value;
    todoButton.textContent = "Submit";
    console.log(editItemElement.textContent)
  }
  todoInput.value = null;
}
renderList(initialItem);

todoForm.addEventListener("submit", addItem);
