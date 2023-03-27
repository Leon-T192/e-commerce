import axios from 'axios';
import React, { useState } from 'react';
import FormErrors from './FormErrors'

const Register = () => {

  const [input, setInput] = useState({
      name:"",
      email:"",
      pass:"",
      phone:"",
      address:"",
  });
  const [errors, setErrors] = useState({});
  const [getFile, setFile] = useState([]);
  const [avatar, setAvatar] = useState()
  const fileTypes = ["png", "jpg", "jpeg"];
  const handleInput = (e) => {
      const nameInput = e.target.name;
      const valueInput = e.target.value;
      setInput(state => ({...state,[nameInput]:valueInput}))
  };


  function handleFile(e) {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  }; 

  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;
    
    if(input.name == ""){
      errorsSubmit.name = "Please enter your Name!"
      flag = false
    }
    if(input.email == ""){
      errorsSubmit.email = "Please enter your email!"
      flag = false
    }else{
      const regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regEx.test(input.email)){
        errorsSubmit.email = "Invalid email!"
        flag = false
      }
    }
    if(input.pass == ""){
      errorsSubmit.pass = "Please enter your password!"
      flag = false
    }
    if(input.phone == ""){
      errorsSubmit.phone = "Please enter your phone number!"
      flag = false
    }
    if(getFile.length==0){
      errorsSubmit.avatar = "Please select avatar!"
      flag = false
    }else{
      let getImgSize = getFile.size;
      let getImgType = getFile.name;

      if(getImgSize > 1024 * 1024){
        errorsSubmit.avatar = "Your file must be less than 1Mb!"
        flag = false
      }else{
        let duoifile = getImgType.split(".",2)[1]
        if(!fileTypes.includes(duoifile)){
          errorsSubmit.avatar = "Invalid file!"
          flag = false
        }
      }
    }
    if(!flag){
      setErrors(errorsSubmit)
    }else{
      setErrors("");
      
      const data = {
        name: input.name,
        email: input.email,
        password: input.pass,
        phone: input.phone,
        address:input.address,
        level: 0,
        avatar:avatar
      }
      axios.post("http://localhost/laravel/public/api/register", data)
      .then((res) => {
        console.log(res);
        if(res.data.errors){
          setErrors(res.data.errors)
        }else{
          alert("thanh cong")
        }
      })
    }
  }

  return (
    <div className="signup-form">{/*sign up form*/}
        <h2>New User Signup!</h2>
        <form enctype="multipart/form-data"
              onSubmit={handleSubmit}>
            <input 
            name="name"
            type="text"
            onChange={handleInput}
            placeholder="name" 
            />
            <input 
            name="email"
            type="text" 
            onChange={handleInput}
            placeholder="Email Address" 
            />
            <input 
            name="pass"
            type="password"
            onChange={handleInput}
            placeholder="Password" 
            />
            <input 
            name='phone'
            type="number"
            onChange={handleInput} 
            placeholder="Phone" 
            />
            <input 
            name="address"
            type="text" 
            onChange={handleInput}
            placeholder="Address" 
            />
            <input 
            name="avatar"
            type="file"
            onChange={handleFile}
            />
            <button type="submit" className="btn btn-default">Sign up</button>
            <FormErrors errors={errors}/>
        </form>
    </div>
  )
};

export default Register;