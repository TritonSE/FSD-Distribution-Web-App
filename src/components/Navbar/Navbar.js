import React, {Component} from 'react';
import { MenuItems } from "./MenuItems"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import './Navbar.css'
import Home from "../../pages/Home/Home";
import Agency from "../../pages/Agency/Agency";
import AgencyProfileForm from "../../pages/agency-profile-form/AgencyProfileForm";


class Navbar extends Component {
    render() {
        return(
            <div>
                <div className="logo-container">
                    <img src = "FSD_Logo_RGB_horizonal_300 2.png" alt = "feedLogo" id = "logo"></img>
                </div>

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
                    <Switch>
                        <React.Fragment>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/agency" component={Agency}/>
                            <Route exact path="/create-agency" component={AgencyProfileForm}/>
                        </React.Fragment>
                        
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Navbar