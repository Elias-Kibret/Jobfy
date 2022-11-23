import {Logo} from '../components'
import main from '../assets/images/main-alternative.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
      <Wrapper>
          <nav>
              <Logo/>
          </nav>
          <div className="container page">
              <div className='info'>
                  <h1>
                      Job <span>Tracking</span> App
                  </h1>
                  <p>
                  I'm baby same +1 lyft ramps, crucifix truffaut coloring book tacos locavore waistcoat vinyl post-ironic fanny pack. Hashtag occupy umami 3 wolf moon, master cleanse brunch bodega boys ethical vape affogato schlitz. Small batch activated charcoal fit migas, health goth af scenester Brooklyn chillwave lyft gatekeep XOXO four loko 8-bit.   
                  </p>
                  <Link to='/register' className='btn btn-hero'>Login/Register</Link>
              </div>
              <div>
                  
              <img src={main} alt="job hunt" className='img'/>
              </div>
          </div>
    </Wrapper>
  )
}



export default Landing