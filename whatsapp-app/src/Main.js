import React,{useState,useEffect } from 'react';
import {useContext} from 'react';
import { LoginContext} from './App';
import './App.css';
import Chat from "./Chat";
import Sidebar from "./Sidebar";

const Main = () => {
  // const [isLogin, setIsLogin] =  useContext(LoginContext);
  // useEffect(()=>{
  //   window.localStorage.setItem('login',JSON.stringify({user:isLogin,lab:isLabLogin}));
  // })
  return (
    <div className="app">
      <div className="app__body">
      <Sidebar/>
      <Chat/>
      </div>
    </div>
  )
}

export default Main;
