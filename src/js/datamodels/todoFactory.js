import Todo from "./todo";

export default function createTodo(data) {
    return new Todo(data.title, data.description, data.dueData, data.priority);
}