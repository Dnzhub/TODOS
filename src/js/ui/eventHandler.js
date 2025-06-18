import PubSub from 'pubsub-js';

import { DOM, showElement, closeElement, getNewProjectData, addNewProjectToDOM, getNewTodoData, addTodoToDOM, clearTodos } from './view.js';

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
            closestTodo.remove();
            handler(todoID);
        }
    })
}

export function bindNewTodoButton() {
    DOM.addTodoBtn.addEventListener("click", () => {
        showElement(DOM.newTodoCard, DOM.contentBlur);
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

    })
}


