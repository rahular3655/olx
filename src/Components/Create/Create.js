import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
// import {FirebaseContext, AuthContext} from '../../store/Context'
import {AuthContex,FirebaseContext } from '../../store/Context'


const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContex)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null);
  const date = new Date
  const history = useHistory()
  const [errorimg, setErrorimg] = useState({})
  const [error, setError] = useState("")
  const handleSubmit = () =>{

  console.log("handleSubmit")

      if(name==='' || category==='' || price===''){
        console.log("25")
setError("Please Fill All Fields")
console.log(name)
console.log(category)
console.log(price)
      }else{

        try{
          firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
            ref.getDownloadURL().then((url)=>{
              console.log(user)
              firebase.firestore().collection('products').add({
                name,
                category,
                price,
                url,
                userId : user.uid,
                createdAt : date.toDateString()
              })
              history.push('/')
            })
          }).catch((error)=>console.log("error"))
        }
        catch{
          setError("Please add an Image")
          setErrorimg({color:"red"})
    
         }

        }
        
      




  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         
          
        <center>
        <h3 style={{fontWeight:"800",
        transform: "translateY(-30px)"}}>Add new Item</h3>
        </center>
      <span style={{color:"red"}} >{error}</span>
      <br></br>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value = {name}
              onChange={(e) => setName(e.target.value)}

              style={{width:"100%"}}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value = {category}
              onChange={(e) => setCategory(e.target.value)}
              defaultValue = 'John'
              style={{width:"100%"}}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
            type="number" 
            id="fname" 
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            defaultValue = 'John'
            style={{width:"100%"}}
            />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : '' } style={{marginBottom:"18px",marginLeft:"60px"}}></img>
            <br />
            <input onChange={(e)=>{ setImage(e.target.files[0])}} type="file"  style={errorimg}/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;