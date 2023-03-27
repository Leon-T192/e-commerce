import axios from "axios";
import React, { useEffect, useState } from "react";

const Update = () => {
  const [input, setInput] = useState({
    name: "",
    password: "",
    phone: "",
    address: "",
    email: "",
  });
  const [avatar, setAvatar] = useState();
  const [getFile, setFile] = useState([]);
  const imgTypes = ["png", "jpg", "jpeg"];




  useEffect(() => {
    let userData = localStorage.getItem("appState");

    if (userData) {
      userData = JSON.parse(userData);
      userData = userData.data;
      
      setInput({
        name: userData.Auth.name,
        phone: userData.Auth.phone,
        address: userData.Auth.address,
        email: userData.Auth.email,
        id: userData.Auth.id,
        token: userData.success.token,
      });
    }
  }, []);

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInput((state) => ({ ...state, [nameInput]: valueInput }));
  };

  function handleFile(e) {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let imgSize = getFile.size;
    let fileTypes = getFile.name;
    if (getFile.length > 0) {
      if (imgSize > 1024 * 1024) {
        alert("your file must be less than 1Mb!");
      } else {
        let duoifile = fileTypes.split(".", 2)[1];
        if (!imgTypes.includes(duoifile)) {
          alert("Invalid file!");
        }
      }
    }

    let accessToken = input.token
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencode",
        Accept: "application/json",
      },
    };
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phone", input.phone);
    formData.append("address", input.address);
  
    axios
      .post(
        "http://localhost/laravel/public/api/user/update/" +
        input.id,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          alert("Successfully updated!");
        }
      });
  }

  return (
    <section id="form" style={{margin: "0px auto 185px"}}>
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-1"></div>
          <div className="col-sm-1"></div>
          <div className="col-sm-4">
            <div
              className="signup-form"
              style={{
                position: "relative",
                top: "0",
                right: "150%",
                width: "150%",
              }}
            >
              <h2>User Update!</h2>
              <form encType="multipart/form-data" onSubmit={handleSubmit} >
                <input
                  name="name"
                  type="text"
                  value={input.name}
                  onChange={handleInput}
                />
                <input
                  name="email"
                  type="text"
                  value={input.email}
                  readOnly
                />
                <input
                  name="pass"
                  type="password"
                  value={input.password}
                  onChange={handleInput}
                />
                <input
                  name="phone"
                  type="number"
                  value={input.phone}
                  onChange={handleInput}
                />
                <input
                  name="address"
                  type="text"
                  value={input.address}
                  onChange={handleInput}
                />
                <input name="avatar"
                type="file" 
                onChange={handleFile} />
                <button type="submit" className="btn btn-default">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Update;
