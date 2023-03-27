import axios from "axios";
import React, { useEffect, useState } from "react";
import FormErrors from "../Member/FormErrors";

const AddProduct = () => {
  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    company: "",
    detail: "",
    status: "",
    sale: "",
  });
  const [getCategory, setCategory] = useState("");
  const [getBrand, setBrand] = useState("");
  const [getFile, setFile] = useState([]);
  const [errors, setErrors] = useState({});
  const fileTypes = ["png", "jpg", "jpeg"];

  useEffect(() => {
    axios
      .get("http://localhost/laravel/public/api/category-brand")
      .then((res) => {
        console.log(res.data);
        setCategory(res.data.category);
        setBrand(res.data.brand);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInput((state) => ({ ...state, [nameInput]: valueInput }));
  };

  function handleFile(e) {
    const file = e.target.files;
    setFile(file);
  }


  // console.log(getFile);
  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (input.name == "") {
      errorsSubmit.name = "Please enter the product name!";
      flag = false;
    }
    if (input.price == "") {
      errorsSubmit.price = "Please enter the price!";
      flag = false;
    }
    if (input.category == "") {
      errorsSubmit.category = "Please choose category!";
      flag = false;
    }
    if (input.brand == "") {
      errorsSubmit.brand = "Please choose brand!";
      flag = false;
    }
    if (input.status == "") {
      errorsSubmit.status = "Please choose the product status!";
      flag = false;
    }
    if (input.company == "") {
      errorsSubmit.company = "Please enter the company profile!";
      flag = false;
    }
    if (getFile.length == 0) {
      errorsSubmit.file = "please insert your image!";
      flag = false;
    } else {
      if (getFile.length > 3) {
        errorsSubmit.file = "You can only upload a maximum of 3 images!";
        flag = false;
      } else {  
        Object.keys(getFile).map((key, index) => {
          let fileSize = getFile[key].size;
          let fileName = getFile[key].name;
          if (fileSize > 1024 * 1024) {
            errorsSubmit.file = "your file must be less than 1Mb!";
            flag = false;
          } else {
            let fileExt = fileName.split(".",2)[1];
            if (!fileTypes.includes(fileExt)) {
              errorsSubmit.file = "Invalid Image(s)!";
              flag = false;
            }
          }
        });
      }
    }
    if (input.detail == "") {
      errorsSubmit.detail = "Please enter the detail!";
      flag = false;
    }
    if (!flag) {
      setErrors(errorsSubmit);
    } else {
      setErrors("");

        const userData = JSON.parse(localStorage["appState"]);
        let accessToken = userData.data.success.token;
        let url = "http://localhost/laravel/public/api/user/add-product";
        let config = {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "multipart.form-data",
            Accept: "application/json",
          },
        };
        let formData = new FormData();
        formData.append("name", input.name);
        formData.append("price", input.price);
        formData.append("category", input.category);
        formData.append("brand", input.brand);
        formData.append("company", input.company);
        formData.append("detail", input.detail);
        formData.append("status", input.status);
        formData.append("sale", input.sale);

        Object.keys(getFile).map((item, i) => {
          formData.append("file[]", getFile[item]);
        });

        axios.post(url, formData, config)
        .then((res)=>{
          console.log(res);
          if (res.data.errors) {
            setErrors(res.data.errors);
            }else{
              alert("Successfully posted!");
            }
        })
    }
  }
  function renderCate() {
    if (getCategory.length > 0) {
      return getCategory.map((getCategory) => {
        return <option value={getCategory.id}>{getCategory.category}</option>;
      });
    }
  }
  function renderBrand() {
    if (getBrand.length > 0) {
      return getBrand.map((getBrand) => {
        return <option value={getBrand.id}>{getBrand.brand}</option>;
      });
    }
  }
  function renderSale() {
    if (input.status == "2") {
      return (
        <label>
          <input
            name="sale"
            type="number"
            placeholder="0"
            onChange={handleInput}
          />
        </label>
      );
    }
  }

  return (
    <section id="form" style={{ margin: "0px auto 185px" }}>
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
                width: "200%",
              }}
            >
              <h2>Create product!</h2>
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  onChange={handleInput}
                />
                <input
                  name="price"
                  type="text"
                  placeholder="Price"
                  onChange={handleInput}
                />
                <select name="category" onChange={handleInput}>
                  <option value="">Please choose category</option>
                  {renderCate()}
                </select>
                <select name="brand" onChange={handleInput}>
                  <option value="">Please choose brand</option>
                  {renderBrand()}
                </select>
                <select name="status" onChange={handleInput}>
                  <option value="">-- Status --</option>
                  <option value={1}>New</option>
                  <option value={2}>Sale</option>
                </select>
                {renderSale()}
                <input
                  name="company"
                  type="text"
                  placeholder="Company profile"
                  onChange={handleInput}
                />
                <input
                  name="images"
                  type="file"
                  multiple
                  onChange={handleFile}
                />
                <textarea
                  name="detail"
                  placeholder="Detail"
                  onChange={handleInput}
                />
                <button type="submit" className="btn btn-default">
                  Signup
                </button>
                <FormErrors errors={errors} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
