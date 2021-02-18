import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './Navbar.css';

export const MenuItems = [
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

class Navbar extends Component {
  render() {
    return(
      <div>
        <div className="logo-container">
          <img src = "FSD_Logo_RGB_horizonal_300 2.png" alt="feedLogo" id="logo"></img>
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
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;