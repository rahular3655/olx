import React, { useState,useContext } from 'react';
import {FirebaseContext} from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Signup.css';
import {useHistory} from 'react-router-dom'

export default function Signup() {
  const history = useHistory()
  const [username, setUsername] = useState('');
  const [email , setEmail] =useState('');
  const [phone, setPhone] = useState('');
  const [password,setPassword] = useState('');
  const [redborderuser , setRedborderuser] = useState({});
  const [redborderpass , setRedborderpass] = useState({});
  const [redborderemail , setRedborderemail] = useState({});
  const [redbordernumber , setRedbordernumber] = useState({});

  const [errormesssage,setErrormessage] =useState('');
const {firebase} = useContext(FirebaseContext)

const handlesubmit=(e)=>{

  e.preventDefault()

if(username==='' || email==='' || phone==='' || password===''){
  setErrormessage("Please Fill All Fields")
  console.log("EMpty fields")
}
    if(username===''){
console.log("username")
setRedborderuser({borderBottom:"1px solid red"})
    }
    else if(email===''){
      console.log("email")
      setRedborderemail({borderBottom:"1px solid red"})
    }
    else if(phone===''){
      console.log("Phone")
      setRedbordernumber({borderBottom:"1px solid red"})
    }
    else if(password===''){
      console.log("password")
      setRedborderpass({borderBottom:"1px solid red"})
    }
    else{

      console.log("Success")


        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (result)=>{
    result.user.updateProfile({displayName:username}).then(()=>{
      firebase.firestore().collection('users').add({
        id:result.user.uid,
        username:username,
        phone:phone
      }).then(async ()=>{
        await firebase.auth().signOut();
        history.push("/login")
      }).catch((error) => {
 
      
        if(error.code==="auth/email-already-in-use"){
          setErrormessage("Email Already in Use")
          console.log("Emaiil in use")

        }

      });
    })
  }).catch((error)=>
  {
    if(error.code==="auth/email-already-in-use"){
      setErrormessage("Email Already in Use")
      console.log("Emaiil in use")
      setRedborderemail({borderBottom:"1px solid red"})

    }

  }
  )
    }

}


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="olxlog"
         style={{filter: "drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5))"}}
         onClick={()=>history.push('/')}
        ></img>
        <form onSubmit={handlesubmit}>
        <span className='errorbox' style={{color:"red"}}><sub>{errormesssage}</sub></span>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name={username}
            placeholder="Username"
            onChange={(e)=>setUsername(e.target.value)}
            style={redborderuser}

          />
          <br />
          
          <br />
          <input
            className="input"
            type="email"
            id="emil"
            name="email"
            placeholder='Email'
            onChange={(e)=>setEmail(e.target.value)}
            style={redborderemail}
          />
          <br />
        
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            placeholder='Number'
            onChange={(e)=>setPhone(e.target.value)}
            style={redbordernumber}
          />
          <br />
         
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            placeholder='Password'
            onChange={(e)=>setPassword(e.target.value)}
            style={redborderpass }
          />
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <a onClick={()=>{
          history.push("/login")
        }}>Login</a>
      </div>
    </div>
  );
}
