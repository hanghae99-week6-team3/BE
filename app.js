const express = require("express");
const userRouter = require("./routes/users");
const productRouter = require("./routes/product");
const likeRouter = require("./routes/like");
const commentRouter = require("./routes/comment");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const port = process.env.Port;

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());

app.use("/api", [userRouter, commentRouter]);
app.use("/api/product", [likeRouter, productRouter]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
