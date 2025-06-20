
import { format, parseISO, addDays, subDays, formatISO } from 'date-fns';

export const DOM = {
    sidebar: document.querySelector(".sidebar"),
    newProject: document.querySelector(".project-card"),
    contentBlur: document.querySelector(".blur-background"),
    newProjectBtn: document.querySelector(".add-new-project"),
    newProjectExit: document.querySelector(".new-project-exit-btn"),
    newProjectSubmit: document.querySelector(".new-project-submit"),
    projectList: document.querySelector(".project-list"),
    todos: document.querySelector(".todos-list"),
    addTodoBtn: document.querySelector(".add-todo-btn"),
    newTodoCard: document.querySelector(".todo-card"),
    projectTitle: document.querySelectorAll(".current-project-title"),
    newTodoExitBtn: document.querySelector(".new-todo-exit-btn"),
    newTodoSubmitBtn: document.querySelector(".new-todo-submit-btn"),
    editSaveBtn: document.querySelector(".edit-save-btn"),
};


export function showElement(...elements) {
    elements.forEach(element => {
        element.classList.remove("hide");
        element.classList.add("show");
    })
}

export function closeElement(...elements) {
    elements.forEach(element => {
        element.classList.remove("show");
        element.classList.add("hide");
    })
}

export function setActiveProjectTitle(title, color) {
    DOM.projectTitle.forEach(element => {
        element.textContent = title;
        element.style.color = color;
    });
}

export function getNewProjectData() {
    const id = crypto.randomUUID();
    const title = document.querySelector("#project-title");
    const color = document.querySelector("#project-color");
    return {
        title: title.value || "untitled",
        id: id,
        color: color.value || "#000", // Default color if not set
    };
}

export function getNewTodoData() {
    const id = crypto.randomUUID();
    const title = document.querySelector("#new-todo-title");
    const description = document.querySelector("#new-todo-description");
    const dueDate = document.querySelector("#dueDate");
    const parseDate = parseISO(dueDate.value);
    const formattedDate = format(parseDate, 'MMMM d, yyyy');

    const todoData = {
        title: title.value || "title",
        description: description.value || "description",
        dueDate: formattedDate,
        id: id,

    }

    title.value = '';
    description.value = '';
    dueDate.value = formatISO(new Date(), { representation: 'date' });

    return todoData;
}

//Adds single project to DOM
export function addNewProjectToDOM(data) {
    const newProjectContainer = document.createElement("div");
    newProjectContainer.dataset.id = data.id;
    newProjectContainer.classList.add("project-container");

    const newProjectTitle = document.createElement("button");
    newProjectTitle.classList.add("project");
    newProjectTitle.textContent = data.title;
    newProjectTitle.style.color = data.color;

    if (data.title === "") data.title = "untitled";

    newProjectContainer.appendChild(newProjectTitle);
    DOM.projectList.appendChild(newProjectContainer);
    closeElement(DOM.contentBlur, DOM.newProject);
}


function clearProjectList() {
    DOM.projectList.innerHTML = ""; // Clear existing project list
}

//Adds all projects to DOM
export function renderProjects(projects) {
    clearProjectList();
    if (!projects || projects.length === 0) {
        console.warn("No projects to render.");
        return;
    }
    projects.forEach(project => {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        projectContainer.dataset.id = project.id;

        const projectTitle = document.createElement("button");
        projectTitle.classList.add("project");
        projectTitle.textContent = project.title;
        projectTitle.style.color = project.color || "#000"; // Default color if not set

        projectContainer.appendChild(projectTitle);
        DOM.projectList.appendChild(projectContainer);
    });
}

export function clearTodos() {
    DOM.todos.innerHTML = '' // Clear all todos
}



export function renderTodos(project) {

    if (!project || project.getTodos().length === 0) {
        console.warn("No todos to render.");
        return;
    }
    clearTodos();
    project.getTodos().forEach(todo => {
        addTodoToDOM(todo);
    })
}

export function removeTodoFromUI(todo) {
    todo.remove();
}


export function addTodoToDOM(newTodo) {
    const elements = {
        todosList: document.querySelector(".todos-list"),
        todo: document.createElement("div"),
        todoLeft: document.createElement("div"),
        checkBox: document.createElement("input"),
        todoTexts: document.createElement("div"),
        title: document.createElement("p"),
        description: document.createElement("p"),
        todoRight: document.createElement("div"),
        dueDate: document.createElement("p"),
        editBtn: document.createElement("button"),
        removeBtn: document.createElement("button"),

    }

    elements.checkBox.checked = newTodo.completed ? true : false;
    elements.title.classList[newTodo.completed ? 'add' : 'remove']('todo-completed');
    elements.todo.classList.add("todo");
    elements.todo.dataset.id = newTodo.id;
    elements.todoLeft.classList.add("todo-left");
    elements.checkBox.type = 'checkbox';
    elements.checkBox.id = 'todo-check';
    elements.todoTexts.classList.add("todo-textfields");
    elements.title.textContent = `${newTodo.title}`
    elements.title.classList.add("todo-title");
    elements.description.textContent = `${newTodo.description}`;
    elements.description.classList.add("todo-description");
    elements.todoRight.classList.add("todo-right");
    elements.dueDate.textContent = `${newTodo.dueDate}`;
    elements.dueDate.classList.add("todo-dueDate");
    elements.editBtn.textContent = 'Edit';
    elements.editBtn.classList.add("todo-edit-btn");
    elements.removeBtn.textContent = 'Remove';
    elements.removeBtn.classList.add("todo-remove-btn");


    elements.todosList.appendChild(elements.todo);
    elements.todo.appendChild(elements.todoLeft);
    elements.todoLeft.append(elements.checkBox, elements.todoTexts);
    elements.todoTexts.append(elements.title, elements.description);
    elements.todo.appendChild(elements.todoRight);
    elements.todoRight.append(elements.dueDate, elements.editBtn, elements.removeBtn);


}

//Sets default date as today's date
export function initializeDate() {
    const dueDate = document.querySelector("#dueDate");
    dueDate.value = formatISO(new Date(), { representation: 'date' });
}

//When editing a todo it will fill new todo card form with giving parameters
export function fillNewTodoCardElements(title, description, dueDate) {

    DOM.newTodoCard.querySelector("#new-todo-title").value = title;
    DOM.newTodoCard.querySelector("#new-todo-description").value = description;
    DOM.newTodoCard.querySelector("#dueDate").value = format(dueDate, 'yyyy-MM-dd');
}

//Set selected todo's data on DOM and return data to send 
export function setTodoData(todo) {
    const title = todo.querySelector(".todo-title").textContent = DOM.newTodoCard.querySelector("#new-todo-title").value;
    const description = todo.querySelector(".todo-description").textContent = DOM.newTodoCard.querySelector("#new-todo-description").value;
    const parseDate = parseISO(DOM.newTodoCard.querySelector("#dueDate").value);
    const formattedDate = format(parseDate, 'MMMM d, yyyy');
    const dueDate = todo.querySelector(".todo-dueDate").textContent = formattedDate;
    return {
        title: title,
        description: description,
        dueDate: dueDate,
    }
}

export function setTodoComplete(todo, isCompleted) {
    const todoTitle = todo.querySelector(".todo-title");
    if (isCompleted) {
        todoTitle.classList.add("todo-completed");
    }
    else {
        todoTitle.classList.remove("todo-completed");

    }
}