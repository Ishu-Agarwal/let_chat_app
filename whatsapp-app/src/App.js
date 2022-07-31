
import React ,{createContext,useEffect,useState}from "react";
import {BrowserRouter as Router,Routes ,Route,Link} from "react-router-dom";
import './App.css';
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { actionTypes } from './reducer';

// import Signup from "./Signup"


function App() {
  const [{user},dispatch]=useStateValue();
  useEffect(()=>{
    if ( window.localStorage.getItem("login") !== null) {
      const form = window.localStorage.getItem('login');
      const val=JSON.parse(form);
      dispatch({
        type: actionTypes.SET_USER,
        user:val,
    })
    }
  },[]);
  

  return (

    <div className="app">
      {!user ?
        (<Login/>):
        (
          <div className="app__body">
            <Router>
                <Sidebar/>
                <Routes>
                  <Route exact path="/rooms/:roomsId" element={<Chat/>}/>
                  <Route exact path="/" element={<Chat/>}/>
                </Routes>
            </Router>
          </div>
        )
      }
    </div>

      
  );
}

export default App;
