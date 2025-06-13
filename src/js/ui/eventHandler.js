import PubSub from 'pubsub-js';

import { DOM, showElement, closeElement, submitNewProject } from './view.js';

export function bindNewProjectButton() {
    DOM.newProjectBtn.addEventListener("click", () => {
        showElement(DOM.newProject, DOM.contentBlur);
    })
}

export function bindNewProjectExitButton() {
    DOM.newProjectExit.addEventListener("click", () => {
        closeElement(DOM.newProject, DOM.contentBlur);
    })
}

export function bindNewProjectSubmitButton() {
    DOM.newProjectSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        const projectData = submitNewProject();

        const newProjectInfo = "NEW_PROJECT_INFO";
        PubSub.publish(newProjectInfo, projectData);
    })
}


