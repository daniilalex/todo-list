const form = document.querySelector(".js-form");
const list = document.querySelector(".js-todo-list");

let todoList = [];

const addTodo = (text) => {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };
  console.log(todoList);
  todoList.push(todo);
  renderTodo(todo);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector(".js-input");
  const task = input.value.trim();
  if (task != "") {
    addTodo(task);
    input.value = "";
    input.focus();
  }
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-delete")) {
    const itemKey = e.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
  if (e.target.classList.contains("js-tick")) {
    const itemKey = e.target.parentElement.dataset.key;
    toggleCheckBox(itemKey);
  }
});

const toggleCheckBox = (key) => {
  const index = todoList.findIndex((el) => el.id === Number(key));
  todoList[index].checked = !todoList[index].checked;
  renderTodo(todoList[index]);
};

const deleteTodo = (key) => {
  const index = todoList.findIndex((el) => el.id === Number(key));
  const todo = {
    deleted: true,
    ...todoList[index],
  };
  todoList.filter((el) => el.id != Number(key));
  renderTodo(todo);
};

const renderTodo = (todo) => {
  localStorage.setItem("todoRef", JSON.stringify(todoList));
  const node = document.createElement("li");
  const item = document.querySelector(`[data-key="${todo.id}"]`);
  const isCheked = todo.checked ? "done" : "";
  console.log(item);

  if (todo.deleted) {
    item.remove();
    return;
  }

  node.setAttribute("data-key", todo.id);
  node.setAttribute("class", `todo-item ${isCheked}`);

  node.innerHTML = `
  <input type = "checkbox" id = "${todo.id}"/>
  <label for = "${todo.id}" class = "tick js-tick""></label>
<span>${todo.text}</span>
<button class = "js-delete btn-43">remove</button>
`;
  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
};
window.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("todoRef");
  if (ref) {
    todoList = JSON.parse(ref);
    todoList.forEach((task) => {
      renderTodo(task);
    });
  }
});
