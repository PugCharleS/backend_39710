class ProductManager {
  constructor() {
    this.products = [];
  }

  addProducts(title, description, price, thumbnail, code, stock) {
    const found = this.products.find((product) => product.code === code);

    if (arguments.length !== 6 || found) {
      return;
    }

    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(id) {
    const product = this.products.filter((product) => product.id === id);
    product.length ? console.log(product) : console.log("Not Found");
  }
}

const pm = new ProductManager();
pm.addProducts("test", "description", 1, "thumbnail", 1, 10);
pm.addProducts("test", "description", 1, "thumbnail", 1, 10);
pm.addProducts("test", "description", 1, "thumbnail", 3, 10);
pm.addProducts("test", "description", 1, "thumbnail", 4);
pm.getProducts();
pm.getProductById(1);
