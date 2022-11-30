import { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import {  FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
const Navbar = () => {
    return (
      <Wrapper>
            
            <div className="nav-center">
                <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => console.log('toggled')}
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
                        onClick={()=>{console.log('show/hide')}}
                    >
                        <FaUserCircle />
                        john
                        <FaCaretDown/>
                    </button>
                    <div className="dropdown show-dropdown">
                        <button
                            type="button"
                            className='dropdown-btn'
                            onClick={()=>console.log('logout')}
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