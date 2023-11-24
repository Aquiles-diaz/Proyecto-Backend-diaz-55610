const express = require("express");
const app = express();
const port = 8080;

const productsRouter = require("../routes/products");
const cartsRouter = require("../routes/carts");

app.use(express.json());
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
