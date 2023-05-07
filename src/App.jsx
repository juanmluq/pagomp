import React, { useState} from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Payment from "./components/Payment";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import InternalProvider from "./components/ContextProvider";
import { useParams } from "react-router-dom";
import { SpinnerCircular } from 'spinners-react';
// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
initMercadoPago("APP_USR-da4ce183-db2b-4666-bab8-4d00596c69dd");

const App = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { name } = useParams();
  const { saldo } = useParams();
  const { id } = useParams();
  const { usercomp } = useParams();
  const [orderData, setOrderData] = useState({ quantity: "1", price: saldo * 1000, amount: saldo * 1000, description: "Moneda Virtual TPC" });


const handleClick = () => {
    setIsLoading(true);
    fetch(`https://backmonedas-production.up.railway.app/create_preference/${id}/${name}/${saldo * 1000}/${usercomp}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.id);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setIsLoading(false);
      })

  };

  const renderSpinner = () => {
     if (isLoading) {
      return (
        <div className="spinner-wrapper">
          < SpinnerCircular сolor='#009EE3' />
        </div>
      )
     }
  }

  return (
    <InternalProvider context={{ preferenceId, isLoading, orderData, setOrderData }}>
          <main>
          {renderSpinner()}
        <Checkout onClick={handleClick} 
         description
        />  
        <Payment  />
           </main>
      <Footer />
    </InternalProvider>
  );

};

export default App;
