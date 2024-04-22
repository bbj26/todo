import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../../api/todo";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleInputChange = (event) => {
    setNewTodoText(event.target.value);
  };

  const handleAddTodo = async (event) => {
    event.preventDefault();
    try {
      const response = await createTodo(newTodoText);
      setTodos([...todos, response]);
      setNewTodoText("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const response = await updateTodo(todoToUpdate.id, {
        done: !todoToUpdate.done,
      });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? response : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditTodo = (id) => {
    setEditingTodoId(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditedTodoText(todoToEdit.text);
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await updateTodo(id, {
        text: editedTodoText,
      });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? response : todo
      );
      setTodos(updatedTodos);
      setEditingTodoId(null);
      setEditedTodoText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  return (
    <div style={{ margin: "20px auto", maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <form onSubmit={handleAddTodo} style={{ marginBottom: 20 }}>
        <TextField
          type="text"
          value={newTodoText}
          onChange={handleInputChange}
          variant="outlined"
          label="Enter a new todo"
          fullWidth
          autoFocus
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
        >
          Add Todo
        </Button>
      </form>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} button>
            <Checkbox
              edge="start"
              checked={todo.done}
              tabIndex={-1}
              disableRipple
              onChange={() => handleToggleTodo(todo.id)}
            />
            {editingTodoId === todo.id ? (
              <>
                <TextField
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  variant="outlined"
                  fullWidth
                  autoFocus
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveEdit(todo.id)}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCancelEdit}
                  style={{ marginLeft: 10 }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <ListItemText
                  primary={todo.text}
                  style={{
                    textDecoration: todo.done ? "line-through" : "none",
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditTodo(todo.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Todo;
