import React from 'react';
import style from './TodoList.module.sass'

const TodoList = ({todos,handleEditTodo,deleteTodo}) => {

  const list = todos.map((todo) => {
    return (
      <li
        key={todo.id}
        className={style.todoItem}
      >
        <span className={style.text}>{todo.text}</span>
        <div>
          <button
            className={`${style.btn} ${style.btnEdit}`}
            onClick={(e)=> handleEditTodo(todo)}
          >
            <i className="icon-edit"/>
          </button>
          <button
            className={`${style.btn} ${style.btnDelete}`}
            onClick={()=>deleteTodo(todo.id)}
          >
            <i className="icon-trash-empty"/>
          </button>
        </div>
      </li>
    )
  })

  return (
    <div className={style.todoListWrapper}>
      {
        todos.length > 0 ?
          <h3>Список заметок</h3>:
          <h3>Добавьте свою первую заметку</h3>
      }
      <ul className={style.todoList}>
        {
          list
        }
      </ul>
    </div>
  );
}

export default TodoList;