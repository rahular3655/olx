
import React, { useState,useContext } from 'react';
import {FirebaseContext,AuthContex} from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory,Redirect} from 'react-router-dom'

function Login() {
  const {user}= useContext(AuthContex)
  console.log("********")
  console.log(user)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()
  const [redborderemail , setRedborderemail] = useState({})
  const [redborderpass , setRedborderpass] = useState({})
  const [errormesssage,setErrormessage] =useState('')




  const handleLogin=(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      // alert('Logged In')
      history.push("/")
    }).catch((error)=>{
      console.log(error)
      if(error.code==='auth/invalid-email'){
       console.log("why")
        setRedborderemail({borderBottom:"1px solid red"})
        setErrormessage("❗️Please Fill All Fields")

      }
      else if(error.code==='auth/wrong-password'){
        console.log("Fill out All field")
        setRedborderpass({borderBottom:"1px solid red"})
        setErrormessage("❗️Please Fill All Fields")
      }
      else if(error.code==='auth/user-not-found'){
        console.log("user not fouund")
        setErrormessage("❗️Wrong Password or Email")
      }
      // alert(error.message)
    })
  }




  return (
    <div>
      {user ? <Redirect to="/" ></Redirect>:console.log("false")}
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}
        style={{filter: "drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5))"}}
        onClick={()=>history.push('/')}
        ></img>
        <form  onSubmit={handleLogin}>
        <span className='errorbox' style={{color:"red"}}><sub>{errormesssage}</sub></span>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Email"
            style={redborderemail}
          />

          <br />
      
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder='Password'
            style={redborderpass}
          />
          <br />
          <br />
          <button>Login</button>
         
        </form>
        <a onClick={()=>{
          history.push("/signup")
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
