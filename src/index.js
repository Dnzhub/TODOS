import './css/project.css'
import './css/skeleton.css';
import './css/styles.css';
import './css/todo.css';
import PubSub from 'pubsub-js';

import format from 'date-fns/format';
import newProject from './js/datamodels/projectFactory.js';
import newTodo from './js/datamodels/todoFactory.js';
import * as storage from './storage/storage.js';
import { bindNewProjectButtons, bindNewTodoButton, bindProjectClicked, bindSaveButton, bindTodoEditButton, bindTodoRemoveButton, bindTodoCheckButton } from './js/ui/eventHandler.js';
import * as view from './js/ui/view.js';

let projects = [];
let selectedProject;
const today = new Date();
const timeString = format(today, 'HH:mm:ss');
console.log(timeString);



function addProjectToDataBase(project) {
    projects.push(project);
    //console.log('Project added:', project);
}
function createNewProject(data) {
    const project = newProject(data);
    setActiveProject(project);
    addProjectToDataBase(project);
}
function createNewTodo(data) {
    const todo = newTodo(data);
    selectedProject.addTodo(todo);
}

function saveToLocalStorage() {
    storage.save(projects);
}

function loadFromLocalStorage() {
    const raw = storage.load();
    if (raw) {
        raw.forEach(projectData => {
            const proj = newProject(projectData);
            projectData.todos.forEach(t => proj.addTodo(newTodo(t)));
            addProjectToDataBase(proj);

        });

    }
    else {
        console.warn("Project data couldnt found.");

    }

    // if (raw) {
    //     projects = raw.forEach(p => {
    //         const proj = createNewProject(p);
    //         p.todos.forEach(t => proj.addTodo(createNewTodo(t)));
    //     });
    // } else {
    //     console.log("Load from local storage failed.");
    //     // this.projects.push(createNewProject(""));
    // }
}
function setActiveProject(project) {
    selectedProject = project;
    view.setActiveProjectTitle(selectedProject.title, selectedProject.color);
}

//Event Subscribers
const newProjectInfo = "NEW_PROJECT_INFO";
PubSub.subscribe(newProjectInfo, (msg, projectData) => {
    //  console.log('Received new project data:', projectData);
    createNewProject(projectData);
    saveToLocalStorage();
});
const newTodoInfo = "NEW_TODO_INFO";
PubSub.subscribe(newTodoInfo, (msg, todoData) => {
    createNewTodo(todoData);
    saveToLocalStorage();
    view.renderTodos(selectedProject);
});

// Bind event handlers
bindNewProjectButtons();
bindProjectClicked(id => {
    const project = projects.find(p => p.id === id);
    setActiveProject(project);
    view.renderTodos(project);


});
bindNewTodoButton()
bindTodoRemoveButton(todoID => {
    selectedProject.removeTodo(todoID);
    saveToLocalStorage();

});

bindTodoEditButton();
bindSaveButton((todoID, todoData) => {
    const todo = selectedProject.getTodos().find(t => t.id === todoID);
    todo.update({
        title: todoData.title,
        description: todoData.description,
        dueDate: todoData.dueDate,
    });
    saveToLocalStorage();
});

bindTodoCheckButton(todoID => {
    const todo = selectedProject.getTodos().find(t => t.id === todoID);
    todo.toggleComplete();
    saveToLocalStorage();

});

// Load projects from local storage
loadFromLocalStorage();



//Set first project as selected when page load
setActiveProject(projects[0]);
// Render initial projects
view.renderProjects(projects);
view.renderTodos(projects[0]);
projects[0].getTodos().forEach(t => {
    console.log(t);
})
view.initializeDate();
// const data = {
//     title: "title",
//     description: "description",
//     dueDate: "12-22-2016",
// }
// const newt = newTodo(data);
// view.createTodoCard(newt);
