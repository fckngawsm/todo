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
function copyItem(evt){
  let listItemElement = evt.target.closest(".task").cloneNode(true);
  listItemElement.classList.add('task__clone_visible');
  let copyElement = listItemElement.querySelector('.task__copy');
  copyElement.classList.add('task__copy_visible');
  let changeElemnt = listItemElement.querySelector('.task__element-change');
  changeElemnt.classList.add('element__change_no-visible')
  tasks.append(listItemElement);
  console.log(listItemElement);
  console.log(copyElement)
}
function deleteItem(evt) {
  evt.target.closest(".task").remove();
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
  const copyButton = listItem.querySelector(".task__button_type_copy");
  deleteButton.addEventListener("click", deleteItem);
  editButton.addEventListener("click", editItem);
  copyButton.addEventListener("click", copyItem);
  tasks.prepend(listItem);
}

function renderList(arr) {
  arr.forEach((item) => renderItem(item));
}

function addItem(e) {
  e.preventDefault();
  let inputValue = todoInput.value;
  if (!editItemElement) renderItem(inputValue);
  else {
    editItemElement.textContent = todoInput.value;
    todoButton.textContent = "Submit";
    console.log(editItemElement.textContent);
  }
  todoInput.value = null;
}
renderList(initialItem);

todoForm.addEventListener("submit", addItem);
todoButtonReset.addEventListener("click" , deleteAllItems)
