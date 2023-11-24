const express = require("express");
const router = express.Router();

let carts = [];

router.post("/", (req, res) => {
  const newCartId = generateUniqueId(); // Función para generar un id único
  const newCart = { id: newCartId, products: [] };
  carts.push(newCart);
  res.status(201).json(newCart);
});

router.post("/:cartId/products", (req, res) => {
  const cartId = req.params.cartId;
  const product = req.body;
  const cart = carts.find((c) => c.id === cartId);
  if (cart) {
    cart.products.push(product);
    res.status(201).json(cart);
  } else {
    res.status(404).send("Carrito no encontrado");
  }
});

function generateUniqueId() {
  // Lógica para generar un id único
  return "cart_" + Math.random().toString(36).substr(2, 9);
}

router.get("/:cartId", (req, res) => {
  const cartId = req.params.cartId;
  const cart = carts.find((c) => c.id === cartId);
  if (cart) {
    res.status(200).json(cart.products);
  } else {
    res.status(404).send("Carrito no encontrado");
  }
});

router.post("/:cartId/product/:productId", (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  const quantity = req.body.quantity;

  // Buscar el carrito correspondiente en el array 'carts'
  const cart = carts.find((c) => c.id === cartId);

  if (cart) {
    // Verificar si el product ya está en el carrito
    const existingProduct = cart.products.find((p) => p.product === productId);

    if (existingProduct) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      existingProduct.quantity += quantity;
    } else {
      // Si el producto no está en el carrito, agregarlo con la cantidad
      cart.products.push({ product: productId, quantity: quantity });
    }

    res.status(201).json(cart);
  } else {
    res.status(404).send("Carrito no encontrado");
  }
});
module.exports = router;
