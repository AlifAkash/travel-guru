import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import logo from "../travel-guru/Logo.png";
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Header = () => {
    const searchIcon = <SearchIcon></SearchIcon>;
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();

    const handleSignIn = () => {
        history.push("/logIn");
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(function() {
                const signedOutUser = {
                    isSignedIn: false,
                    name: "",
                    email: "",
                    password: "",
                    success: false
                }
                setUser(signedOutUser); 
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    return (
        <div className="Header">
            <Link to="/home">
                <img src={logo} alt=""/>
            </Link>
            <div className="search">
                <input class="mainLoginInput" type="text" placeholder="Search your destination"/>
            </div>
            <Link to="/news" className="link">
                News
            </Link>
            <Link to="/destination" className="link">
                Destination
            </Link>
            <Link to="/blog" className="link">
                Blog
            </Link>
            <Link to="/contract" className="link">
                Contract
            </Link>
            {
                user.email ? <button onClick={handleSignOut} className="loginButton">Logout</button> : <button onClick={handleSignIn} className="loginButton">Login</button> 
            }
        </div>
    );
};

export default Header;