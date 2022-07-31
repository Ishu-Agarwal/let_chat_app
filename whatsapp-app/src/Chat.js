import React, { useEffect, useState } from 'react';
import {Avatar, IconButton} from "@material-ui/core";
import './Chat.css';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined ,Mic, MessageSharp,ExitToApp} from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, getDoc, doc } from 'firebase/firestore/lite';
import db from './firebase';
import './Sidebar.css'
import { useStateValue } from './StateProvider';

function Chat() {
const [input,setinput] = useState("");
const { roomsId } =useParams();
const [roomName, setRoomname]=useState("");
const [seed,setSeed]= useState("");
const [date,setdate]= useState("");
const [messages,setmessages]= useState([]);
const [{user},dispatch] =useStateValue();
  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000));
  },[]);

useEffect(()=>{
    if(roomsId){
      setSeed(roomsId[0]);
      const go = async() =>{ 
      const res = await fetch("/Showmessage",{
        method : "POST",
        headers :{
            "content-Type": "application/json"
        },
        body : JSON.stringify(
            {
                email: user.email,
                femail: roomsId
            }
        )
    });
    const data = await res.json();
    if(data.status=== 400)
    {
        window.alert(data.message);
        console.log("invalid");
    }
    else{
      data.sort((a, b) => a.doa > b.doa ? 1 : -1);
        setmessages(data);
        if(data.length) setdate(data[data.length-1].doa) 
        console.log(data);
    }
  }
  go();
      
    }
},[roomsId])

const Logout = () => {
  window.localStorage.clear();
  window.location.reload();
}
const sendMessage = async (event) =>{
  event.preventDefault();
  console.log(input);
  const res = await fetch("/Addmessage",{
    method : "POST",
    headers :{
        "content-Type": "application/json"
    },
    body : JSON.stringify(
        {
            message: input,
            email: user.email,
            doa: new Date(),
            femail: roomsId
        }
    )
  });
  const data = await res.json();
  if(data.status=== 400)
  {
      window.alert(data.message);
      console.log("invalid");
  }
  else{
    window.location.reload();
  }
  setinput("");
}

  return (
    <div className="chat">
        <div className="chat__header">
          {roomsId? <Avatar>{seed}</Avatar> : <></>}
          <div className="chat__headerInfo">
            <h3 >{roomsId}</h3>
              { date ? <p>{new Date( date).toUTCString()}</p>: <></>} 
          </div>
          <div className="chat__headerRight">
            <IconButton>
              <AttachFile/>
            </IconButton>
            <IconButton>
              <MoreVert/>
            </IconButton>
            <IconButton>
              <ExitToAppIcon onClick={Logout}/>
            </IconButton>
          </div>
        </div>
        <div className="chat__body">
          {
            messages.map(message => (
              <p className={`chat__message ${message.email===user.email && "chat__receiver"}`}> 
              <span className="chat__name">{message.email}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.doa).toUTCString()}
              </span>
            </p>
            ))
          }
        </div>

        <div className="chat__footer">
            <InsertEmoticonIcon/>
            <form>
              <input  value={input} onChange={e=>setinput(e.target.value)} placeholder='Type a message' type="text"/>
              <button onClick={sendMessage} type='submit'> Send a message</button>
            </form>
            <MicIcon/>
          </div>
          
    </div>
  )
}

export default Chat;
