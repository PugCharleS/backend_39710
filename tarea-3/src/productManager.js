  const fs = require("fs");

  const PRODUCTS_FILE = "./data/products.json";

  class ProductManager {
    constructor() {
      this.path = PRODUCTS_FILE;
      this.products = null;
    }

    async getProducts() {
      await this._readFile();
      return this.products;
    }

    async getProductById(id) {
      await this._readFile();
      const product = this.products.find((p) => p.id === id);
      if (product) {
        return product;
      } else {
        return null;
      }
    }

    async _readFile() {
      if (this.products) {
        return;
      }
      try {
        const data = await fs.promises.readFile(this.path, "utf8");
        this.products = JSON.parse(data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }

  module.exports = ProductManager;
