import './NewTodo.css';
import {useState} from "react";
import {addTodo} from "./api";

function NewTodo({ onNewTodo }) {
    const [inputValue, setInputValue] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const todoText = inputValue.trim();
        if (todoText.length === 0) return;

        const newTodo = { text: todoText };

        addTodo(newTodo).then(_ => {
            onNewTodo().finally(_ => {
                setInputValue('')
            })
        })
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <form id="todo-form" onSubmit={handleSubmit}>
            <input type="text" id="new-todo" placeholder="Add a new task..." value={inputValue} onChange={handleChange} />
            <button type="submit">Add</button>
        </form>
    )
}

export default NewTodo;
