import './css/project.css'
import './css/skeleton.css';
import './css/styles.css';
import PubSub from 'pubsub-js';

import format from 'date-fns/format';
import newProject from './js/datamodels/projectFactory.js';
import newTodo from './js/datamodels/todoFactory.js';
import * as storage from './storage/storage.js';
import { bindNewProjectButton, bindNewProjectExitButton, bindNewProjectSubmitButton } from './js/ui/eventHandler.js';
import * as view from './js/ui/view.js';

const projects = [];

const today = new Date();
const timeString = format(today, 'HH:mm:ss');
console.log(timeString);



function addProjectToDataBase(project) {
    projects.push(project);
    console.log('Project added:', project);
}
function createNewProject(data) {
    const project = newProject(data);
    addProjectToDataBase(project);
}

function saveToLocalStorage() {
    storage.save(projects);
}


//Event Subscribers
const newProjectInfo = "NEW_PROJECT_INFO";
PubSub.subscribe(newProjectInfo, (msg, projectData) => {
    //  console.log('Received new project data:', projectData);
    createNewProject(projectData);
    saveToLocalStorage();
});

const raw = storage.load();
console.log('Raw data loaded from storage:', raw);
if (raw) {
    raw.forEach(projectData => {
        const project = newProject(projectData);
        addProjectToDataBase(project);
    });
}

// Bind event handlers
bindNewProjectButton();
bindNewProjectExitButton();
bindNewProjectSubmitButton();

// Render initial projects
view.renderProjects(projects);