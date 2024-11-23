
import Wrapper from "../assets/wrappers/LandingPage"
import main from "../assets/images/main.svg"
import {Logo} from "../components"

import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
       <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Job <span>Tracking </span>App</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat soluta possimus ratione reiciendis, voluptatum nam ea dicta sit voluptate alias iusto aliquid nostrum commodi esse, laboriosam quasi qui accusantium pariatur!

          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn register-link'>
            Login / Demo User
          </Link>

        </div>
        <img src={main} alt="Job Hunt" className='img main-img' />
      </div>

    </Wrapper>
  )
}

export default Landing