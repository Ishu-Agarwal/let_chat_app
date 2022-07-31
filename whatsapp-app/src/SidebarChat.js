import React, { useEffect, useState } from 'react';
import "./SidebarChat.css";
import {Avatar} from "@material-ui/core";
import { getFirestore, collection, getDocs ,addDoc } from 'firebase/firestore/lite';
import db from './firebase';
import { Link, useParams } from 'react-router-dom';

function SidebarChat(props) {
  const [seed,setSeed]= useState("");
  const name = props.name;
const date =props.doa;
  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000));
  },[]);

  return(
    <Link to={`./rooms/${name}`}>
      <div className="sidebarChat">
        <Avatar> {name[0]}</Avatar>
        <div className="sidebarChat_info">
            <h2>{name}</h2>
            <p>
            {new Date(date).toUTCString()} 
            </p>
        </div>
    </div>
    </Link>
  ) 
}

export default SidebarChat;