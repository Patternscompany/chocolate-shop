import React, { useContext } from 'react';
import { ShopContext } from '../context/shopContext';

const Cart = () => {
  const { cart, currency,removeFromCart } = useContext(ShopContext);

  // Calculate the total price of the cart
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty!</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-6 bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                {/* Product Image */}
                <div className="cart-image w-20 h-20 flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currency} {item.price} × {item.quantity}
                  </p>
                </div>
              </div>

              {/* Product Total Price */}
              <p className="text-lg font-semibold text-gray-800">
                {currency} {(item.price * item.quantity).toFixed(2)}
              </p>
              {/* Remove Button */}
              <button
                  onClick={() => removeFromCart(item._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
            </div>
          ))}
        </div>
      )}

      {/* Cart Total */}
      {cart.length > 0 && (
        <div className="bg-gray-100 p-4 mt-8 rounded-lg shadow-md text-right">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Cart Total</h2>
          <p className="text-xl font-semibold text-gray-900">
            {currency} {cartTotal.toFixed(2)}
          </p>
          <button className='p-3 bg-black text-white rounded-lg'>Checkout</button>

        </div>
      )}
    </div>
  );
};

export default Cart;
