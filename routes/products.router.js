const express = require("express");
router = express.Router();

const products = [
  { id: 1, name: "Nike InfinityRN 4", price: 147.499 },
  { id: 2, name: "Nike Pegasus 40", price: 109.999 },
  { id: 3, name: "Nike Structure 25", price: 121.499 },
  { id: 4, name: "Nike Vomero 16", price: 139.999 },
  { id: 5, name: "Nike Invincible 3", price: 164.999 },
  { id: 8, name: "Nike Air Zoom Rival Fly 3", price: 94.499 }, // id puesto aproposito mal para que marque el mensaje de "producto no encontrado"
];

router.get("/", (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

router.get("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

router.post("/", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  } = req.body;
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  const newProduct = {
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;
    products[productIndex] = {
      ...products[productIndex],
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    };
    res.json(products[productIndex]);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

router.delete("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

module.exports = router;
