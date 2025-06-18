import Todo from "./todo";

export default function createTodo(data) {
    console.log(data)
    return new Todo(data.title, data.description, data.dueDate, data.id, data.completed);
}