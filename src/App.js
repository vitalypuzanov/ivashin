import './assets/font/iconsfont.css'
import './App.css';
import React, {useEffect, useRef, useState} from 'react';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import TagsList from './components/TagsList/TagsList';


function App() {
  const inputRef = useRef()

  const [valueInput, setValueInput] = useState('')

  const [todos, setTodos] = useState(() => {
    const storageTodo = JSON.parse(localStorage.getItem('todos'))
    if (storageTodo) return storageTodo
    return []
  })

  const [soughtHash, setSoughtHash] = useState(null)
  const [filteredTodos, setFilteredTodos] = useState([])

  const [editMode, setEditMode] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)

  const [arrayHashes, setArrayHashes] = useState([])

  const searchForHash = (value, allIncidents = false) => {
    let arrHash;
    if (allIncidents) {
      arrHash = value.match(/(#\S+\s)|(#\S+)$/g)
    } else {
      arrHash = value.match(/(#\S+\s)/g)
    }

    if (arrHash) {
      arrHash = arrHash.map(hash => hash.trim())
      arrHash = [...new Set(arrHash)]
      return arrHash
    }
    return []
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    if (soughtHash) {
      let searchTodo = todos.filter(todo => todo.hashes.includes(soughtHash))
      setFilteredTodos(searchTodo)
    } else {
      setFilteredTodos(todos)
    }
  }, [soughtHash, todos])

  const handleChangeInput = (e) => {
    const value = e.target.value
    const hashes = searchForHash(value)
    setArrayHashes(hashes)

    setValueInput(value)
  }

  const addTodo = () => {
    if (valueInput.length !== 0) {
      let hashArray = searchForHash(valueInput, true)

      const newTodo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 0,
        text: valueInput,
        hashes: hashArray
      }

      setTodos([...todos, newTodo])
      setValueInput('')
      setArrayHashes([])
    }
  }

  const deleteTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleEditTodo = (todo) => {
    inputRef.current.focus()
    setEditMode(true)
    setValueInput(todo.text)
    setCurrentTodo(todo)
  }

  const saveChanges = () => {
    if (valueInput.length !== 0) {
      let hashArray = searchForHash(valueInput, true)

      const newTodos = todos.map(todo => {
        if (todo.id === currentTodo.id) {
          return {
            id: currentTodo.id,
            text: valueInput,
            hashes: hashArray
          }
        }
        return todo
      })

      setTodos(newTodos)
      setEditMode(false)
      setValueInput('')
      setArrayHashes([])
    }
  }

  const cancelEdit = () => {
    setEditMode(false);
    setValueInput('')
    setArrayHashes([])
  }

  const handleClickHash = (hash) => {
    if (hash) {
      setSoughtHash(hash)
    } else {
      setSoughtHash(null)
    }
  }


  return (
    <div className="App">
    <div className="wrap">
      <h1 className='app-title'>
        Заметки
      </h1>
      <TodoForm
        valueInput={valueInput}
        editMode={editMode}
        inputRef={inputRef}
        handleChangeInput={handleChangeInput}
        saveChanges={saveChanges}
        cancelEdit={cancelEdit}
        addTodo={addTodo}
        arrayHashes={arrayHashes}
      />
      <div className='todosAndTags'>
        <TodoList
          todos={filteredTodos}
          handleEditTodo={handleEditTodo}
          deleteTodo={deleteTodo}
        />
        <TagsList
          todos={todos}
          soughtHash = {soughtHash}
          handleClickHash={handleClickHash}
        />
      </div>
      </div>
    </div>
  );
}

export default App;
