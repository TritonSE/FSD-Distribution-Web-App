import React, {Component} from 'react';
import { MenuItems } from "./MenuItems"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import './Navbar.css'
import Home from "../Home";
import Agency from "../Agency";


class Navbar extends Component {
    render() {
        return(
            <div>
                <nav className="NavbarItems">
                    <ul className='nav-menu'>
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index}> 
                                    <Link className={item.cName} as={Link} to={item.url}>
                                        {item.title}
                                    </Link>
                                </li>
                            )

                        })}
                    </ul>
                </nav>
                <div>
                    <switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/agency" component={Agency}/>
                    </switch>
                </div>
            </div>
        )
    }
}

export default Navbar