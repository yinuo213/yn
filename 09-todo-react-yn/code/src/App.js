import './App.css';
import logo from './logo.svg';
import Todo from './Todo.js'
import NewTodo from './NewTodo';
import {useEffect, useState} from 'react';
import {getTodos} from "./api";

function App() {

    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
            .then(res => {
                setTodos(res)
            })
    }, []);

    const handleNewTodo = () => {
        return getTodos()
            .then(res => {
                setTodos(res)
            })
    };


    return (
        <div className="todo-app">
            <img src={logo} className="App-logo" alt="logo" />
            <NewTodo onNewTodo={handleNewTodo} />
            <Todo todos={todos} onNewTodo={handleNewTodo} />
        </div>
    )
}

export default App;
