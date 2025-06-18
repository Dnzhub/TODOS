export default class Todo {

    constructor(title, description, dueDate, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.id = id;
    }

    update(fields) {
        Object.assign(this, fields);
    }

    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getDueDate() {
        return this.dueDate;
    }
}