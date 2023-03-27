import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import MenuLeft from "./Components/Layout/MenuLeft";
import MenuAcc from "./Components/Account/MenuAcc";
import { CartContext } from "./CartContext";

function App(props) {
  let cartAmount = "";
  function cartCount(data){
    // console.log(data)
  }
 

  let params = useLocation();
  function renderMenu() {
    if(params['pathname'].includes('account')){
      return <MenuAcc />
    }else{
      if(params['pathname'].includes('cart')){
      }else{
        return <MenuLeft />
      }
    }
  }
  return (
    <CartContext.Provider value={{
      cartAmount: cartAmount,
      cartCount: cartCount
    }}>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            {renderMenu()}
            {/* {params['pathname'].includes('account') ? <MenuAcc /> : <MenuLeft />} */}
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </CartContext.Provider>
  );
}

export default App;
