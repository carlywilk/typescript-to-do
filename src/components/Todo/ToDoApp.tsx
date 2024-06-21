import React, { useState } from "react";

interface ToDoItem {
    id: string;
    text: string;
    completed: boolean;
}

const ToDoApp = () => {

    const [toDos, setToDos] = useState<ToDoItem[]>([]);
    const [newToDo, setNewToDo] = useState("");

    const addToDo = () => {
        if (newToDo !== "") {
            const newId = crypto.randomUUID();
            const newToDoItem: ToDoItem = {
                id: newId,
                text: newToDo,
                completed: false,
            };
            setToDos([...toDos, newToDoItem]);
            setNewToDo("");
        }
    };

    const removeToDo = (id: string) => {
        const updatedToDos = toDos.filter((toDo) => toDo.id !== id);
        setToDos(updatedToDos);
    };

    const toggleComplete = (id: string) => {
        const updatedToDos = toDos.map((toDo) => {
            if (toDo.id === id) {
                return {...toDo, completed: !toDo.completed };
            }
            return toDo;
        });
        setToDos(updatedToDos);
    };

    return (
        <div>
            <h1>To Do App</h1>
            <input
                type="text"
                value={newToDo}
                onChange={(event) => setNewToDo(event.target.value)}
            />
            <button onClick={addToDo}>Add To Do</button>
            <ul>
                {toDos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                        />
                        <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                            {todo.text}
                        </span>
                        <button onClick={() => removeToDo(todo.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoApp;