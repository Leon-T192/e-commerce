import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../CartContext";

function Cart() {
  const [getData, setData] = useState("");
  const [changeItem, setChangeItem] = useState({});
  const [totalCart, setTotalCart] = useState("")
  const value = useContext(CartContext)

  const handleChangeItem = (e) => {
    const getId = e.target.id;
    const getQty = e.target.value;
    setChangeItem((state) => ({ ...state, [getId]: getQty }));
  };

  useEffect(() => {
    let getItem = localStorage.getItem("cartItem");
    getItem = JSON.parse(getItem);
    setChangeItem(getItem);
    axios
      .post("http://localhost/laravel/public/api/product/cart", getItem)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleAddQty(e) {
    const idItem = e.target.id;

    //  copy ra data moi
    let newData = [...getData];
    if (newData.length > 0) {
      newData.map((value, key) => {
        if (idItem == value["id"]) {
          newData[key]["qty"] = parseInt(newData[key]["qty"]) + 1;
          setChangeItem((state) => ({
            ...state,
            [value["id"]]: newData[key]["qty"],
          }));
        }
      });
      console.log(newData);
      setData(newData);
      value.cartAmount = parseInt(value.cartAmount) + 1
    }
  }
  function handleMinusQty(e) {
    const idItem = e.target.id;
    let newData = [...getData];
    if (newData.length > 0) {
      newData.map((value, key) => {
        if (idItem == value["id"]) {
          newData[key]["qty"] = parseInt(newData[key]["qty"]) - 1;
          setChangeItem((state) => ({
            ...state,
            [value["id"]]: newData[key]["qty"],
          }));
        }
      });

      console.log(newData);
      setData(newData);
      value.cartAmount = value.cartAmount - 1
    }
  }
  const deleteItem = id => {
    const newGetData = getData.filter((item) => item.id !== id)
    setData(newGetData)

  }

  if (Object.keys(changeItem).length > 0) {
    localStorage.setItem("cartItem", JSON.stringify(changeItem));
  }
  // localStorage.setItem("cartItem", JSON.stringify(data))

  localStorage.setItem("itemCount", JSON.stringify(value.cartAmount))


  function renderCart() {
    if (getData.length > 0) {
      return Object.keys(getData).map((key, index) => {
        return (
          <tr>
            <td className="cart_product">
              <a href>
                <img
                  src={
                    "http://localhost/laravel/public/upload/user/product/" +
                    getData[key].id_user +
                    "/" +
                    JSON.parse(getData[key].image)[0]
                  }
                  style={{ width: "75px", height: "75px" }}
                  alt=""
                />
              </a>
            </td>
            <td className="cart_description">
              <h4>
                <a href>{getData[key].name}</a>
              </h4>
              <p>Web ID: {getData[key].id}</p>
            </td>
            <td className="cart_price">
              <p>${getData[key].price}</p>
            </td>
            <td className="cart_quantity">
              <div className="cart_quantity_button">
                <a
                  className="cart_quantity_up"
                  style={{ cursor: "pointer" }}
                  name={getData[key].qty}
                  id={getData[key].id}
                  onClick={handleAddQty}
                >
                  {" "}
                  +{" "}
                </a>
                <input
                  className="cart_quantity_input"
                  type="text"
                  name="quantity"
                  id={getData[key].id}
                  value={getData[key].qty}
                  autoComplete="off"
                  size={2}
                  onChange={handleChangeItem}
                />
                <a
                  className="cart_quantity_down"
                  href
                  style={{ cursor: "pointer" }}
                  name={getData[key].qty}
                  id={getData[key].id}
                  onClick={handleMinusQty}
                >
                  {" "}
                  -{" "}
                </a>
              </div>
            </td>
            <td className="cart_total">
              <p className="cart_total_price">
                ${getData[key].price * getData[key].qty}
              </p>
            </td>
            <td className="cart_delete">
              <a className="cart_quantity_delete" href onClick={() => deleteItem(getData[key].id)}>
                <i className="fa fa-times" />
              </a>
            </td>
          </tr>
        );
      });
    }
  }

  function renderBill() {
    let subTotal = 0;
    let sum = 0
    if (getData.length > 0) {
        Object.keys(getData).map((key, i) => {
          subTotal = subTotal + (getData[key].price * getData[key].qty)
          sum = sum + parseInt(getData[key].qty)
        })
        setTotalCart(subTotal)
        value.cartAmount = sum
        
      }
  }

  console.log(value)


  return (
    <div>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home2222</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description" />
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td />
                </tr>
              </thead>
              <tbody>{renderCart()}</tbody>
            </table>
          </div>
        </div>
      </section>{" "}
      {/*/#cart_items*/}
      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href>
                  Continue
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>
                    Cart Sub Total{" "}
                    <span>${totalCart}</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total{" "}
                    <span>${totalCart + 2}</span>
                  </li>
                </ul>
                <a className="btn btn-default update" href onClick={renderBill}>
                  Update
                </a>
                <a className="btn btn-default check_out" href>
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/#do_action*/}
    </div>
  );
}

export default Cart;
