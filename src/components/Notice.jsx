import { useContext, useEffect } from 'react'
import TodoContext from '../context/TodoContext'
import { BiErrorCircle, BiCheckCircle } from 'react-icons/bi'

function Notice() {
  const { notice } = useContext(TodoContext)

  if (notice === 'alert') {
    return (
      <div className='notice alert'>
        <BiErrorCircle />
        <small>&nbsp;It's exist already ahem...</small>
      </div>
    )
  } else if (notice === 'updated') {
    return (
      <div className='notice updated'>
        <BiCheckCircle />
        <small>&nbsp;Update completed!</small>
      </div>
    )
  }
}

export default Notice
