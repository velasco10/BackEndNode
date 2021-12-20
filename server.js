const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectionMongoDb = require("./config/db");
dotenv.config({ path: "./config/config.env" });

connectionMongoDb();


const autor = require("./routes/autor");
const book = require("./routes/book");
const user = require("./routes/user");
const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use("/api/book", book);
app.use("/api/autorLibrary", autor);
app.use("/user", user);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log("Server running", process.env.NODE_ENV)
);

process.on("unhandledRejection", (err, promise) => {
  console.log("errores", err.message);
  server.close(() => process.exit(1));
});
