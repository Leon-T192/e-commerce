import axios from "axios";
import React, { useEffect, useState } from "react";

const MyProduct = () => {
  const [product, setProduct] = useState("");
  const [getConfig, setConfig] = useState("");
  const [idItem, setIdItem] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage["appState"]);
    let accessToken = userData.data.success.token;
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencode",
        Accept: "application/json",
      },
    };
    setConfig(config);
    axios
      .get("http://localhost/laravel/public/api/user/my-product", config)
      .then((response) => {
        console.log(response);
        setProduct(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // console.log(getConfig)
  function removeItem(e) {
    setIdItem(e.target.id);
    axios
      .get(
        "http://localhost/laravel/public/api/user/delete-product/" + idItem,
        getConfig
      )
      .then((res) => {
        console.log(res);
        setProduct(res.data.data);
      })
      .catch((error) => console.log(error));
  }

  function handleEdit(e) {
    setIdItem(e.target.id);
    // navigate("/account/editproduct")
  }
  // console.log(idItem)

  localStorage.setItem("idItem", JSON.stringify(idItem));

  function fetchProduct() {
    if (Object.keys(product).length > 0) {
      return Object.keys(product).map((key, index) => {
        return (
          <tr>
            <td>{product[key].id}</td>
            <td className="cart_description">
              <h4>
                <a href>{product[key].name}</a>
              </h4>
            </td>
            <td className="cart_price">
              <img
                style={{ width: "50px", height: "50px" }}
                className="media-object"
                src={
                  "http://localhost/laravel/public/upload/user/product/" +
                  product[key].id_user +
                  "/" +
                  JSON.parse(product[key].image)[0]
                }
                alt=""
              />
              
            </td>
            <td className="cart_quantity">
              <p>${product[key].price}</p>
            </td>
            <td className="cart_total">
              <a
                onClick={handleEdit}
                id={product[key].id}
                href="/account/editproduct"
                className="cart_total_price"
              >
                Edit
              </a>
            </td>
            <td className="cart_delete">
              <a className="cart_quantity_delete">
                <i
                  onClick={removeItem}
                  id={product[key].id}
                  className="fa fa-times"
                />
              </a>
            </td>
          </tr>
        );
      });
    }
  }

  return (
    <section id="cart_items">
      <div className="container">
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td>Id</td>
                <td className="description">Name</td>
                <td className="quantity">Image</td>
                <td className="price">Price</td>
                <td className="total">Action</td>
                <td />
              </tr>
            </thead>
            <tbody>{fetchProduct()}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyProduct;
