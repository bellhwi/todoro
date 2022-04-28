import { useContext } from 'react'
import TodoContext from '../context/TodoContext'

function ProgressBar() {
  const { progressPercentage, bgStyle } = useContext(TodoContext)

  return (
    <div className='progress-container'>
      <span>
        {isNaN(progressPercentage)
          ? '0%'
          : Math.round(progressPercentage) + '%'}
      </span>
      <div className='progress-bar' style={bgStyle}></div>
    </div>
  )
}

export default ProgressBar
