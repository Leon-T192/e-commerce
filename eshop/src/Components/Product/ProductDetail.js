import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
// import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext";

const ProductDetail = () => {
  const [getDetail, setDetail] = useState("");
  const [getImage, setImage] = useState();
  const [showImg, setShowImg] = useState();
  const [cartItem, setCartItem] = useState({});
  const value = useContext(CartContext);
  // let navigate = useNavigate();

  console.log(value);
  const handleItem = (e) => {
    const idItem = e.target.id;
    setCartItem((state) => ({ ...state, [idItem]: 1 }));
  };

  useEffect(() => {
    let getCart = localStorage.getItem("cartItem");
    if (getCart) {
      getCart = JSON.parse(getCart);
      setCartItem(getCart);
    }
  }, []);
  useEffect(() => {
    let idItem = JSON.parse(localStorage["idItem"]);
    console.log(idItem);
    axios
      .get("http://localhost/laravel/public/api/product/detail/" + idItem)
      .then((res) => {
        console.log(res.data.data);
        setDetail(res.data.data);
        let imgs = res.data.data.image;
        if (imgs) {
          imgs = JSON.parse(imgs);
          setImage(imgs);
          setShowImg(imgs[0]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(cartItem);
  function handleAddCart(e) {
    const idItem = e.target.id;
    if (Object.keys(cartItem).length > 0) {
      let sum = 0;
      Object.keys(cartItem).map((key, index) => {
        if(idItem == key){
          cartItem[key] = parseInt(cartItem[key]) + 1
        }
        sum = sum + parseInt(cartItem[key]);
        
      });
      value.cartAmount = sum;
    }

    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    localStorage.setItem("itemCount", JSON.stringify(value.cartAmount));

    // navigate("/product/cart")
  }

  function showProduct(e) {
    setShowImg(e.target.id);
  }

  function renderImg() {
    if (getImage) {
      return getImage.map((value, key) => {
        return (
          <a href key={key}>
            <img
              src={
                "http://localhost/laravel/public/upload/user/product/" +
                getDetail.id_user +
                "/" +
                value
              }
              alt=""
              style={{ width: "85px", height: "84px" }}
              id={value}
              onClick={showProduct}
            />
          </a>
        );
      });
    }
  }

  return (
    <div className="col-sm-9 padding-right">
      <div className="product-details">
        {/*product-details*/}
        <div className="col-sm-5">
          <div className="view-product">
            <img
              src={
                "http://localhost/laravel/public/upload/user/product/" +
                getDetail.id_user +
                "/" +
                showImg
              }
              alt=""
            />
            {/* <>
              <Button onClick={() => setLgShow(true)}>ZOOM</Button>
              <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    ZOOM
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <img
                    src={
                      "http://localhost/laravel/public/upload/user/product/" +
                      getDetail.id_user +
                      "/" +
                      getImage[0]
                    }
                    alt=""
                  />
                </Modal.Body>
              </Modal>
            </> */}
            <a href="images/product-details/1.jpg" rel="prettyPhoto">
              <h3>ZOOM</h3>
            </a>
          </div>
          <div
            id="similar-product"
            className="carousel slide"
            data-ride="carousel"
          >
            {/* Wrapper for slides */}
            <div className="carousel-inner">
              <div className="item active">{renderImg()}</div>
              <div className="item">
                <a href>
                  <img src="images/product-details/similar1.jpg" alt="" />
                </a>
                <a href>
                  <img src="images/product-details/similar2.jpg" alt="" />
                </a>
                <a href>
                  <img src="images/product-details/similar3.jpg" alt="" />
                </a>
              </div>
              <div className="item">
                <a href>
                  <img src="images/product-details/similar1.jpg" alt="" />
                </a>
                <a href>
                  <img src="images/product-details/similar2.jpg" alt="" />
                </a>
                <a href>
                  <img src="images/product-details/similar3.jpg" alt="" />
                </a>
              </div>
            </div>
            {/* Controls */}
            <a
              className="left item-control"
              href="#similar-product"
              data-slide="prev"
            >
              <i className="fa fa-angle-left" />
            </a>
            <a
              className="right item-control"
              href="#similar-product"
              data-slide="next"
            >
              <i className="fa fa-angle-right" />
            </a>
          </div>
        </div>
        <div className="col-sm-7">
          <div className="product-information">
            {/*/product-information*/}
            <img
              src="images/product-details/new.jpg"
              className="newarrival"
              alt=""
            />
            <h2>{getDetail.name}</h2>
            <p>Web ID: 1089772</p>
            <img src="images/product-details/rating.png" alt="" />
            <span>
              <span>US ${getDetail.price}</span>
              <label>Quantity:</label>
              <input
                type="text"
                defaultValue={1}
                id={getDetail.id}
                onChange={handleItem}
              />
              <a
                id={getDetail.id}
                type="button"
                className="btn btn-fefault cart"
                onClick={handleAddCart}
              >
                Add to cart
              </a>
            </span>
            <p>
              <b>Availability:</b> In Stock
            </p>
            <p>
              <b>Condition:</b> New
            </p>
            <p>
              <b>Brand:</b>
            </p>
            <a href>
              <img
                src="images/product-details/share.png"
                className="share img-responsive"
                alt=""
              />
            </a>
          </div>
          {/*/product-information*/}
        </div>
      </div>
      {/*/product-details*/}
      <div className="category-tab shop-details-tab">
        {/*category-tab*/}
        <div className="col-sm-12">
          <ul className="nav nav-tabs">
            <li>
              <a href="#details" data-toggle="tab">
                Details
              </a>
            </li>
            <li>
              <a href="#companyprofile" data-toggle="tab">
                Company Profile
              </a>
            </li>
            <li>
              <a href="#tag" data-toggle="tab">
                Tag
              </a>
            </li>
            <li className="active">
              <a href="#reviews" data-toggle="tab">
                Reviews (5)
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade" id="details">
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery1.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery2.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery3.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery4.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="companyprofile">
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery1.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery3.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery2.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery4.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="tag">
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery1.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery2.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery3.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery4.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button
                      type="button"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade active in" id="reviews">
            <div className="col-sm-12">
              <ul>
                <li>
                  <a href>
                    <i className="fa fa-user" />
                    EUGEN
                  </a>
                </li>
                <li>
                  <a href>
                    <i className="fa fa-clock-o" />
                    12:41 PM
                  </a>
                </li>
                <li>
                  <a href>
                    <i className="fa fa-calendar-o" />
                    31 DEC 2014
                  </a>
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <p>
                <b>Write Your Review</b>
              </p>
              <form action="#">
                <span>
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Email Address" />
                </span>
                <textarea name defaultValue={""} />
                <b>Rating: </b>{" "}
                <img src="images/product-details/rating.png" alt="" />
                <button type="button" className="btn btn-default pull-right">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*/category-tab*/}
      <div className="recommended_items">
        {/*recommended_items*/}
        <h2 className="title text-center">recommended items</h2>
        <div
          id="recommended-item-carousel"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="item active">
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="left recommended-item-control"
            href="#recommended-item-carousel"
            data-slide="prev"
          >
            <i className="fa fa-angle-left" />
          </a>
          <a
            className="right recommended-item-control"
            href="#recommended-item-carousel"
            data-slide="next"
          >
            <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
      {/*/recommended_items*/}
    </div>
  );
};

export default ProductDetail;
