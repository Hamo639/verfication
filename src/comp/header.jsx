import React from "react";
import {  Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { signOut } from "firebase/auth";




const Header = () => {
  const [user ] = useAuthState(auth);

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="myheader">

      <header className="hide-when-mobile hamo">
        <h1>
    
          <Link to="/"> Hamoashraf </Link>
        </h1>
      

        <i style={{marginTop:"7px"}}
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i style={{marginTop:"7px"}}
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

        <ul className="flex">



          {!user && <li className="main-list">
            <NavLink className="main-link" to="/signin">
              Sign-in
            </NavLink>

          </li>}



          {!user && <li className="main-list">
            <NavLink className="main-link" to="/signup">
              Sign-up
            </NavLink>

          </li>}


          {user && <li onClick={() => {
            signOut(auth).then(() => {
              console.log("Sign-out successful.")
            }).catch((error) => {
              // An error happened.
            });
          }} className="main-list">
            <button className="main-link signout">
              Sign-out
            </button>

          </li>}


          {user && <li className="main-list">
            <NavLink className="main-link about" to="/about">
              About
            </NavLink>

          </li>}

  
          {user && <li className="main-list">
            <NavLink className="main-link profile" to="/profile">
              Profile
            </NavLink>
        
          </li>}


        </ul>
      </header>



 
  
  
    </div>
  );
};

export default Header;
