import './App.css'
import AddTodo from './components/AddTodo'
import Header from './components/Header'
import List from './components/List'
import { useState } from 'react'

const initialTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

function App() {
  const [todos, setTodos] = useState(initialTodos);   

  const onCreate = (content) => {
    const newTodo = {
      id: Date.now(),
      isDone: false,
      content: content,
    }

    setTodos([...todos, newTodo]);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  };

  const onUpdate = (targetId) => {
    let editedIsDone = todos.map((todo) =>
      todo.id === targetId
        ? { ...todo, isDone: !todo.isDone }
        : todo
    );

    setTodos(editedIsDone);
    localStorage.setItem('todos', JSON.stringify(editedIsDone));
  };

  const onUpdateContent = (targetId, editedContent) => {
    let editedTodoContent = todos.map((todo) =>
      todo.id === targetId
        ? { ...todo, content: editedContent }
        : todo
    );

    setTodos(editedTodoContent);
    localStorage.setItem('todos', JSON.stringify(editedTodoContent));
  };

  const onDelete = (targetId) => {
    let deletedTodo = todos.filter((todo) =>
      todo.id !== targetId
    );

    setTodos(deletedTodo);
    localStorage.setItem('todos', JSON.stringify(deletedTodo));
  };

  const deleteAll = () => {
    setTodos([]);
    localStorage.setItem('todos', JSON.stringify([]));
  }

  return (
    <div className='App'>
      <Header />
      <AddTodo onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onUpdateContent={onUpdateContent} onDelete={onDelete} deleteAll={deleteAll} />
    </div>
  )
}

export default App
