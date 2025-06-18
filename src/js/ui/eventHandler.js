import PubSub from 'pubsub-js';

import { DOM, showElement, closeElement, getNewProjectData, addNewProjectToDOM, getNewTodoData, clearTodos, removeTodoFromUI, fillNewTodoCardElements, setTodoData } from './view.js';

let selectedTodo;

//Bind new project form buttons
export function bindNewProjectButtons() {
    DOM.newProjectBtn.addEventListener("click", () => {
        showElement(DOM.newProject, DOM.contentBlur);
    });
    DOM.newProjectExit.addEventListener("click", () => {
        closeElement(DOM.newProject, DOM.contentBlur);
    });
    DOM.newProjectSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        const projectData = getNewProjectData();
        addNewProjectToDOM(projectData)
        const newProjectInfo = "NEW_PROJECT_INFO";
        PubSub.publish(newProjectInfo, projectData);
    })

}

//Bind event when a project clicked
export function bindProjectClicked(handler) {
    DOM.projectList.addEventListener("click", e => {
        clearTodos();
        const item = e.target.closest('.project-container');
        if (!item) return;
        const projectId = item.dataset.id;
        handler(projectId);
    });
}


export function bindTodoRemoveButton(handler) {
    DOM.todos.addEventListener("click", e => {
        if (e.target.classList.contains('todo-remove-btn')) {
            const closestTodo = e.target.closest('.todo');
            if (!closestTodo) return;
            const todoID = closestTodo.dataset.id;
            removeTodoFromUI(closestTodo);
            // closestTodo.remove();
            handler(todoID);
        }
    })
}
export function bindTodoEditButton() {
    DOM.todos.addEventListener("click", e => {
        if (e.target.classList.contains("todo-edit-btn")) {
            const closestTodo = e.target.closest('.todo');
            selectedTodo = closestTodo;
            if (!closestTodo) return;
            const todoTitle = closestTodo.querySelector(".todo-title").textContent;
            const todoDescription = closestTodo.querySelector(".todo-description").textContent;
            const todoDueDate = closestTodo.querySelector(".todo-dueDate").textContent;
            fillNewTodoCardElements(todoTitle, todoDescription, todoDueDate);
            showElement(DOM.newTodoCard, DOM.contentBlur, DOM.editSaveBtn);
            closeElement(DOM.newTodoSubmitBtn);
        }
    });
}
export function bindSaveButton(handler) {
    DOM.editSaveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const newTodoData = setTodoData(selectedTodo);
        closeElement(DOM.newTodoCard, DOM.contentBlur);
        const todoID = selectedTodo.dataset.id;
        handler(todoID, newTodoData);
    });
}
export function bindNewTodoButton() {
    DOM.addTodoBtn.addEventListener("click", () => {
        showElement(DOM.newTodoCard, DOM.contentBlur, DOM.newTodoSubmitBtn);
        closeElement(DOM.editSaveBtn);
    });
    DOM.newTodoExitBtn.addEventListener("click", () => {
        closeElement(DOM.newTodoCard, DOM.contentBlur);
    });
    DOM.newTodoSubmitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const todoData = getNewTodoData();
        closeElement(DOM.newTodoCard, DOM.contentBlur);
        const newTodoInfo = "NEW_TODO_INFO";
        PubSub.publish(newTodoInfo, todoData);

    });

}


