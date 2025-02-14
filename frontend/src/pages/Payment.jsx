import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/shopContext";

const Payment = () => {
  const { cart, clearCart, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  // Handle Razorpay Payment
  const handlePayment = () => {
    const options = {
      key: "rzp_test_AOZA9FvJqbOWam",
      amount: totalPrice * 100,
      currency: "INR",
      name: "Your Store",
      description: "Order Payment",
      image: "/your-logo.png",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        clearCart(); // Clear cart after successful payment
        navigate("/"); // Redirect after payment
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3c1618",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpay = () => {
      if (!document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    loadRazorpay();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-[#3c1618] mb-6">Proceed with Payment</h2>
      <button
        onClick={handlePayment}
        className="bg-[#3c1618] text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-[#5a1e20]"
      >
        Pay Now {currency} {totalPrice.toFixed(2)}
      </button>
    </div>
  );
};

export default Payment;


