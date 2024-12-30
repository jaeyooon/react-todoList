import "./TodoItem.css"
import { useState } from "react";

const TodoItem = ({ id, isDone, content, onUpdate, onUpdateContent, onDelete }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  
  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSubmit = (e) => {

    onUpdateContent(id, editedContent);
    setIsEditing(false);
  };

  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  
  if (isEditing) {
    return (
       <div className="TodoItem">
        <input
          className="Editing"
          style={{ border: "1px solid #d5e68d", flex: 1, fontSize: "16px", padding: "5px 5px", borderRadius: "5px" }}
          value={editedContent}
          onKeyDown={onKeydown}
          onChange={handleEditChange}
        />
        <button
          onClick={handleSubmit}
        >저장</button>
        <button
          onClick={() => setIsEditing(false)}
        >취소</button>
      </div>
    )
  } else {
    return (
      <div className="TodoItem">
        <input onChange={onChangeCheckbox} readOnly checked={isDone} type="checkbox" />
        <div
          className="content"
          style={{
            textDecorationLine: isDone ? 'line-through' : undefined,
            textDecorationColor: isDone ? '#ff8811' : undefined
          }}>
          {content}
        </div>
        <button
          onClick={() => setIsEditing(true)}
        >수정</button>
        <button
          onClick={handleDelete}
        >삭제</button>
      </div>
    );
  }
};

export default TodoItem;