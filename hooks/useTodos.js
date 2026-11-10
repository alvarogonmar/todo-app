import { useEffect, useState } from "react";
import data from "../data/todos";
import { getTodos, saveTodos } from "../todoStorage";

export function useTodos() {
  const [todos, setTodos] = useState(
    () => [...data].sort((a, b) => b.id - a.id), // ...data crea un array copia, asi se conserva el arraglo original
  );

  const [loaded, setLoaded] = useState(false); // indica si termino de leer correctamente todos los todos, comienza en false y cambia a true

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

  // recuperar lo que guardamos la ultima vez
  // Llamar a getTodos()
  // Si encuentra datos, reemplaza el estado con ellos
  // Si recibe null, conservar el json con ejemplos
  // Marcar la carga como terminada.

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await getTodos();

        if (savedTodos !== null) {
          setTodos(savedTodos);
        }

        setLoaded(true);
      } catch (error) {
        console.error("Error al iniciar la lista:", error);
      }
    };

    loadTodos();
  }, []);

  // cada vez que agrego, completo o elimino una tarea,
  // cambiar todos. Este efecto detecta ese cambio y guarda la lista.

  useEffect(() => {
    if (!loaded) return; // evitar guardr mientras esta leyendo

    saveTodos(todos).catch((error) => {
      console.error("Error al guardar la lista:", error);
    });
  }, [todos, loaded]);

  return {
    todos,
    loaded,
    addTodo,
    toggleTodo,
    removeTodo,
  };
}
