import { FaGithub, FaYoutube, FaLinkedinIn } from 'react-icons/fa'

function Footer() {
  const date = new Date()
  let year = date.getFullYear()
  return (
    <div className='footer'>
      <div className='sns'>
        <a href='https://github.com/bellhwi' target='_blank' rel='noreferrer'>
          <FaGithub />
        </a>
        <a
          href='https://www.linkedin.com/in/jonghwikim/'
          target='_blank'
          rel='noreferrer'
        >
          <FaLinkedinIn />
        </a>
        <a
          href='https://www.youtube.com/channel/UCMDLPQ99Hp5o-ri25xYd0mA'
          target='_blank'
          rel='noreferrer'
        >
          <FaYoutube />
        </a>
      </div>
      <small>bellhwi &copy; {year}</small>
    </div>
  )
}

export default Footer
