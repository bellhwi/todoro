import { useContext, useEffect } from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import TodoContext from '../context/TodoContext'

function List() {
  const { todoList, enterEditMode, moveTodo, finishedList, deleteTodo } =
    useContext(TodoContext)

  return (
    <>
      <div className='list unfinished'>
        <h4>IN-PROGRESS ({todoList.length})</h4>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>
              <p onClick={moveTodo}>{todo}</p>
              <div
                className='btn'
                onClick={enterEditMode}
                style={{ marginRight: '3rem' }}
              >
                <FaEdit pointerEvents='none' />
              </div>
              <div className='btn' onClick={deleteTodo}>
                <FaTrashAlt pointerEvents='none' />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='list finished'>
        <h4>COMPLETED ({finishedList.length})</h4>
        <ul>
          {finishedList.map((todo, index) => (
            <li key={index}>
              <p onClick={moveTodo}>{todo}</p>
              <div
                className='btn'
                onClick={enterEditMode}
                style={{ marginRight: '3rem' }}
              >
                <FaEdit pointerEvents='none' />
              </div>
              <div className='btn' onClick={deleteTodo}>
                <FaTrashAlt pointerEvents='none' />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default List
