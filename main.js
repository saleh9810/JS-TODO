const input = document.getElementById("input");

if(!window.localStorage.getItem("todos")) {
  localStorage.setItem("todos", JSON.stringify([]));

}

let todos = JSON.parse(window.localStorage.getItem("todos"))


// input logic
const addTodo = (event) => {
 
  event.preventDefault();
  let value = input.value;
  if (!value) {
    alert("field blank! Enter a task");
  } else {
    todos.unshift({ value });
    todos.forEach((o, i) => (o.id = i + 1));
    input.value = "";
    localStorage.setItem("todos", JSON.stringify(todos));

    showTodo();
  }
};

// show Todo

const showTodo = () => {
  const ul = document.getElementById("ul");

  ul.innerHTML = " ";
  todos.map((item) => {
    let completed = item.completed ? "unCompleted" : "Completed";
    let completedIcon = item.completed ? "checked" : "";
    const li = document.createElement("li");
    li.innerHTML = `
    <span> - <span class="${completed}"> ${item.value} </span></span>
         <div class="flex">
         <input class="checkbox" ${completedIcon} onclick="changeStatus(${item.id})" type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
          <button class="remove"  onclick="deleteTodo(${item.id})"  ><i class="fas fa-times"></i> </button>
          </div>`;
    ul.append(li);
  });
};

// delete todo
const deleteTodo = (id) => {
  todos = todos.filter((item) => item.id != id);
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo();
};

// change status

const changeStatus = (id) => {
  let item = todos.find((item) => item.id == id);
  item.completed = !item.completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo();
};

const clearTodos = () => {
  if(confirm("Are you sure you want to clear all the list")) {
    localStorage.setItem("todos", JSON.stringify([]));
    todos = []
    showTodo();
  }
}

showTodo();
