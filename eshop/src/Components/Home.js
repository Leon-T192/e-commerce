import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";




function Home() {
  const [getItem, setItem] = useState("");
  const [idItem, setIdItem] = useState("");

  


  const handleDetail = (e) => {
    setIdItem(e.target.id);
  };

  useEffect(() => {
    // console.log(idItem)
    localStorage.setItem("idItem", JSON.stringify(idItem));
  }, [idItem]);

  useEffect(() => {
    axios
      .get("http://localhost/laravel/public/api/product")
      .then((res) => {
        console.log(res.data);
        setItem(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);


  function renderItem() {
    if (getItem.length > 0) {
      return getItem.map((value, key) => {
        return (
          <div className="col-sm-4" key={key}>
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img
                    src={
                      "http://localhost/laravel/public/upload/user/product/" +
                      value.id_user +
                      "/" +
                      JSON.parse(value.image)[0]
                    }
                    alt=""
                  />
                  <h2>${value.price}</h2>
                  <p>{value.name}</p>
                  <a to="#" className="btn btn-default add-to-cart">
                    <i className="fa fa-shopping-cart" />
                    Add to cart
                  </a>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>${value.price}</h2>
                    <p>{value.name}</p>
                    <Link to="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <Link to>
                      <i className="fa fa-plus-square" />
                      Add to wishlist
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/product/detail"
                      id={value.id}
                      onClick={handleDetail}
                    >
                      <i
                        className="fa fa-plus-square"
                        id={value.id}
                        onClick={handleDetail}
                      />
                      More
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  return (
    <div>
      <section id="advertisement">
        <div className="container">
          <div className="col-sm-9 padding-right">
            <div className="features_items">
              {/*features_items*/}
              <h2 className="title text-center">Features Items</h2>
              {renderItem()}
              <ul className="pagination">
                <li className="active">
                  <Link to>1</Link>
                </li>
                <li>
                  <Link to>2</Link>
                </li>
                <li>
                  <Link to>3</Link>
                </li>
                <li>
                  <Link to>»</Link>
                </li>
              </ul>
            </div>
            {/*features_items*/}
          </div>
          <img src="images/shop/advertisement.jpg" alt="" />
        </div>
      </section>
    </div>
  );
}

export default Home;
