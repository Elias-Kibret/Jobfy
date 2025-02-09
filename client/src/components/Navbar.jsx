import { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import {  FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false)
    const {user, toggleSideBar,logoutUser}=useAppContext()
    return (
      <Wrapper>
            
            <div className="nav-center">
                <button
                    type="button"
                    className="toggle-btn"
                    onClick={toggleSideBar}
                >
                    <FaAlignLeft />
                </button>
                    <div>
                        <Logo />
                        <h3 className="logo-texty">Dashboard</h3>
                    </div>
                <div className='btn-container'>
                    <button
                        type="button"
                        className='btn'
                        onClick={()=>{setShowLogout(!showLogout)}}
                    >
                        <FaUserCircle />
                   
                        {user?.name}
                        <FaCaretDown />
                    </button>
                    <div className={ showLogout?'dropdown show-dropdown':'dropdown'}>
                        <button
                            type="button"
                            className='dropdown-btn'
                            onClick={logoutUser}
                        >
                         logout
                        </button>
                    </div>
                    </div>
         </div>
      </Wrapper>
  )
}
export default Navbar