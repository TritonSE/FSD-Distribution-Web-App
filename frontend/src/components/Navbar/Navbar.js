import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './Navbar.css';
import { isAuthenticated } from "../../auth";

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
class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: isAuthenticated()
    };
  }

  // componentDidMount() {
  //   if (!isAuthenticated()) {
  //     this.setState({
  //       MenuItems:
  //         [...this.state.MenuItems, {
  //           title: 'Login',
  //           url: '/login',
  //           className: 'nav-links'
  //         }]
  //     });
  //   } else {
  //     this.setState({
  //       MenuItems:
  //         [...this.state.MenuItems, {
  //           title: 'Logout',
  //           url: '/logout',
  //           className: 'nav-links'
  //         }]
  //     });
  //   }
  // }

  render() {
    let menuItem = null;
    this.state.authenticated ? menuItem = (
      <li>
        <Link className="nav-links" as={Link} to="/logout">
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
}

export default Navbar;
