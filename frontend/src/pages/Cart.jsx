// import React, { useContext } from 'react';
// import { ShopContext } from '../context/shopContext';
// import { useNavigate } from "react-router-dom";
// import Checkout from '../pages/Checkout';

// const Cart = () => {
//   const { cart, currency,removeFromCart } = useContext(ShopContext);

//   const navigate = useNavigate();
//   // Calculate the total price of the cart
//   const cartTotal = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="p-4 relative">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
//       {cart.length === 0 ? (
//         <p className="text-gray-500 text-center">Your cart is empty!</p>
//       ) : (
//         <div className="space-y-6">
//           {cart.map((item) => (
//             <div
//               key={item._id}
//               className="flex items-center justify-between gap-6 bg-white p-4 rounded-lg shadow-md"
//             >
//               <div className="flex items-center gap-4">
//                 {/* Product Image */}
//                 <div className="cart-image w-20 h-20 flex-shrink-0">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>

//                 {/* Product Details */}
//                 <div>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {item.name}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {currency} {item.price} × {item.quantity}
//                   </p>
//                 </div>
//               </div>

//               {/* Product Total Price */}
//               <p className="text-lg font-semibold text-gray-800">
//                 {currency} {(item.price * item.quantity).toFixed(2)}
//               </p>
//               {/* Remove Button */}
//               <button
//                   onClick={() => removeFromCart(item._id)}
//                   className="px-3 py-1 text-sm bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
//                 >
//                   Remove
//                 </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Cart Total */}
//       {cart.length > 0 && (
//         <div className="bg-gray-100 p-4 mt-8 rounded-lg shadow-md text-right">
//           <h2 className="text-lg font-bold text-gray-800 mb-2">Cart Total</h2>
//           <p className="text-xl font-semibold text-gray-900">
//             {currency} {cartTotal.toFixed(2)}
//           </p>
//           <button onClick={()=>{
//             navigate("/checkout")
//           }} className='p-3 bg-black text-white rounded-lg'>Checkout</button>

//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, currency, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate();

  // Calculate the total price of the cart
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center mt-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Your cart is empty!</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              {/* Product Image */}
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 text-center md:text-left md:ml-6">
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {currency} {item.price} × {item.quantity}
                </p>
              </div>

              {/* Product Total Price */}
              <p className="text-lg font-semibold text-gray-800">
                {currency} {(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cart Total & Checkout Button */}
      {cart.length > 0 && (
        <div className="bg-white p-6 mt-10 rounded-lg shadow-lg border border-gray-200 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Cart Total</h2>
          <p className="text-2xl font-semibold text-gray-800">{currency} {cartTotal.toFixed(2)}</p>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 px-6 py-3 bg-black text-white text-lg font-bold rounded-lg hover:bg-gray-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
