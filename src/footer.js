import React from 'react'
import './footer.css'


const footer = () => {

    const today = new Date();

    return (
    <footer>
        <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
  )
}

export default footer
