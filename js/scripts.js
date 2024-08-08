// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput= document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select"); 

let oldInputValue;

//Funções
const saveTodo = (text) => {

    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"> </i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"> </i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"> </i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)

    todoInput.value = "";
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    });
};

const filterTodos = (filter) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        switch (filter) {
            case "all":
                todo.style.display = "flex";
                break;
            case "done":
                if (todo.classList.contains("done")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "todo":
                if (!todo.classList.contains("done")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
};

const searchTodos = (searchTerm) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
        if (todoTitle.includes(searchTerm.toLowerCase())) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
};

//Eventos
todoForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const inputValue = todoInput.value;

    if(inputValue){
        saveTodo(inputValue)
    }
});

document.addEventListener("click", (e) => {

    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }
    
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();

});

searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    searchTodos(searchTerm);
});

filterSelect.addEventListener("change", (e) => {
    const filterValue = e.target.value;
    filterTodos(filterValue);
});

// Arrays com caminhos das imagens para diferentes tamanhos de tela
const mobileBackgrounds = [
    '../img/bg-mobile1.jpg',
    '../img/bg-mobile2.jpg',
    '../img/bg-mobile3.jpg',
    '../img/bg-mobile4.jpg'
];

const desktopBackgrounds = [
    '../img/bg-desktop1.jpg',
    '../img/bg-desktop2.jpg',
    '../img/bg-desktop3.jpg',
    '../img/bg-desktop4.jpg'
];

// Função para escolher uma imagem aleatória do array fornecido
function getRandomBackground(backgrounds) {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[randomIndex];
}

// Função para definir o fundo de acordo com o tamanho da tela
function setBackgroundBasedOnScreenSize() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const backgrounds = isMobile ? mobileBackgrounds : desktopBackgrounds;
    const selectedBackground = getRandomBackground(backgrounds);

    document.body.style.backgroundImage = `url(${selectedBackground})`;
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
}

// Chame a função ao carregar a página
window.onload = setBackgroundBasedOnScreenSize;

// Também atualize o fundo se a tela for redimensionada
window.onresize = setBackgroundBasedOnScreenSize;