import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import "./Login.css"
const SignUp = () => {
    const history=useHistory();
    const [user,setUser] = useState({
        uname:"",password:"",email:"",number:""
    });
    let name,value;
    const handleInputs=(event)=>{
        console.log(event);
        name=event.target.name;
        value=event.target.value;
        setUser({...user,[name]:value});
    }
    const PostData=async (event)=>{
        event.preventDefault();
        const {uname,password,email,number} =user;
        const res = await fetch("/Signup",{
            method : "POST",
            headers :{
                "content-Type": "application/json"
            },
            body : JSON.stringify(
                {
                    uname,password,email,number
                }
            )
        });
        const data = await res.json();
        if(data.status===400 || data.message==="error" || data.message ==="already exists")
        {
            window.alert(data.message);
            console.log("invalid");
        }
        else{
            window.alert(data.message);
            console.log(data);
            if(data.message==="successful signup")
                history.push("/Login");
        }
   }

    return (
        <div>
            
            <form method="POST" className='box' >
                 <h1>Sign Up</h1>
                <input type="text" placeholder="User Name"          name="uname"  value={user.uname} onChange={handleInputs}/>
                <input type="password" placeholder="PASSWORD"       name="password"  value={user.password} onChange={handleInputs}/>
                <input type="text" placeholder="abc@gmail.com"      name="email"  value={user.email} onChange={handleInputs}/>
                <input type="number" placeholder="Phone Number"     name="number"  value={user.number} onChange={handleInputs}/>
                <input type="submit" placeholder="Submit" onClick={PostData}/>
            </form>
        </div>
    )
}

export default SignUp;
