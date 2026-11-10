import AsyncStorage from "@react-native-async-storage/async-storage";

const TODOS_KEY = "@todo-app:todos"; // identifica el lugar donde guarda mi lista

export const saveTodos = async (todos) => {
  try {
    const jsonValue = JSON.stringify(todos); // Convertir el arreglo en texto para almacenarlo.
    await AsyncStorage.setItem(TODOS_KEY, jsonValue);
  } catch (error) {
    console.error("No se pudieron guardar las tareas:", error);
    throw error;
  }
};

export const getTodos = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TODOS_KEY);

    return jsonValue !== null ? JSON.parse(jsonValue) : null; // Convwertir el texto nuevamente en un arreglo
  } catch (error) {
    console.error("No se pudieron cargar las tareas:", error);
    throw error;
  }
};
