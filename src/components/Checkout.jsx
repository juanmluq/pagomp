import React, { useEffect } from "react";
import classnames from 'classnames'
import { Context } from "./ContextProvider";
import { useParams } from "react-router-dom";
import moneda from "../img/monedadesentralizada.png";

const Checkout = ({ onClick }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const { preferenceId, isLoading: disabled, orderData, setOrderData } = React.useContext(Context);
  const shoppingCartClass = classnames('shopping-cart dark', {
    'shopping-cart--hidden': !isVisible,
  })
  const { id } = useParams();
  const { usercomp } = useParams();
  var comventa = "Venta"

  function actualizarventa(){
    if(id === usercomp){
      comventa = "Compra"
    }
  }
  actualizarventa()
  
  useEffect(() => {
    if (preferenceId) setIsVisible(false);
  }, [preferenceId])


  const updatePrice = (event) => {
    //const quantity = event.target.value;
    const amount = parseInt(orderData.price) 
    //* parseInt(quantity);
    setOrderData({ ...orderData, quantity, amount });
  }


  return (
    <section className={shoppingCartClass}>
      <div className="container" id="container">
        <div className="block-heading">
          <h2>Pago</h2>
        </div>
        <div className="content">
          <div className="row" style={{ marginBottom:"22%"}}>
            <div className="col-md-12 col-lg-8">
              <div className="items">
                <div className="product">
                  <div className="info">
                    <div className="product-details">
                      <div className="row justify-content-md-center">
                        <div className="col-md-3">
                          <img
                            className="img-fluid mx-auto d-block image"
                            style={{ width:"9rem"}}
                            alt="Image of a product"
                            src={moneda}
                          />
                        </div>
                        <div className="col-md-4 product-detail">
                          <h5>Producto</h5>
                          <div className="product-info">
                            <b>Descripcion: </b>
                            <span id="product-description">{comventa} Moneda Virtual TPC</span>
                            <br />
                          
                            <b>Precio:</b> $ <span id="unit-price">{orderData.price}</span>
                            <br />

                          </div>
                        </div>
                        {/* <div className="col-md-3 product-detail">
                          <label htmlFor="quantity">
                            <b>Quantity</b>
                          </label>
                          <input
                           onChange={updatePrice}
                            type="number"
                            id="quantity"
                            value={orderData.quantity}
                            min="1"
                            className="form-control"
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="summary">
                <h3>Moneda Virtual TPC</h3>
                <div className="summary-item">
                  <span className="text">Subtotal</span>
                  <span className="price" id="cart-total">${orderData.amount}</span>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={onClick}
                  id="checkout-btn"
                  disabled={disabled}
                >
                  Abonar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



 export default Checkout;
