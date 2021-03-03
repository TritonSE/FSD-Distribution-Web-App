import React from 'react';
import { useHistory, Link } from "react-router-dom";
import './Navbar.css';
import { logout } from "../../auth";

const MenuItems = [
  {
    title: 'Home',
    url: '/',
    className: 'nav-links'
  },
  {
    title: 'Agency',
    url: '/agency',
    className: 'nav-links'
  },
];

/**
 * Component produces a navigational bar that provides links to all the paths listed in MenuItems
 */
const Navbar = (props) => {
  const history = useHistory();

  const handleLogout = (event) => {
    logout();
    history.push("/");
    props.changeIsLogged(false);
  }


  let menuItem = null;
  props.isLogged ? menuItem = (
    <li>
      <Link className="nav-links" as={Link} to="#" onClick={handleLogout}>
        Logout
      </Link>
    </li>
  ) : menuItem = (
    <li>
      <Link className="nav-links" as={Link} to="/login">
        Login
      </Link>
    </li>
  );

  return (
    <div>
      <div className="logo-container">
        <img src="fsd_logo300.png" alt="feedLogo" id="logo"></img>
      </div>
      <nav className="NavbarItems">
        <ul className='nav-menu'>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.className} as={Link} to={item.url}>
                  {item.title}
                </Link>
              </li>
            )
          })}
          {menuItem}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
