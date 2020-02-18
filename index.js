const express = require("express");
const morgan = require("morgan");
const app = express();
const hbs = require("hbs");
const path = require("path");
app.set("views", path.join(__dirname, "views")); // setted by default can change to anything we want
app.set("view engine", "hbs");

const { MongoClient } = require("mongodb");
const { shortIt, redirectIt } = require("./services/services");

const client = new MongoClient(
  process.env.MONGODB_URL || "mongodb://localhost:27017",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

if (!process.env.NODE_ENV) {
  app.use(morgan("tiny"));
}

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.get("/", (req, res, next) => {
  res.render("index");
});

app.post("/api/shortit", shortIt(client));
app.get("/s/:shortName", redirectIt(client));

// for rest of the routes
app.use((req, res, next) => {
  res.redirect("/");
});

// error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  err.status = status;
  res.status(status).json({ message: err.message, status: err.status });
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log("Listening on Port", PORT);
});
