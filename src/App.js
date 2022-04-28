import Header from './components/Header'
import Notice from './components/Notice'
import ProgressBar from './components/ProgressBar'
import List from './components/List'
import Footer from './components/Footer'
import { TodoProvider } from './context/TodoContext'

function App() {
  return (
    <TodoProvider>
      <div className='container'>
        <Header />
        <Notice />
        <ProgressBar />
        <List />
        <Footer />
      </div>
    </TodoProvider>
  )
}

export default App
