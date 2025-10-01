const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// --- 1. INSERT SAMPLE PRODUCT DOCUMENTS (POST /api/products/seed) ---
router.post('/seed', async (req, res) => {
    try {
        // Clear existing data for a clean test environment (optional)
        await Product.deleteMany({}); 

        // Sample product documents demonstrating different nested variants
        const sampleProducts = [
            {
                name: 'Organic Cotton T-Shirt',
                price: 29.99,
                category: 'Apparel',
                variants: [
                    { color: 'Red', size: 'M', stock: 15 },
                    { color: 'Blue', size: 'L', stock: 10 },
                    { color: 'Black', size: 'S', stock: 20 },
                ]
            },
            {
                name: 'Noise Cancelling Headphones',
                price: 199.99,
                category: 'Electronics',
                variants: [
                    { color: 'Silver', size: 'One Size', stock: 50 },
                    { color: 'Black', size: 'One Size', stock: 75 }
                ]
            },
            {
                name: 'Leather Wallet',
                price: 45.00,
                category: 'Accessories',
                variants: [
                    { color: 'Brown', size: 'One Size', stock: 40 },
                    { color: 'Black', size: 'One Size', stock: 35 }
                ]
            }
        ];

        const insertedProducts = await Product.insertMany(sampleProducts);
        res.status(201).json({ 
            message: 'Sample data inserted successfully (3 products with nested variants)', 
            count: insertedProducts.length 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error seeding data: ' + error.message });
    }
});

// --- 2. RETRIEVE ALL PRODUCTS (GET /api/products) ---
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving products: ' + error.message });
    }
});

// --- 3. FILTER PRODUCTS BY CATEGORY (GET /api/products/filter?category=Apparel) ---
router.get('/filter', async (req, res) => {
    const { category } = req.query;

    if (!category) {
        return res.status(400).json({ message: 'Category query parameter is required for filtering.' });
    }

    try {
        // Mongoose query to filter using the top-level 'category' field
        const products = await Product.find({ category: category }).select('name price category variants');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error filtering products: ' + error.message });
    }
});

// --- 4. PROJECT SPECIFIC VARIANT DETAILS (GET /api/products/variants/Red) ---
router.get('/variants/:color', async (req, res) => {
    const { color } = req.params;

    try {
        const productsWithSpecificVariant = await Product.aggregate([
            {
                $match: { 'variants.color': color }
            },
            {
                $project: {
                    _id: 0,
                    product_name: '$name',
                    product_price: '$price',
                    matching_variants: {
                        $filter: {
                            input: '$variants',
                            as: 'variant',
                            cond: { $eq: ['$$variant.color', color] }
                        }
                    }
                }
            }
        ]);
        
        if (productsWithSpecificVariant.length === 0) {
            return res.status(404).json({ message: `No products found with the variant color: ${color}` });
        }

        res.status(200).json(productsWithSpecificVariant);
    } catch (error) {
        res.status(500).json({ error: 'Error projecting variants: ' + error.message });
    }
});

module.exports = router;
