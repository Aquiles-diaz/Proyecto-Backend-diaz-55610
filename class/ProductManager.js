import fs from "fs";

export class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts()
      .then((loadedProducts) => {
        this.products = loadedProducts;
      })
      .catch((error) => {
        console.error("Error loading products:", error);
      });
  }

  async loadProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, data, "utf8");
  }

  async addProduct(product) {
    // Asigna una id autoincrementable
    const newProduct = {
      id: this.products.length + 1,
      ...product,
    };

    this.products.push(newProduct);
    await this.saveProducts();

    return newProduct;
  }

  async getProducts() {
    return this.products;
  }
  async getProductById(productId) {
    try {
      const product = this.products.find((product) => product.id === productId);
      if (!product) {
        return "Error: Product not Found";
      }

      return product;
    } catch (error) {
      console.log(error);
    }
  }
  async getProductsById(productId) {
    const product = this.products.find((p) => p.id === productId);
    return product;
  }

  async updateProducts(productId, updatedData) {
    const index = this.products.findIndex((p) => p.id == productId);
    console.log("prodId", index);
    if (index !== -1) {
      // Excluir la propiedad 'id' del objeto 'updatedData'
      const { id, ...restUpdatedData } = updatedData;

      // Actualized las propiedades del product con los datos actualized
      this.products[index] = { ...this.products[index], ...restUpdatedData };
      await this.saveProducts();
      return this.products[index];
    } else {
      return "No se  a encontrado ningún product con el ID especificado"; // No se  a encontrado ningún product con el ID especificado
    }
  }

  async deleteProducts(productId) {
    const index = this.products.findIndex((p) => p.id === productId);

    if (index !== -1) {
      // deletea product del array
      this.products.splice(index, 1);
      await this.saveProducts();
      return true; // Indicar que se le di  delete el product correctamente
    } else {
      return false; // No se a encontrado ningún product con el ID especificado
    }
  }
}
