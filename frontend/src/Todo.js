import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
export default function Todo({ todo, toggleTodo, deleteTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.todoId);
  }
  function handleDeleteTodo() {
    deleteTodo(todo.todoId);
  }

  return (
    <div className="taskBg">
      <label>
        <div>
          <div>
            <div className="check" onClick={handleTodoClick}>
              <span title="Completed / Not Completed" >
              {todo.isDone && <FontAwesomeIcon icon={faCircle} /> } 
              </span>
            </div>
            <div className={
              todo.dueDate &&
              todo.dueDate < new Date().toISOString().split("T")[0]
                ? "text-danger"
                : ""
            }>
              <div className={todo.isDone ? "is-done" : ""}>{todo.title}</div>
            </div>
            
            <div className="duedate">{todo.dueDate ? todo.dueDate : ""}</div>

            <span className="delete" title="Delete" onClick={handleDeleteTodo}>
               <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        </div>
      </label>
    </div>
  );
}
