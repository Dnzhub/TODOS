export const DOM = {
    sidebar: document.querySelector(".sidebar"),
    newProject: document.querySelector(".project-card"),
    contentBlur: document.querySelector(".blur-background"),
    newProjectBtn: document.querySelector(".add-new-project"),
    newProjectExit: document.querySelector(".new-project-exit-btn"),
    newProjectSubmit: document.querySelector(".new-project-submit"),
    projectList: document.querySelector(".project-list"),
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


export function submitNewProject() {
    const id = crypto.randomUUID();
    const title = document.querySelector("#project-title");
    const color = document.querySelector("#project-color");

    const newProjectContainer = document.createElement("div");
    newProjectContainer.dataset.id = id;

    const newProjectTitle = document.createElement("button");
    newProjectTitle.classList.add("project");
    newProjectTitle.textContent = title.value;
    newProjectTitle.style.color = color.value;

    if (title.value === "") title = "untitled";

    newProjectContainer.appendChild(newProjectTitle);
    DOM.projectList.appendChild(newProjectContainer);
    closeElement(DOM.contentBlur, DOM.newProject);

    return {
        title: title.value,
        id: id,
    };

}


function clearProjectList() {
    DOM.projectList.innerHTML = ""; // Clear existing project list
}

export function renderProjects(projects) {
    clearProjectList();
    if (!projects || projects.length === 0) {
        console.warn("No projects to render.");
        return;
    }
    projects.forEach(project => {
        const projectContainer = document.createElement("div");
        projectContainer.dataset.id = project.id;

        const projectTitle = document.createElement("button");
        projectTitle.classList.add("project");
        projectTitle.textContent = project.title;
        projectTitle.style.color = project.color || "#000"; // Default color if not set

        projectContainer.appendChild(projectTitle);
        DOM.projectList.appendChild(projectContainer);
    });
}




