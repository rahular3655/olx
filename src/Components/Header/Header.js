import React,{useContext,useState} from 'react';

import {useHistory} from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContex, FirebaseContext } from '../../store/Context';

import SweetAlert2 from 'react-sweetalert2';




function Header() {
  const history = useHistory()

  const {firebase } = useContext(FirebaseContext)
  const {user}= useContext(AuthContex)
 

  const [swalProps, setSwalProps] = useState({});
  const [conformlogout ,setConformlogout] =useState({})
function HandleLogout(){
 
  setSwalProps({
    show: true,
    title: 'Are you sure?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Logout',
    // timer: 2000,
}); 

}
function ConformLogout(){
console.log("conform logout")
  setConformlogout({
    show:true,
    title:"Succesfully Logged out",
    timer: 2000,
    showConfirmButton: false,
    icon: 'success',
  })

}





  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">

          {user ? <span style={{cursor:"pointer"}}>Welcome {user.displayName }</span>:<span onClick={()=>history.push("/login")} style={{cursor:"pointer"}}>Login</span>}
    
          <hr />
         
        </div>
        {user && <span onClick={HandleLogout
        } style={{cursor:"pointer"}}>Logout</span> }
       
        <SweetAlert2 {...swalProps}
                didOpen={() => {
                    // run when swal is opened...
                    console.log("run when swal is opened...")
                    
                }}
                didClose={() => {
                    // run when swal is closed...
                    console.log("run when swal is closed...")
                }}
                onConfirm={result => {
                    // run when clieked in confirm and promise is resolved...
                    console.log("run when clieked in confirm and promise is resolved...")
                    firebase.auth().signOut();
                   
                    setSwalProps({show:false})
                    ConformLogout()
                }}
                onError={error => {
                    // run when promise rejected...
                    console.log("run when promise rejected...")
                }}
                onResolve={result => {
                  
                    // run when promise is resolved...
                    console.log(" run when promise is resolved...")
                    setSwalProps({show:false})
                   
                }}
            />
            <SweetAlert2 {...conformlogout}
                didOpen={() => {
                    // run when swal is opened...
                    console.log("run when swal is opened...")
                    
                }}
                didClose={() => {
                    // run when swal is closed...
                    console.log("run when swal is closed...")
                }}
                onConfirm={result => {
                    // run when clieked in confirm and promise is resolved...
                    console.log("run when clieked in confirm and promise is resolved...")
                    
                }}
                onError={error => {
                    // run when promise rejected...
                    console.log("run when promise rejected...")
                }}
                onResolve={result => {
                  
                    // run when promise is resolved...
                    setConformlogout({show:false})
                    history.push('/login')
                   
                }}
            />

       

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
           
            {user ? <span onClick={()=>history.push('/create')} >SELL</span> : <span onClick={()=>history.push('/login')} >SELL1</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
