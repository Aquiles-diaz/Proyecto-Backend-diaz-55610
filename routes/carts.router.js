import { Router } from "express";
import CartManager from "../class/CartManager.js";
import ProductManager from "../class/ProductManager.js";

const router = Router();
const cartManager = new CartManager("carrito.json");
const productManager = new ProductManager("products.json");

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.addCart();
    res.send(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:cid", (req, res) => {
  try {
    const cartId = req.params.cid;
    const productsInCart = cartManager.getProducts(cartId);
    res.send(productsInCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const product = productManager.getProductById(Number(pid));

    if (product === "Not found") {
      return res
        .status(404)
        .json({ error: "Product no presente en la Base de Datos" });
    }

    const addedProduct = await cartManager.addProductToCart(
      Number(cid),
      Number(pid)
    );

    if (addedProduct?.error) {
      return res.status(404).json({ error: addedProduct.error });
    }

    res.status(200).json(addedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
