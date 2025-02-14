import React, { useContext, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Payment from "../pages/Payment";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, currency } = useContext(ShopContext);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-5xl mx-auto ">
      <h1 className="text-2xl font-bold mb-6 check">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left - Delivery Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={deliveryInfo.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
             <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={deliveryInfo.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
              <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={deliveryInfo.phone}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <textarea
              type="text"
              name="address"
              placeholder="Delivery Address"
              value={deliveryInfo.address}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full p-2 border rounded-md"
            ></textarea>
          
           
            
          </form>
        </div>

        {/* Right - Order Summary */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <p>{item.name} × {item.quantity}</p>
                  <p>
                    {currency} {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="border-t mt-4 pt-4 flex justify-between font-bold">
            <p>Total</p>
            <p>{currency} {cartTotal.toFixed(2)}</p>
            
          </div>
          <button  onClick={()=>{
            navigate("/payment")
          }}
      className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-center transition hover:bg-blue-700"
    >
      Proceed to Pay
    </button>
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;

