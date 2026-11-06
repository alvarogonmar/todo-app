import { useState } from "react";
import data from "../data/todos";

export function useTodos() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));

  const addTodo = (title) => {
    if (!title.trim()) return false;

    const newId = todos.length > 0 ? todos[0].id + 1 : 1;
    setTodos([{ id: newId, title: title.trim(), completed: false }, ...todos]);
    return true;
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
}
