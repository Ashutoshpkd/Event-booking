import React from "react";
import { NavLink } from "react-router-dom";
import classes from './NavBar.module.css';


const NavBar = (props) => {

    return(
        <header className={classes.header}>
            <h1>
            {props.title}
            </h1>
            <nav className={classes.navbar}>
                <ul className={classes.list_container}>
                    <li>
                      {!props.token && (
                        <NavLink to='/auth' className={(navData) => navData.isActive ? classes.active : ''}>
                            {props.authenticate}
                        </NavLink>
                      )}
                    </li>
                    <li>
                        {props.token && (
                            <NavLink to='/bookings' className={(navData) => navData.isActive ? classes.active : ''}>
                            {props.bookings}
                        </NavLink>
                        )}
                    </li>
                    <li>
                        <NavLink to='/events' className={(navData) => navData.isActive ? classes.active : ''}>
                            {props.events}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default NavBar;