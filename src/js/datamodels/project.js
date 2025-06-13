export default class Project {
    constructor(title, id) {
        this.id = id;
        this.title = title;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    getTodos() {
        return this.todos;
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }

}