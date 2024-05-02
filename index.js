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
const cartRouter = require("./routes/cartRoutes");
const testimonialRouter = require("./routes/testimonialRoutes");
const shopByBudgetRouter = require("./routes/shopByBudget.routes");
const ordersRouter = require("./routes/orders.routes");

dotenv.config({ path: "./config/config.env" });
console.log(process.env.PORT, "port number");

dbconnection();
app.use(cors());

app.use(express.static("uploads"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user", authRouter);
app.use("/api", productRouter);
app.use("/api", CategoryRouter);
app.use("/api", bannerRouter);
app.use("/api", cartRouter);
app.use("/api", testimonialRouter);
app.use("/api", shopByBudgetRouter);
app.use("/api", ordersRouter);

app.use("/", (req, res) => {
  // res.send("hello world");
});
app.listen(process.env.PORT, () => {
  console.log(
    `server initialized successfully in port no ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
