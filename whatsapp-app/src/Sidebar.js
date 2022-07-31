import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { getFirestore, collection, getDocs ,addDoc } from 'firebase/firestore/lite';
import db from './firebase';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {Avatar, IconButton} from "@material-ui/core";
import { deepOrange } from '@material-ui/core/colors';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { useStateValue } from './StateProvider';


function Sidebar() {
    const [input,setinput] = useState("");
    const [room,setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();
    
    useEffect( ()=>{
        const go =async()=>{
        const res = await fetch("/Show",{
            method : "POST",
            headers :{
                "content-Type": "application/json"
            },
            body : JSON.stringify(
                {
                    email: user.email
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
            data.sort((a, b) => a.doa < b.doa ? 1 : -1);
            setRooms(data);
        }
    }
        go();
    },[])

    const createChat = async (e)=>{
        e.preventDefault();
            console.log(input);
            const res = await fetch("/Add",{
                method : "POST",
                headers :{
                    "content-Type": "application/json"
                },
                body : JSON.stringify(
                    {
                        doa:new Date(),
                        email: user.email,
                        femail: input
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
                window.alert(data.message);
                window.location.reload();
                console.log(data);
            }
        setinput("");
      };

  return (
    <div className='sidebar'>
        <div className="sidebar__header">
        <Avatar src={user?.photoURL}/>
            <div className="sidebar__headerRight">
                {user.displayName}
            <IconButton>
                <DonutLargeIcon/>
            </IconButton>
            <IconButton>
                <ChatIcon/> 
            </IconButton>
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
            </div>
        </div>
        <form>
        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                <SearchOutlined/>
                <input value={input} placeholder=" start new chat " type="text" onChange={e=>setinput(e.target.value)} />
                <button onClick={createChat} type='submit'> Send a message</button>

            </div>
        </div>
        </form>
        <div className="sidebar_chats">
            {room.map(room=>(<SidebarChat name={room.femail} doa = {room.doa} />))}
        </div>
    </div>
  )
}

export default Sidebar;