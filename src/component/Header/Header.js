/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser,setLoggedInUser] =useContext(userContext);
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to ="/shop">Shop</Link>
                <Link to="/review">Review Order</Link>
                <Link to="/manage">Manage Inventory</Link>
                <button onClick={()=>{setLoggedInUser({})}}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;