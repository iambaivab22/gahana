const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const dbconnection = require("./config/connection");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/product.routes");
const CategoryRouter = require("./routes/categoryRoutes");
const bannerRouter = require("./routes/bannerRoutes");

dotenv.config({ path: "./config/config.env" });
console.clear(process.env.PORT, "port number");

dbconnection();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user", authRouter);
app.use("/api", productRouter);
app.use("/api", CategoryRouter);
app.use("/api", bannerRouter);

app.use("/", (req, res) => {
  res.send("hello world");
});
app.listen(process.env.PORT, () => {
  console.clear(
    `server initialized successfully in port no ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
