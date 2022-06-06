import React from 'react';
import style from './TodoForm.module.sass'

const TodoForm = ({
                    inputRef,
                    valueInput,
                    handleChangeInput,
                    cancelEdit,
                    saveChanges,
                    addTodo,
                    editMode,
                    arrayHashes
                  }) => {

  return (
    <div className={style.formTodo}>
      <div className={style.inputWithButtons}>
        <div className="input-wrapper">
          <label htmlFor="inputTodo" hidden>
            Todo input
          </label>
          <input
            type="text"
            className={style.formInput}
            id='inputTodo'
            ref={inputRef}
            value={valueInput}
            onChange={handleChangeInput}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                editMode ? saveChanges() : addTodo();
              }
            }}
          />
        </div>
        <div>
          {
            editMode ?
              <>
                <button
                  onClick={cancelEdit}
                  className={`${style.btn} ${style.btnCancel}`}
                >
                  <i className="icon-cancel"/>
                </button>
                <button
                  onClick={saveChanges}
                  className={`${style.btn} ${style.btnSave}`}
                >
                 <i className="icon-ok"/>
                </button>
              </> :
              <button
                onClick={addTodo}
                className={`${style.btn} ${style.btnAdd}`}
              >
                <i className="icon-plus"/>
              </button>
          }
        </div>

      </div>


      <div className="formHashes">
        {
          arrayHashes.length > 0 && arrayHashes.map(hash => {
            return <span
              className={style.hashItem}
              key={hash}
            >{hash}</span>
          })
        }
      </div>
    </div>
  );
}

export default TodoForm;