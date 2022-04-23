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
                        <NavLink to='/auth'>
                            {props.authenticate}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/bookings'>
                            {props.bookings}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/events'>
                            {props.events}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default NavBar;