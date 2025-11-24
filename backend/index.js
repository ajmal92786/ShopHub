const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Product = require("./models/product.model");

const app = express();
initializeDatabase();

async function getAllProducts() {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
}

// Route to get all products from the db
app.get("/api/products", async (req, res) => {
  try {
    const products = await getAllProducts();

    if (products && products.length > 0) {
      return res.status(200).json({
        success: true,
        data: {
          products,
        },
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No products found." });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching products",
      error: error.message,
    });
  }
});

async function getProductById(productId) {
  try {
    return await Product.findById(productId);
  } catch (error) {
    throw new Error("Error fetching product by id: " + error.message);
  }
}

// Route to gets product by productId from the db
app.get("/api/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const product = await getProductById(productId);

    if (product) {
      return res.status(200).json({ success: true, data: { product } });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching product by id",
      error: error.message,
    });
  }
});

app.get("/", (req, res) =>
  res.send({ status: "ok", message: "Ecommerce backend running" })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
