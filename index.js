const debug = require("debug")("app:dev");
const morgan = require("morgan");
const helmet = require("helmet");
const posts = require("./routes/posts");
// const comments = require("./routes/comments");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// Morgan Logging in Development Only
if (app.get("env") === "development") {
  debug("Morgan Logging enabled...");
  app.use(morgan("tiny"));
}

// Routes
app.use("/api/posts", posts);

const port = process.env.PORT || 3001;
app.listen(port, () => debug(`Listening on port ${port}...`));
