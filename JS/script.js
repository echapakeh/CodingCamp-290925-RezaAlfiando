const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const taskList = document.getElementById("taskList");

let todos = [];

function renderTodos(data = todos) {
  taskList.innerHTML = "";
  if (data.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-gray-500">No task found</td></tr>`;
    return;
  }

  data.forEach((todo, index) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-700";
    row.innerHTML = `
      <td class="py-2">${todo.task}</td>
      <td class="py-2">${todo.date}</td>
      <td class="py-2">
        <span class="px-2 py-1 rounded-lg text-xs ${todo.done ? "bg-green-600 text-white" : "bg-yellow-500 text-white"}">
          ${todo.done ? "Done" : "Pending"}
        </span>
      </td>
      <td class="py-2 flex gap-2">
        <button onclick="toggleStatus(${index})" class="px-2 py-1 bg-blue-600 rounded-lg text-white hover:bg-blue-700 text-xs">Toggle</button>
        <button onclick="deleteTodo(${index})" class="px-2 py-1 bg-red-600 rounded-lg text-white hover:bg-red-700 text-xs">Delete</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}

function addTodo() {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert("Please fill task and date!");
    return;
  }

  todos.push({ task, date, done: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
}

function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function deleteAll() {
  todos = [];
  renderTodos();
}

function filterTodos() {
  const pending = todos.filter(todo => !todo.done);
  renderTodos(pending);
}

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", filterTodos);

renderTodos();
