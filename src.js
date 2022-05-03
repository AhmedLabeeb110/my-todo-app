//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  //Test function
  console.log("hello");
  //Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Add Todo to local storage
  saveLocalTodos(todoInput.value);
  //Check Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Append to List
  todoList.appendChild(todoDiv);
  //Clear todo input value
  todoInput.value = "";
}
// pass e/event and target as return to check which values are being returned by default
// function deleteCheck(e){
//   console.log(target)
// }

//Delete Function
function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Simple delete function, removed for adding transition effects
    //todo.remove();

    //Animation/Transition
    todo.classList.add("fall");
    //Remove tod from Local Storage
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check Mark Function
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//Filter Function
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

//Saving input in local storage
function saveLocalTodos(todo) {
  //CHECK --- Hey, do I already have things in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}