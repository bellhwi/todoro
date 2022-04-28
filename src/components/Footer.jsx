import { FaGithub, FaItchIo, FaLinkedinIn } from 'react-icons/fa'

function Footer() {
  const date = new Date()
  let year = date.getFullYear()
  return (
    <div className='footer'>
      <div className='sns'>
        <a href='https://github.com/bellhwi' target='_blank' rel='noreferrer'>
          <FaGithub />
        </a>
        <a href='https://bellhwi.itch.io/' target='_blank' rel='noreferrer'>
          <FaItchIo />
        </a>
        <a
          href='https://www.linkedin.com/in/jonghwikim/'
          target='_blank'
          rel='noreferrer'
        >
          <FaLinkedinIn />
        </a>
      </div>
      <small>&copy; {year} bellhwi. All rights reserved. </small>
    </div>
  )
}

export default Footer
