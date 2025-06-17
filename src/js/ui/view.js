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
    addTodoBtn: document.querySelector(".add-todo-btn"),
    projectTitle: document.querySelectorAll(".current-project-title"),
    newTodoExitBtn: document.querySelector(".new-todo-exit-btn"),
    newTodoSubmitBtn: document.querySelector(".new-todo-submit-btn"),
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

export function setActiveProjectTitle(title) {
    DOM.projectTitle.forEach(element => {
        element.textContent = title;
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
    const title = document.querySelector("#new-todo-title");
    const description = document.querySelector("#new-todo-description");
    const dueDate = document.querySelector("#dueDate");

    return {
        title: title.value || "title",
        description: description.value || "description",
        dueDate: dueDate.value
    }
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
    elements.todo.classList.add("todo");
    elements.todoLeft.classList.add("todo-left");
    elements.checkBox.type = 'checkbox';
    elements.checkBox.id = 'todo-check';
    elements.todoTexts.classList.add("todo-textfields");
    elements.title.textContent = `${newTodo.title}`
    elements.description.textContent = `${newTodo.description}`;
    elements.todoRight.classList.add("todo-right");
    elements.dueDate.textContent = `${newTodo.dueDate}`;
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

