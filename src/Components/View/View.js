import React,{useEffect,useContext,useState} from 'react';
import { FirebaseContext,AuthContex } from '../../store/Context';
import  { PostContext } from '../../store/PostContext';
import {useHistory} from 'react-router-dom'
import './View.css';
function View() {
  const history = useHistory()
  const [userDetails, setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)
  const {user}= useContext(AuthContex)
  const [seller,setSeller] = useState(false)
  useEffect(()=>{
    if(user){
      setSeller(true)
    }

    console.log(user)
  const {userId} = postDetails

    firebase.firestore().collection('users').where('id','==',userId).get().then(
(res)=>{
  console.log(res)
  console.log(userId)
  res.forEach(doc=>{
    console.log("*")
    console.log(doc.data())
    setUserDetails(doc.data())
  })
})

  },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <br></br>
          <p>Product : <span style={{fontWeight:"100"}}>{postDetails.name}</span></p>
   
          <p>Category: {postDetails.category}</p>
          <p>Posted: </p>
          <span>{postDetails.createdAt}</span>
        </div>
    {user ? '':<h4 >Please <span onClick={()=>history.push("/login")} style={{color:"red",
  cursor:"pointer"
  }}>Log in</span> to View Seller's Details</h4>}

      {userDetails &&  <div className={user ? "contactDetails":"hide"}>
          <p>Seller details</p>
          <p>name: {user ? userDetails.username:''}</p>
          <p>Phone: {user ? userDetails.phone:''}</p>
        </div>
        }
      </div>

    </div>
  );
}
export default View;
