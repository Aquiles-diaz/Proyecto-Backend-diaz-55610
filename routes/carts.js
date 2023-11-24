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

module.exports = router;
