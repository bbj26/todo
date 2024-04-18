import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_SERVER_URL;

const getTodoById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

const getTodos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

const createTodo = async (newTodoText) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/todos`, {
      text: newTodoText,
      done: false,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

const updateTodo = async (id, updates) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/todos/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
