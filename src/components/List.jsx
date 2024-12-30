import TodoItem from "./TodoItem";
import "./List.css"
import { useState } from "react";

const List = ({todos, onUpdate, onUpdateContent, onDelete}) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content
        .toLowerCase()
        .includes(search.toLowerCase())
    );  // search 값이 존재하는 content 값만 필터링하도록
  };

  const filteredTodos = getFilteredData();    // 컴포넌트가 리렌더링될 때마다 호출
  
  return (
    <div className="List">
      <h4>📌할 일 목록</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요."
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return <TodoItem
            key={todo.id}
            {...todo}
            onUpdate={onUpdate}
            onUpdateContent={onUpdateContent}
            onDelete={onDelete}
          />
        })}
      </div>
    </div>
  )
};

export default List;