const addForm = document.querySelector(".add");
const inputField = document.querySelector(".search input");
const todoList = document.querySelector(".list-group.todos");

addForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const newTodo = addForm.add.value.trim(); 

    if (newTodo !== "") {
        todoList.insertAdjacentHTML("beforeend", 
            `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${newTodo}</span>
                <i class="far fa-trash-alt delete"></i>
            </li>`
        );
        addForm.add.value = "";
    }
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains("delete")) {
        const removeTodo = e.target.closest('li');
        if (removeTodo) {
            removeTodo.remove();
        }
    }
});

let removedTodos = [];

inputField.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase(); 

    removedTodos = removedTodos.filter(todo => {
        const todoText = todo.querySelector("span").textContent.toLowerCase();
        if (todoText.startsWith(searchValue)) {
            todoList.appendChild(todo); 
            return false;
        }
        return true;
    });
  
    const todos = Array.from(todoList.querySelectorAll("li"));
    todos.forEach(todo => {
        const todoText = todo.querySelector("span").textContent.toLowerCase();
        if (!todoText.startsWith(searchValue)) {
            if (!removedTodos.includes(todo)) {
                removedTodos.push(todo);
            }
            todo.remove();
        }
    });
});
