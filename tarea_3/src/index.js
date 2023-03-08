const express = require("express");
const app = express();

const ProductManager = require("./productManager");

const products = new ProductManager();

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit || 0;
    const productsList = await products.getProducts();
    const result = limit ? productsList.slice(0, limit) : productsList;
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = Number(req.params.pid);
    const product = await products.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
