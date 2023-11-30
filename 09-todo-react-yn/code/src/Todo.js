import './Todo.css';
import {useEffect, useState} from "react";
import {deleteTodo, toggleTodoCompletion, updateTodoText} from "./api";

function Todo({todos, onNewTodo}) {

    const [todosState, setTodosState] = useState(todos);

    useEffect(() => {
        setTodosState(todos);
    }, [todos]);

    const handleCheckboxChange = (id) => {
        const updatedTodos = [...todosState];

        let completed
        for (let i = 0; i < updatedTodos.length; i++) {
            if (updatedTodos[i].id === id) {
                completed = !updatedTodos[i].completed
                updatedTodos[i].completed = completed
            }
        }

        toggleTodoCompletion(id, completed).then(r => setTodosState(updatedTodos))
    };

    function handleUpdate(id, e)  {
        updateTextDebounce(id, e.currentTarget.textContent)
    }

    const updateTextDebounce = debounce((id, text) => {
        updateTodoText(id, text).then()
    })

    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    function handleDelete(id) {
        deleteTodo(id).then(_ => {
            onNewTodo()
        })
    }

    const sortedTodos = [...todos].sort((a, b) => {
        // First sort by the completed attribute in ascending order (false comes first)
        if (a.completed === b.completed) {
            // If completed is the same, sort by created_at in descending order
            return new Date(b.created_at) - new Date(a.created_at);
        }

        return a.completed ? 1 : -1; // false ranks first
    });

    return (
        <ul id="todo-list">
            {sortedTodos.map((todo, index) => (
                <li className={"todo-item " + (todo.completed ? "completed" : "")} key={index}>
                    <input type="checkbox" checked={todo.completed} onChange={() => handleCheckboxChange(todo.id)}/>
                    <span suppressContentEditableWarning contentEditable='true'
                          onInput={(e) => handleUpdate(todo.id, e)}>{todo.text}</span>
                    <button onClick={(e) => handleDelete(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

export default Todo;
