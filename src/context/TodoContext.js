import { createContext, useState, useEffect } from 'react'

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
  // Notice vars
  const [notice, setNotice] = useState('')

  // Todo Form vars
  const [todo, setTodo] = useState('')
  const [todoList, setTodoList] = useState([])
  const [finishedList, setFinishedList] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [prevTodo, setPrevTodo] = useState({})
  const inputEl = document.querySelector('input')

  // ProgressBar vars
  const totalCount = `${todoList.length + finishedList.length}`
  const progressPercentage = `${(finishedList.length / totalCount) * 100}`
  const [bgColor, setBgColor] = useState('')
  const bgStyle = {
    width: progressPercentage + '%',
    backgroundColor: bgColor,
  }
  const handleBgColor = () => {
    if (finishedList.length !== 0) {
      if (+progressPercentage <= 25) {
        setBgColor('#b7e4c7')
      } else if (+progressPercentage <= 50) {
        setBgColor('#95d5b2')
      } else if (+progressPercentage <= 75) {
        setBgColor('#74c69d')
      } else if (+progressPercentage === 100) {
        setBgColor('var(--primary-color)')
      }
    } else {
      setBgColor('transparent')
    }
  }

  // Handle progress bar bg color when percentage changed
  useEffect(handleBgColor, [progressPercentage])

  // Set input value -> todo
  const displayTodo = (e) => {
    setTodo(e.target.value)
  }

  // Add todo -> todo list
  const addTodo = (e) => {
    e.preventDefault()

    // Don't add blank value
    if (todo !== '') {
      // Only add if its new todo and not blank
      if (todoList.indexOf(todo) === -1 && finishedList.indexOf(todo) === -1) {
        setTodoList([todo, ...todoList])
        // Set todo list to LS
        localStorage.setItem('todos', JSON.stringify([todo, ...todoList]))
      } else {
        setNotice('alert')
        inputEl.classList.add('alert')
        setTimeout(() => {
          const noticeEl = document.querySelector('.alert')
          noticeEl.classList.remove('alert')
          inputEl.classList.remove('alert')
          setNotice('')
        }, 3000)
      }
    }

    setTodo('')
  }

  // Update todo
  const updateTodo = (e) => {
    const inputValue = inputEl.value

    // Same todo
    if (inputValue === prevTodo.text) {
      // Show alert
      setNotice('alert')
      inputEl.classList.add('alert')
      setTimeout(() => {
        const noticeEl = document.querySelector('.notice')
        noticeEl.classList.remove('alert')
        inputEl.classList.remove('alert')
        setNotice('')
      }, 3000)
    }
    // Different todo
    else {
      // Todo is from finished list
      if (prevTodo.home === 'finished') {
        const prevTodoIndex = finishedList.indexOf(prevTodo.text)
        finishedList[prevTodoIndex] = inputValue
        // Set finished list to LS
        localStorage.setItem('completedTodos', JSON.stringify(finishedList))
      }
      // Todo is from unfinished list
      else {
        const prevTodoIndex = todoList.indexOf(prevTodo.text)
        todoList[prevTodoIndex] = inputValue
        // Set todo list to LS
        localStorage.setItem('todos', JSON.stringify(todoList))
      }
      // Show updated notice
      setNotice('updated')
      inputEl.classList.add('updated')
      setTimeout(() => {
        const noticeEl = document.querySelector('.notice')
        noticeEl.classList.remove('updated')
        inputEl.classList.remove('updated')
        setNotice('')
      }, 3000)
    }

    e.preventDefault()
    setTodo('')
    setEditMode(false)
  }

  // Enter edit mode
  const enterEditMode = (e) => {
    const text = e.target.parentElement.firstChild.innerText
    inputEl.focus()
    setTodo(text)
    setPrevTodo({
      text: text,
      home: e.target.parentElement.parentElement.parentElement.classList.contains(
        'finished'
      )
        ? 'finished'
        : 'unfinished',
    })
    setEditMode(true)
  }

  // Delete todo from todo list
  const deleteTodo = (e) => {
    const li = e.target.parentElement
    const div = li.parentElement.parentElement

    // Remove from unfinished list
    if (div.classList.contains('unfinished')) {
      setTodoList(todoList.filter((todo) => todo !== li.firstChild.innerText))
      // Remove from todo list in LS
      localStorage.setItem(
        'todos',
        JSON.stringify(
          todoList.filter((todo) => todo !== li.firstChild.innerText)
        )
      )
    }
    // Remove from finished list
    else {
      setFinishedList(
        finishedList.filter((todo) => todo !== li.firstChild.innerText)
      )
      // Remove from finished list in LS
      localStorage.setItem(
        'completedTodos',
        JSON.stringify(
          finishedList.filter((todo) => todo !== li.firstChild.innerText)
        )
      )
    }
  }

  // Move unfinished <-> Finished todo
  const moveTodo = (e) => {
    const div = e.target.parentElement.parentElement.parentElement

    // unfinished -> Finished
    if (div.classList.contains('unfinished')) {
      setTodoList(todoList.filter((todo) => todo !== e.target.innerText))
      setFinishedList([e.target.innerText, ...finishedList])

      // Set LS
      localStorage.setItem(
        'todos',
        JSON.stringify(todoList.filter((todo) => todo !== e.target.innerText))
      )
      localStorage.setItem(
        'completedTodos',
        JSON.stringify([e.target.innerText, ...finishedList])
      )
    }
    // Finished -> unfinished
    else {
      setFinishedList(
        finishedList.filter((todo) => todo !== e.target.innerText)
      )
      setTodoList([e.target.innerText, ...todoList])

      // Set LS
      localStorage.setItem(
        'todos',
        JSON.stringify([e.target.innerText, ...todoList])
      )
      localStorage.setItem(
        'completedTodos',
        JSON.stringify(
          finishedList.filter((todo) => todo !== e.target.innerText)
        )
      )
    }
  }

  const clearAll = () => {
    // Clear all the list
    setTodoList([])
    setFinishedList([])
    localStorage.setItem('todos', JSON.stringify([]))
    localStorage.setItem('completedTodos', JSON.stringify([]))

    inputEl.focus()
    setTodo('')
    setEditMode(false)
  }

  const hoverOnTitle = (e) => {
    // Change title to 'clear all' when its hover
    e.target.textContent = 'clear all'
    e.target.style.color = '#5bc0be'
  }

  const hoverOffTitle = (e) => {
    // Change title back to 'todoro'
    e.target.textContent = 'todoro'
    e.target.style.color = 'var(--primary-color)'
  }

  const getTodosFromLS = () => {
    localStorage.getItem('todos') !== null &&
      setTodoList(JSON.parse(localStorage.getItem('todos')))

    localStorage.getItem('completedTodos') !== null &&
      setFinishedList(JSON.parse(localStorage.getItem('completedTodos')))
  }

  useEffect(getTodosFromLS, [])
  return (
    <TodoContext.Provider
      value={{
        todo,
        todoList,
        finishedList,
        editMode,
        progressPercentage,
        bgColor,
        bgStyle,
        notice,
        handleBgColor,
        displayTodo,
        addTodo,
        updateTodo,
        enterEditMode,
        deleteTodo,
        moveTodo,
        getTodosFromLS,
        clearAll,
        hoverOnTitle,
        hoverOffTitle,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext
