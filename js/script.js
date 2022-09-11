const form = document.querySelector(".js-form");
const list = document.querySelector(".js-todo-list");

let todoList = [];

const addTodo = (text) => {
  const todo = {
    text,
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
});

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
  const node = document.createElement("li");
  const item = document.querySelector(`[data-key="${todo.id}"]`);
  console.log(item);

  if (todo.deleted) {
    item.remove();
    return;
  }

  node.setAttribute("data-key", todo.id);

  node.innerHTML = `
<span>${todo.text}</span>
<button class = "js-delete">remove</button>
`;
  list.append(node);
};
