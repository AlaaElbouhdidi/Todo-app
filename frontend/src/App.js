import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import Constants from "./utilities/Constants";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
  const [filterOpt, setFilterOpt] = useState([]);

  const todoTitleRef = useRef();
  const todoDueDateRef = useRef();

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    const URL = Constants.API_URL_GET_ALL_TODOS;
    fetch(URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setTodos(data);
          setFilterTodos(data);
          setFilterOpt(0);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function toggleTodo(id) {
    const URL = Constants.API_URL_UPDATE_TODO;
    let todoToUpdate = todos.find((todo) => todo.todoId === id);
    todoToUpdate.isDone = !todoToUpdate.isDone;
    fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoToUpdate),
    })
      .then((response) => response.json())
      .then(() => { 
          getTodos();
      }
      )
      .catch((error) => {
        alert(error);
      }
      );
  }

  function handleAddTodo(e) {
    const title = todoTitleRef.current.value;

    if (title.length >= 10) {
      const todoToCreate = {
        todoId: uuidv4(),
        title: title,
        dueDate: todoDueDateRef.current.value,
        isDone: false,
      };

      const URL = Constants.API_URL_ADD_TODO;

      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoToCreate),
      })
        .then((response) => response.json())
        .then(() => {
          getTodos();
          todoTitleRef.current.value = null;
          todoDueDateRef.current.value = null;
        })
        .catch((error) => {
          alert(error);
        });
    } else alert("Please enter a valid todo name with at leaset 10 characters");
  }

  function filterActive() {
    setFilterTodos(todos.filter((todo) => !todo.isDone));
    setFilterOpt(1);
  }

  function filterDone() {
    setFilterTodos(todos.filter((todo) => todo.isDone));
    setFilterOpt(2);
  }

  function showAll() {
    setFilterTodos(todos);
    setFilterOpt(0);
  }

  const deleteTodo = (id) => {
    const URL = `${Constants.API_URL_DELETE_TODO}/${id}`;

    fetch(URL, {
      method: "DELETE",
    })
      .then((response) => response.json())  
      .then(() => {
        getTodos();
        })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row min-vh-100">
          <div className="col  d-flex flex-column align-content-center justify-content-center">
            <h1 className="head-title">Todos</h1>
            <div className="row add-form">
              <input className="col-8" ref={todoTitleRef} type="text" placeholder="What needs to be done" />
              <input className="col-3" ref={todoDueDateRef} type="date" />
              <button className="btn btn-success col-1" onClick={handleAddTodo}>
                +
              </button>
            </div>
            {filterTodos && filterTodos.map((todo) => {
                return <Todo key={todo.todoId} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            } )}  
            <p className="text-center font-italic" >{filterTodos.length <= 0 ? "Add some task" : ""}</p>
            <div className="row footer">
              <div className="col">{filterTodos.length} items left </div>
              <div className={`filter col text-center ${filterOpt === 0 ? "filter-on" :"" }`} align="center" onClick={showAll}>
                All
              </div>
              <div className={`filter col text-center ${filterOpt === 1 ? "filter-on" :"" }`} onClick={filterActive}>
                Active
              </div>
              <div className={`filter col text-center ${filterOpt === 2 ? "filter-on" :"" }`} onClick={filterDone}>
                Completed
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
