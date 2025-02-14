const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true // ✅ Index for faster lookup
    },
    items: [
      {
        productId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Product", 
          required: true 
        }, 
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 }, // ✅ Prevents negative or zero quantity
        imageUrl: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// ✅ Prevent duplicate `productId` in the same cart
cartSchema.index({ userId: 1, "items.productId": 1 }, { unique: true });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
