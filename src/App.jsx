import './App.css'
import AddTodo from './components/AddTodo'
import Header from './components/Header'
import List from './components/List'
import TodoItem from './components/TodoItem'
import { useState, useRef } from 'react'

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "운동하기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);    

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime()
    }

    setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId
          ? { ...todo, isDone: !todo.isDone}
          : todo
      )
    );
  };

  const onUpdateContent = (targetId, editedContent) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId
          ? { ...todo, content: editedContent }
          : todo
      )
    );
  };

  const onDelete = (targetId) => {
    setTodos(todos.filter((todo) =>
      todo.id !== targetId
    ));
  };

  return (
    <div className='App'>
      <Header />
      <AddTodo onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onUpdateContent={onUpdateContent} onDelete={onDelete} />
    </div>
  )
}

export default App
