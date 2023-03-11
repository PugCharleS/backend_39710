const fs = require("fs");

const PRODUCTS_FILE = "./data/products.json";

class ProductManager {
  constructor() {
    this.path = PRODUCTS_FILE;
  }

  async _readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async _writeFile(data) {
    try {
      const dataJSON = JSON.stringify(data);
      await fs.promises.writeFile(this.path, dataJSON);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addProduct(product) {
    try {
      const products = await this._readFile();
      const newId = products.length
        ? Math.max(...products.map((p) => p.id)) + 1
        : 1;
      const newProduct = { ...product, id: newId };
      products.push(newProduct);
      await this._writeFile(products);
      console.log(`Product with id ${newId} has been successfully added`);
      return newId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const products = await this._readFile();
      console.log(products);
      return products;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this._readFile();
      const product = products.find((p) => p.id === id);
      if (product) {
        console.log(product);
        return product;
      } else {
        console.log("Product not found");
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateProduct(id, updates) {
    try {
      const products = await this._readFile();
      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex >= 0) {
        const updatedProduct = { ...products[productIndex], ...updates };
        products[productIndex] = updatedProduct;
        await this._writeFile(products);
        console.log(`Product with id ${id} has been successfully updated`);
        return true;
      } else {
        console.log("Product not found");
        return false;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this._readFile();
      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex >= 0) {
        products.splice(productIndex, 1);
        await this._writeFile(products);
        console.log(`Product with id ${id} has been successfully deleted`);
        return true;
      } else {
        console.log("Product not found");
        return false;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const products = new ProductManager();

(async () => {
  // Agregar un nuevo producto
  await products.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 100,
    thumbnail: "https://via.placeholder.com/150",
    code: "P001",
    stock: 10,
  });

  await products.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 500,
    thumbnail: "https://via.placeholder.com/150",
    code: "P002",
    stock: 2,
  });

  // Obtener todos los productos
  const allProducts = await products.getProducts();
  console.log(allProducts);

  // Obtener un producto por su ID
  const productById = await products.getProductById(1);
  console.log(productById);

  // Actualizar un producto existente
  await products.updateProduct(1, {
    title: "Producto 1 actualizado",
    description: "Nueva descripción del producto 1",
    price: 150,
    thumbnail: "https://via.placeholder.com/150",
    code: "P001",
    stock: 20,
  });

  // Eliminar un producto existente
  await products.deleteProduct(1);
})();
