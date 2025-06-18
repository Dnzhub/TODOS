export default class Todo {

    constructor(title, description, dueDate, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.id = id;
        this.completed = false;
    }

    update(fields) {
        Object.assign(this, fields);
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

}