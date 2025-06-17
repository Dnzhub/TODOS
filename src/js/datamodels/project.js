export default class Project {
    constructor(title, id, color) {
        this.id = id;
        this.title = title || "";
        this.color = color || "#000"; // Default color if not se
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