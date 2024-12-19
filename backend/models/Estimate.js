const mongoose = require('mongoose');

const EstimateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  apartmentType: { type: String, required: true },
  carpetArea: { type: Number, required: true },
  modularKitchen: { type: Boolean, default: false },
  selectedPackage: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  bedrooms: [{ type: String }],
  costBreakdown: {
    materials: { type: Number, required: true },
    labor: { type: Number, required: true },
    design: { type: Number, required: true },
    fixtures: { type: Number, required: true },
    total: { type: Number, required: true },
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('Estimate', EstimateSchema);
