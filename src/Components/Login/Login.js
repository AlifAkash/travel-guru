import React, { useContext, useState } from 'react';
import "./Login.css";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import fbLogo from "../travel-guru/Icon/fb.png";
import googleLogo from "../travel-guru/Icon/google.png";
import { UserContext } from '../../App';

//©
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [returnUser, setReturnUser] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const { displayName, email } = result.user;
                const signedInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                }
                setUser(signedInUser);
                history.replace(from);
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then(function (result) {
                const { displayName, email } = result.user;
                const newUserInfo = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                }
                setUser(newUserInfo);
                history.replace(from);
            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const handleBlur = (e) => {
        let isFieldValid = true;

        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber
        }

        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (!returnUser && user.email && user.password) {
            console.log("submit");
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = "";
                    newUserInfo.isSignedIn = true;
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.isSignedIn = false;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (returnUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = "";
                    newUserInfo.isSignedIn = true;
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.isSignedIn = false;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        e.preventDefault();
        e.target.reset();
    }

    return (
        <div className="Login">
            {
                returnUser ?
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <form onSubmit={handleSubmit} className="form">
                            <h2 style={{ color: "black" }}>Log In</h2>
                            <br />
                            <input
                                onBlur={handleBlur}
                                className="formInput"
                                type="email"
                                name="email"
                                placeholder="email" />
                            <br />
                            <input
                                onBlur={handleBlur}
                                className="formInput"
                                type="password"
                                name="password"
                                placeholder="password" />
                            <br />
                            <input
                                className="formInput"
                                type="password"
                                placeholder="Confirm password" />
                            <br />
                            <input
                                className="formBtn"
                                type="submit"
                                value="Log In" />
                            <p style={{ justifyContent: "flex-end", display: "flex", cursor: "pointer" }}><small onClick={() => setReturnUser(!returnUser)} >Don't have an account? SignUp</small></p>
                        </form>
                    </div>
                    :
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <form onSubmit={handleSubmit} className="form">
                            <h2 style={{ color: "black" }}>Create an account</h2>
                            <br />
                            <input
                                onBlur={handleBlur}
                                className="formInput"
                                type="text"
                                name="firstName"
                                placeholder="first name" />
                            <br />
                            <input
                                onBlur={handleBlur}
                                className="formInput"
                                name="lastName"
                                type="text"
                                placeholder="last name" />
                            <br />
                            <input
                                onBlur={handleBlur}
                                className="formInput"
                                type="email"
                                name="email"
                                placeholder="email" />
                            <br />
                            <input
                                onBlur={handleBlur}
                                className="formInput"
                                type="password"
                                name="password"
                                placeholder="password" />
                            <br />
                            <input
                                className="formInput"
                                type="password"
                                placeholder="Confirm password" />
                            <br />
                            <input
                                className="formBtn"
                                type="submit"
                                value="Create an account" />
                            <p style={{ justifyContent: "flex-end", display: "flex", cursor: "pointer" }}><small onClick={() => setReturnUser(!returnUser)} >Already have an account? LogIn</small></p>
                        </form>
                    </div>
            }
            {
                user.success ? <p style={{ color: "green" }}>User {returnUser? "Logged In" : "Created"} Successfully</p> : <p style={{ color: "red" }}>{user.error}</p>
            }
            <div className="horizontal">
                <p><span>or</span></p>
            </div>
            <div className="iconBtnSce">
                <button onClick={handleGoogleSignIn} className="btn"><img src={googleLogo} alt="" />Continue with Google</button>
                <br />
                <button onClick={handleFbSignIn} className="btn"><img src={fbLogo} alt="" />Continue with FaceBook</button>
            </div>
        </div>
    );
};

export default Login;