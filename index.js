require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const logger = require("./config/logger");
const config = require("./config/config");
const routes = require("./routes")
// const errorHandler = require("./middlewares/errorMiddleware");

connectDB();

const app = express();
app.use(express.json());
// app.use(require("cors")());

app.use("/api", routes);

// app.use(errorHandler);

const PORT = config.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));