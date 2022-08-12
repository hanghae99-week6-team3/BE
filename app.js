const express = require("express");
const indexRouter = require("./routes/");

require("dotenv").config();

const app = express();

const port = process.env.Port;

app.use(express.json());

app.use("/", [indexRouter]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
