
import  links  from "../../utils/links"
import { NavLink } from 'react-router-dom'
const NavLinks = ({toggleSideBar}) => {
  return (
    <div className="nav-links">

  {
    links.map((link) => {
                  
      const { text, path, id, icon } = link
      const Icon=icon
      return   <NavLink to={path} key={id} onClick={toggleSideBar} className={({isActive})=>isActive?'nav-link active':'nav-link'}>
          <span className="icon">
            <Icon/><span className="text">
            {text}
              </span>
          </span>
                      
        </NavLink>
    })
  }
</div>
  )
}


export default NavLinks