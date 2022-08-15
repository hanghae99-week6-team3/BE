const express = require("express");
const indexRouter = require("./routes/");
const productRouter = require("./routes/product");
const likeRouter = require("./routes/like");

require("dotenv").config();

const app = express();

const port = process.env.Port;

app.use(express.json());

app.use("/api", [indexRouter]);
app.use("/api/product", [likeRouter]);
app.use("/api/product", [productRouter]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
