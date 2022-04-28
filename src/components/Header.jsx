import { useContext } from 'react'
import TodoContext from '../context/TodoContext'

function Header() {
  const {
    todo,
    editMode,
    addTodo,
    updateTodo,
    displayTodo,
    clearAll,
    hoverOnTitle,
    hoverOffTitle,
  } = useContext(TodoContext)
  return (
    <>
      <h1
        onClick={clearAll}
        onMouseOver={hoverOnTitle}
        onMouseOut={hoverOffTitle}
      >
        todoro
      </h1>
      <form onSubmit={editMode ? updateTodo : addTodo}>
        <input
          autoFocus
          type='text'
          placeholder={editMode ? 'Update your todo' : 'Type and press enter'}
          onChange={displayTodo}
          value={todo}
          className='todo-input'
        />
      </form>
    </>
  )
}

export default Header
