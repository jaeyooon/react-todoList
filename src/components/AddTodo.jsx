import "./AddTodo.css"
import { useState, useRef } from "react";

const AddTodo = ({onCreate}) => {
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  }

  const onSubmit = () => {
    if (content === "") {
      contentRef.current.focus();
      return;
    }

    onCreate(content);
    setContent("");
  }

  return(
    <div className="AddTodo">
      <input
        ref={contentRef}
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeydown}
        placeholder="새로운 할 일 입력..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  )
};

export default AddTodo;