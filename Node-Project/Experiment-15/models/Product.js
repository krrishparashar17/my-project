const mongoose = require('mongoose');

// 1. Define the Nested Variant Schema
const variantSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true,
        // Example enum for consistency
        enum: ['S', 'M', 'L', 'XL', 'XXL', 'One Size']
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false }); // Optional: Prevents Mongoose from creating a default '_id' for each variant

// 2. Define the Main Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        // Example categories
        enum: ['Electronics', 'Apparel', 'Books', 'Home Goods', 'Accessories']
    },
    description: {
        type: String,
        default: 'A wonderful product.'
    },
    // 3. Implement the Nested Document Array
    variants: {
        type: [variantSchema], // An array of documents based on variantSchema
        required: true
    }
}, { timestamps: true });

// 4. Create and Export the Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;