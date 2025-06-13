export default class Todo {

    constructor(title, description, dueData, priority) {
        this.title = title;
        this.description = description;
        this.dueData = dueData;
        this.priority = priority;
    }

    update(fields) {
        Object.assign(this, fields);
    }
}