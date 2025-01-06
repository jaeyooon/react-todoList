import './App.css'
import AddTodo from './components/AddTodo'
import Header from './components/Header'
import List from './components/List'
import { useState, useReducer } from 'react'

const initialTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      localStorage.setItem('todos', JSON.stringify([...state, action.data]));
      return [...state, action.data];
    case "UPDATE":
      return action.editedIsDone;
    case "UPDATE_CONTENT":
      return action.editedTodoContent;
    case "DELETE":
      return action.deletedTodo;
    case "DELETE_ALL":
      return [];
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, initialTodos);  

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: Date.now(),
        isDone: false,
        content: content,
      }
    })
  };

  const onUpdate = (targetId) => {
    let editedIsDone = todos.map((todo) =>
      todo.id === targetId
        ? { ...todo, isDone: !todo.isDone }
        : todo
    );

    localStorage.setItem('todos', JSON.stringify(editedIsDone));
    dispatch({
      type: "UPDATE",
      editedIsDone: editedIsDone,
    })
    
  };

  const onUpdateContent = (targetId, editedContent) => {
    let editedTodoContent = todos.map((todo) =>
      todo.id === targetId
        ? { ...todo, content: editedContent }
        : todo
    );

    localStorage.setItem('todos', JSON.stringify(editedTodoContent));
    dispatch({
      type: "UPDATE_CONTENT",
      editedTodoContent: editedTodoContent,
    })
  };

  const onDelete = (targetId) => {
    let deletedTodo = todos.filter((todo) =>
      todo.id !== targetId
    );

    localStorage.setItem('todos', JSON.stringify(deletedTodo));
    dispatch({
      type: "DELETE",
      deletedTodo: deletedTodo,
    })
  };

  const deleteAll = () => {
    localStorage.setItem('todos', JSON.stringify([]));

    dispatch({
      type: "DELETE_ALL",
    })
  };

  return (
    <div className='App'>
      <Header />
      <AddTodo onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onUpdateContent={onUpdateContent} onDelete={onDelete} deleteAll={deleteAll} />
    </div>
  )
}

export default App
