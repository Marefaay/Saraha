const express = require("express");
const app = express();
const rateLimiting = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();
///dbConnection
const dbConnection = require("./database/dbConnection");
const notFound = require("./middlewares/errorHandler/notFound");
const errorHandler = require("./middlewares/errorHandler/errorHandler");
dbConnection;
//Middlewares
app.use(express.json());
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000,
    limit: 100,
  })
);
app.use(hpp());
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize())
///routes
app.use("/api/user", require("./apis/user.route"));
app.use("/api/message", require("./apis/message.route"));
app.get("/", (req, res) => res.send("Hello World!"));
app.get("*", (req, res) => res.send("Not Found"));
//Error Handler
app.use(notFound);
app.use(errorHandler);
const port=process.env.PORT;
app.listen(port, () =>
  console.log(`Saraha app listening on port ${port}!`)
);
