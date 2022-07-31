import React,{useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { LoginContext } from './App';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

const Login = () => {
    const [{},dispatch] = useStateValue();
    //api key for google services
    const SignIn=()=>{
        signInWithPopup(auth, provider)
        .then(result=> {
            console.log(result.user.email);
            dispatch({
                type: actionTypes.SET_USER,
                user:result.user,
            })
            window.localStorage.setItem('login',JSON.stringify(result.user));
        })
        .catch((error)=> alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/768px-WhatsApp.svg.png?20220228223904" alt="" />
                <div className="login__text">
                    <h1>Sign in Whatsapp</h1>
                </div>
                <Button type="submit" onClick={SignIn} >
                    SignIn with google
                </Button>
            </div>
        </div>
    )
}
export default Login;
