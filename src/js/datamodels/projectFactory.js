import Project from "./project";

export default function createProject(data) {
    return new Project(data.title, data.id);
}